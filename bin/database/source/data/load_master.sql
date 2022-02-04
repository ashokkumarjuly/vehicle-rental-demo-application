INSERT INTO `variants` (`variant_id`, `variant`) VALUES (1, 'color');
INSERT INTO `variants` (`variant_id`, `variant`) VALUES (2, 'size');


INSERT INTO `variant_values` (`id`, `variant_id`, `variant_value`, `created_at`, `updated_at`) VALUES (1, 1, 'red', '2021-12-05 06:47:12', NULL);
INSERT INTO `variant_values` (`id`, `variant_id`, `variant_value`, `created_at`, `updated_at`) VALUES (2, 1, 'blue', '2021-12-05 06:47:13', NULL);
INSERT INTO `variant_values` (`id`, `variant_id`, `variant_value`, `created_at`, `updated_at`) VALUES (3, 1, 'black', '2021-12-05 06:47:14', NULL);
INSERT INTO `variant_values` (`id`, `variant_id`, `variant_value`, `created_at`, `updated_at`) VALUES (4, 2, 'small', '2021-12-05 06:47:16', NULL);
INSERT INTO `variant_values` (`id`, `variant_id`, `variant_value`, `created_at`, `updated_at`) VALUES (5, 2, 'medium', '2021-12-05 06:47:17', NULL);
INSERT INTO `variant_values` (`id`, `variant_id`, `variant_value`, `created_at`, `updated_at`) VALUES (6, 2, 'large', '2021-12-05 06:47:18', NULL);


INSERT INTO `vehicle_fuel_types` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'Electric', 1, NULL, NULL);
INSERT INTO `vehicle_fuel_types` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES (2, 'LPG', 1, NULL, NULL);
INSERT INTO `vehicle_fuel_types` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES (3, 'Petrol', 1, NULL, NULL);


INSERT INTO `vehicle_types` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES (1, 'bike', 1, '2021-12-05 00:10:46', NULL);
INSERT INTO `vehicle_types` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES (2, 'scooter', 1, '2021-12-05 00:11:16', NULL);
