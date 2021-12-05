const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const run = require('gulp-run');
const del = require('del');
const rename = require('gulp-rename');

const tsProject = ts.createProject('tsconfig.json');
const destBase = './dist';
const destTsfolder = `${destBase}/src`;
const pathToCopy = ['package.json', 'package-lock.json', './src/public/**'];

let isProduction = false;

// const { src } = gulp;
let envName = '.env';
switch (process.env.NODE_ENV) {
    case 'staging':
        envName = `.env.staging`;
        break;
    case 'production':
        isProduction = false;
        envName = `.env.production`;
        break;
    case 'testing':
        envName = `.env.testing`;
        break;
    case 'qa':
        envName = `.env.qa`;
        break;
    case 'development':
        envName = `.env.development`;
        break;
    default:
        envName = `.env.local`;
}

const envVariables = require('dotenv').config().parsed;

pathToCopy.push(envName);

function clean() {
    return del([`${destBase}`]);
}

function generateSwaggerDoc() {
    if (process.env.SWAGGER_ENABLE === 'true') {
        pathToCopy.push('swagger/**');
    }
    return Promise.resolve(true);
}

function compileTs() {
    return tsProject.src().pipe(tsProject()).js.pipe(gulpif(isProduction, uglify())).pipe(gulp.dest(destTsfolder));
}

function copy() {
    return gulp.src(pathToCopy, { base: '.' }).pipe(gulp.dest(destBase));
}

const build = gulp.series(clean, compileTs, generateSwaggerDoc, gulp.parallel([copy]));

exports.clean = clean;
exports.generateSwaggerDoc = generateSwaggerDoc;
exports.compileTs = compileTs;
exports.copy = copy;
exports.build = build;

exports.default = build;
