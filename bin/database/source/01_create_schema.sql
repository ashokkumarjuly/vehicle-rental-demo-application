-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.11 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table db_rental.auth_permissions
CREATE TABLE IF NOT EXISTS `auth_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `module_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `module_name_uidx` (`module_name`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.auth_roles
CREATE TABLE IF NOT EXISTS `auth_roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_uidx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.auth_role_permission
CREATE TABLE IF NOT EXISTS `auth_role_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL,
  `permission_id` bigint(20) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.auth_user_role
CREATE TABLE IF NOT EXISTS `auth_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_role_uidx` (`role_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rental_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `transaction_id` varchar(200) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `sub_total_amount` decimal(10,2) NOT NULL,
  `additional_amount` decimal(10,2) DEFAULT '0.00',
  `damage_amount` decimal(10,2) DEFAULT '0.00',
  `payment_status` tinyint(1) DEFAULT '2' COMMENT '1 => Paid, 2 => Pending',
  `payment_method` varchar(100) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.invoice_items
CREATE TABLE IF NOT EXISTS `invoice_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) NOT NULL,
  `vehicle_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `damage_amount` decimal(10,2) DEFAULT '0.00',
  `damage_remarks` text,
  `total_amount` decimal(10,2) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_item_invoice_id_fk` (`invoice_id`) USING BTREE,
  CONSTRAINT `invoice_id_fk` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.rentals
CREATE TABLE IF NOT EXISTS `rentals` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vehicle_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `planned_start_date` datetime NOT NULL,
  `actual_start_date` datetime DEFAULT NULL,
  `planned_return_date` datetime NOT NULL,
  `actual_return_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `initial_amount` decimal(10,2) DEFAULT '0.00',
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `payment_status` tinyint(1) DEFAULT '2' COMMENT '1 => Paid, 2 => Pending',
  `rent_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=>hour,2=>day',
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `is_active_idx` (`is_active`),
  KEY `rentals_vehicle_id_fk` (`vehicle_id`),
  KEY `rentals_user_id_fk` (`user_id`) USING BTREE,
  CONSTRAINT `rentals_vehicle_id_fk` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `first_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `customer_preferred_size` bigint(20) DEFAULT '0',
  `phone_code` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `phone_no` varchar(12) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `address` text,
  `city` varchar(60) DEFAULT NULL,
  `state` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `country` varchar(60) DEFAULT NULL,
  `zip_code` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '2' COMMENT '2 => Inactive, 1 => Active, -1 => Deleted',
  `created_by` bigint(20) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_uid_uidx` (`uid`),
  UNIQUE KEY `users_email_uidx` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.user_wallet_amounts
CREATE TABLE IF NOT EXISTS `user_wallet_amounts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `type` tinyint(1) DEFAULT '1' COMMENT '1=>debit, 2=>credit',
  `invoice_id` bigint(20) DEFAULT '0',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_wallet_amounts_user_id_fk` (`user_id`),
  CONSTRAINT `user_wallet_amounts_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.variants
CREATE TABLE IF NOT EXISTS `variants` (
  `variant_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `variant` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`variant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.variant_values
CREATE TABLE IF NOT EXISTS `variant_values` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `variant_id` bigint(20) DEFAULT NULL,
  `variant_value` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variant_values_varient_id_fk` (`variant_id`) USING BTREE,
  CONSTRAINT `varient_id_fk` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`variant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `sku` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fuel_type_id` bigint(20) NOT NULL,
  `vehicle_model_id` bigint(20) NOT NULL,
  `vehicle_variant_id` bigint(20) NOT NULL,
  `vehicle_no` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` tinyint(1) DEFAULT '1' COMMENT '1 => Active/Rented, 2 => Inactive, 3 => Rented, 4=> Damaged',
  `hourly_rent` decimal(10,0) NOT NULL,
  `daily_rent` decimal(10,0) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicles_uid_uidx` (`uid`),
  UNIQUE KEY `vehicles_sku_uidx` (`sku`),
  UNIQUE KEY `vehicle_vehicle_no_uidx` (`vehicle_no`),
  KEY `vehicles_fuel_type_id_fk` (`fuel_type_id`) USING BTREE,
  KEY `vehicles_vehicle_model_id_fk` (`vehicle_model_id`) USING BTREE,
  CONSTRAINT `fuel_type_id_fk` FOREIGN KEY (`fuel_type_id`) REFERENCES `vehicle_fuel_types` (`id`),
  CONSTRAINT `vehicle_model_id_fk` FOREIGN KEY (`vehicle_model_id`) REFERENCES `vehicle_make_models` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.vehicle_fuel_types
CREATE TABLE IF NOT EXISTS `vehicle_fuel_types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fuel_types_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.vehicle_make_models
CREATE TABLE IF NOT EXISTS `vehicle_make_models` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `vehicle_make` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `vehicle_type_id` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_models_id_idx` (`id`),
  KEY `vehicle_models_name_idx` (`name`),
  KEY `vehicle_models_vehicle_make_idx` (`vehicle_make`),
  KEY `vehicle_models_vehicle_type_id_fk` (`vehicle_type_id`),
  CONSTRAINT `vehicle_models_vehicle_type_id_fk` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table db_rental.vehicle_types
CREATE TABLE IF NOT EXISTS `vehicle_types` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehicle_types_uidx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
