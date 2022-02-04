import User from './user.model';
import Role from './auth.role';
import UserRole from './auth.user.role';
import Permission from './auth.permission';
import RolePermission from './auth.role.permission';
import Vehicle from './vehicle.model';
import Invoice from './invoice.model';
import InvoiceItem from './invoice.item.model';
import Rental from './rental.model';

import VehicleFuelType from './vehicle.fuel.type.model';
import VehicleType from './vehicle.type.model';
import Variant from './variant.model';
import VariantValue from './variant.values.model';
import VehicleMakeModel from './vehicle.make.models.model';
import UserWalletAmount from './user.wallet.amount.model';

export interface IModels {
    User: typeof User;
    Role: typeof Role;
    UserRole: typeof UserRole;
    Permission: typeof Permission;
    RolePermission: typeof RolePermission;
    Vehicle: typeof Vehicle;
    Invoice: typeof Invoice;
    InvoiceItem: typeof InvoiceItem;
    Rental: typeof Rental;
    VehicleFuelType: typeof VehicleFuelType;
    VehicleType: typeof VehicleType;
    Variant: typeof Variant;
    VariantValue: typeof VariantValue;
    VehicleMakeModel: typeof VehicleMakeModel;
    UserWalletAmount: typeof UserWalletAmount;
}

User.belongsToMany(Role, { through: UserRole, as: 'roles', onDelete: 'CASCADE' });
Role.belongsToMany(User, { through: UserRole, as: 'users', onDelete: 'CASCADE' });

Role.belongsToMany(Permission, {
    through: { model: RolePermission, unique: false },
    onDelete: 'CASCADE',
    as: 'permissions'
});
Permission.belongsToMany(Role, {
    through: { model: RolePermission, unique: false },
    onDelete: 'CASCADE',
    as: 'roles'
});

VariantValue.belongsTo(Variant, { foreignKey: 'variant_id', as: 'variant' });

Vehicle.hasOne(VariantValue, { foreignKey: 'id', sourceKey: 'vehicle_variant_id', as: 'vehicle_variant' });

Vehicle.hasMany(Rental, { foreignKey: 'vehicle_id', sourceKey: 'id', as: 'vehicle_rentals' });

Rental.hasOne(User, { foreignKey: 'id', sourceKey: 'user_id', as: 'customer' });

export { default as User } from './user.model';
export { default as Permission } from './auth.permission';
export { default as Role } from './auth.role';
export { default as UserRole } from './auth.user.role';
export { default as RolePermission } from './auth.role.permission';
export { default as Vehicle } from './vehicle.model';
export { default as Invoice } from './invoice.model';
export { default as InvoiceItem } from './invoice.item.model';
export { default as Rental } from './rental.model';
export { default as VehicleFuelType } from './vehicle.fuel.type.model';
export { default as VehicleType } from './vehicle.type.model';
export { default as Variant } from './variant.model';
export { default as VariantValue } from './variant.values.model';
export { default as VehicleMakeModel } from './vehicle.make.models.model';
export { default as UserWalletAmount } from './user.wallet.amount.model';
