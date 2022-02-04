SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE `auth_roles`; 
TRUNCATE `auth_permissions`; 
TRUNCATE `auth_role_permission`; 
TRUNCATE `auth_user_role`; 
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `auth_roles` (`id`, `name`, `description`, `deleted_at`, `created_at`, `updated_at`) VALUES 
(1, 'ADMIN', 'Super Admin', '2021-08-28 23:08:26', '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(2, 'MANAGER', 'Manager', '2021-08-29 12:14:11', '2021-08-29 12:14:12', '2021-08-29 12:14:12'),
(3, 'CUSTOMER', 'Connected user', '2021-08-29 12:14:11', '2021-08-29 12:14:12', '2021-08-29 12:14:12');

INSERT INTO `auth_permissions` (`id`, `module_name`, `name`, `label`, `description`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'ManageUsers', 'user.list', 'CAN_GET_USERS', 'To list users', '2021-08-29 12:14:47', '2021-08-29 12:14:48', '2021-08-29 12:14:48'),
(2, 'ManageUsers', 'user.view', 'CAN_GET_USER', 'To view user', NULL, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(3, 'ManageUsers', 'user.create', 'CAN_CREATE_USER', 'To create a user', NULL, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(4, 'ManageUsers', 'user.update', 'CAN_UPDATE_USER', 'To update a user', NULL, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(5, 'ManageUsers', 'user.delete', 'CAN_DELETE_USER', 'To delete an user', NULL, '2021-08-28 23:08:26', '2021-08-28 23:08:26');


INSERT INTO `auth_role_permission` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(NUll, 1, 1, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(NUll, 1, 2, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(NUll, 1, 3, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(NUll, 1, 4, '2021-08-28 23:08:26', '2021-08-28 23:08:26'),
(NUll, 1, 5, '2021-08-28 23:08:26', '2021-08-28 23:08:26');

