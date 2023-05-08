/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80032 (8.0.32)
 Source Host           : localhost:3306
 Source Schema         : nest_vben_admin

 Target Server Type    : MySQL
 Target Server Version : 80032 (8.0.32)
 File Encoding         : 65001

 Date: 09/05/2023 01:10:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_captcha_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_captcha_log`;
CREATE TABLE `sys_captcha_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_captcha_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_2c363c25cf99bcaab3a7f389ba` (`key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
BEGIN;
INSERT INTO `sys_config` (`id`, `key`, `name`, `value`, `remark`, `created_at`, `updated_at`) VALUES (1, 'sys_user_initPassword', '初始密码', '123456', '创建管理员账号的初始密码', '2022-04-18 13:51:59.021771', '2022-04-18 13:51:59.176361');
INSERT INTO `sys_config` (`id`, `key`, `name`, `value`, `remark`, `created_at`, `updated_at`) VALUES (2, 'sys_api_token', 'API Token', 'kz-admin', '用于请求 @ApiToken 的控制器', '2022-10-13 00:10:51.146746', '2022-10-13 00:12:29.000000');
COMMIT;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `orderNo` int DEFAULT '0',
  `mpath` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_c75280b01c49779f2323536db67` (`parentId`) USING BTREE,
  CONSTRAINT `FK_c75280b01c49779f2323536db67` FOREIGN KEY (`parentId`) REFERENCES `sys_dept` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (1, '2022-12-05 01:56:36.454842', '2022-12-05 01:56:36.000000', '华东分部', 1, '1.', NULL);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (2, '2022-12-05 01:56:51.609649', '2023-05-08 01:48:52.729890', '研发部', 1, '1.2.', 1);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (3, '2022-12-05 01:57:02.171144', '2022-12-05 01:57:02.000000', '市场部', 2, '1.3.', 1);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (4, '2022-12-05 01:57:09.787832', '2022-12-05 01:57:09.000000', '商务部', 3, '1.4.', 1);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (5, '2022-12-05 01:57:18.070162', '2023-05-08 01:48:59.028148', '财务部', 4, '1.5.', 1);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (6, '2022-12-05 01:57:32.261756', '2022-12-05 01:57:32.000000', '华南分部', 2, '6.', NULL);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (7, '2022-12-05 01:57:49.769066', '2022-12-05 01:57:49.000000', '西北分部', 3, '7.', NULL);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (8, '2022-12-05 01:57:59.323718', '2022-12-05 01:57:59.000000', '研发部', 1, '6.8.', 6);
INSERT INTO `sys_dept` (`id`, `created_at`, `updated_at`, `name`, `orderNo`, `mpath`, `parentId`) VALUES (9, '2023-05-08 01:35:34.650384', '2023-05-08 01:35:34.000000', '市场部', 1, '6.9.', 6);
COMMIT;

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `ua` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_97d0f214cd3e9a14aca2f3a1b54` (`userId`),
  CONSTRAINT `FK_97d0f214cd3e9a14aca2f3a1b54` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
BEGIN;
INSERT INTO `sys_login_log` (`id`, `userId`, `ip`, `time`, `ua`, `created_at`, `updated_at`, `address`, `provider`) VALUES (137, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.64', '2023-05-08 15:32:52.492576', '2023-05-08 15:32:52.492576', ' 本机地址', NULL);
INSERT INTO `sys_login_log` (`id`, `userId`, `ip`, `time`, `ua`, `created_at`, `updated_at`, `address`, `provider`) VALUES (138, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.64', '2023-05-08 15:43:04.288997', '2023-05-08 15:43:04.288997', ' 本机地址', NULL);
INSERT INTO `sys_login_log` (`id`, `userId`, `ip`, `time`, `ua`, `created_at`, `updated_at`, `address`, `provider`) VALUES (139, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.64', '2023-05-08 20:39:31.237107', '2023-05-08 20:39:31.237107', ' 本机地址', NULL);
INSERT INTO `sys_login_log` (`id`, `userId`, `ip`, `time`, `ua`, `created_at`, `updated_at`, `address`, `provider`) VALUES (140, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.64', '2023-05-08 20:43:15.453370', '2023-05-08 20:43:15.453370', ' 本机地址', NULL);
INSERT INTO `sys_login_log` (`id`, `userId`, `ip`, `time`, `ua`, `created_at`, `updated_at`, `address`, `provider`) VALUES (141, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.64', '2023-05-09 01:04:11.515550', '2023-05-09 01:04:11.515550', ' 本机地址', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `parent` int DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` tinyint NOT NULL DEFAULT '0',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `order_no` int DEFAULT '0',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `keepalive` tinyint NOT NULL DEFAULT '1',
  `show` tinyint NOT NULL DEFAULT '1',
  `status` tinyint NOT NULL DEFAULT '1',
  `external` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:11:36.682283', 1, NULL, '/system', '系统管理', '', 0, 'ant-design:setting-outlined', 254, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2023-05-08 15:02:15.000000', 2, 1, '/system/user', '用户管理', 'system:user:list', 1, '', 0, '/system/user/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2023-05-07 02:28:12.000000', 3, 1, '/system/role', '角色管理', 'system:role:list', 1, '', 1, '/system/role/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2023-05-06 18:27:54.721826', 4, 1, '/system/menu', '菜单管理', 'system:menu:list', 1, '', 2, '/system/menu/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2022-10-12 23:30:14.914107', 5, 1, '/system/monitor', '系统监控', '', 0, '', 5, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2023-05-06 18:27:54.721826', 6, 5, '/system/monitor/online', '在线用户', 'system:online:list', 1, '', 0, '/system/monitor/online/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 16:57:03.198541', '2023-05-08 15:14:54.000000', 7, 5, '/sys/monitor/login-log', '登录日志', 'system:log:login:list', 1, '', 0, '/system/monitor/log/login/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 16:13:44.214923', '2023-05-08 15:42:32.246970', 8, 5, '/system/monitor/serve', '服务监控', 'system:serve:stat', 1, '', 4, '/system/monitor/serve/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2022-10-12 23:30:04.361622', 9, 1, '/system/schedule', '任务调度', '', 0, '', 6, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2023-05-08 17:15:24.000000', 10, 9, '/system/task', '任务管理', '', 1, '', 0, '/system/task/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2023-05-08 17:15:41.000000', 11, 9, '/system/task/log', '任务日志', 'system:task:list', 1, '', 0, '/system/task/log/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 13:51:56.794076', '2022-05-05 15:14:43.240670', 12, NULL, '/document', '文档', '', 0, 'ion:tv-outline', 2, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 20:06:18.596668', '2022-05-05 15:16:25.575966', 13, 12, 'https://vvbin.cn/doc-next/', 'Vben项目文档', '', 0, '', 1, NULL, 1, 1, 1, 1);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 00:46:15.381404', '2022-05-05 15:16:28.377252', 14, 12, 'https://typeorm.bootcss.com/', 'Typeorm中文文档', NULL, 1, '', 3, NULL, 1, 1, 1, 1);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 00:47:18.653750', '2022-05-05 15:16:31.808051', 15, 12, 'https://docs.nestjs.cn/', 'Nest.js中文文档', '', 1, '', 4, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 12:40:23.328931', '2022-05-05 15:14:36.736848', 16, NULL, '/dashboard', '仪表盘', NULL, 0, 'ion:grid-outline', 0, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 12:41:24.136217', '2022-05-05 15:16:33.686876', 17, 16, '/dashboard/workbench', '工作台', 'dashboard:workbench', 1, '', 2, '/dashboard/workbench/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 12:42:45.781049', '2022-05-05 15:16:35.792168', 18, 16, '/dashboard/analysis', '分析页', 'dashboard:analysis', 1, '', 1, '/dashboard/analysis/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 21:47:57.744418', '2023-05-08 17:33:58.000000', 19, 1, '/system/user_detail/:id', '用户详情', 'system:user:read', 1, '', 10, '/system/user/UserDetail', 1, 0, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:29:42.984193', '2023-05-07 02:27:20.000000', 20, 2, NULL, '新增', 'system:user:create', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:32:50.757513', '2023-05-06 18:27:54.721826', 21, 2, '', '删除', 'system:user:delete', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:32:50.765599', '2023-05-06 18:27:54.721826', 22, 2, '', '更新', 'system:user:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:32:50.762543', '2023-05-07 00:29:42.000000', 23, 2, '', '查询', 'system:user:read', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:39:13.114441', '2023-05-07 02:27:30.000000', 24, 3, '', '新增', 'system:role:create', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:38:10.600098', '2023-05-06 18:27:54.721826', 25, 3, '', '删除', 'system:role:delete', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:39:13.119436', '2023-05-06 18:27:54.721826', 26, 3, '', '修改', 'system:role:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:39:17.300382', '2023-05-07 22:52:25.000000', 27, 3, '', '查询', 'system:role:read', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:42:21.553915', '2023-05-07 02:27:37.000000', 28, 4, NULL, '新增', 'system:menu:create', 2, NULL, 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:42:21.558801', '2023-05-06 18:27:54.721826', 29, 4, NULL, '删除', 'system:menu:delete', 2, NULL, 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:42:21.566086', '2023-05-06 18:27:54.721826', 30, 4, '', '修改', 'system:menu:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:42:21.562494', '2023-05-07 02:28:25.000000', 31, 4, NULL, '查询', 'system:menu:read', 2, NULL, 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:50:49.063275', '2023-05-06 18:27:54.721826', 32, 6, '', '下线', 'system:online:kick', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.896098', '2023-05-08 20:40:21.000000', 34, 10, '', '新增', 'system:task:create', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.901193', '2023-05-08 20:41:09.000000', 35, 10, '', '删除', 'system:task:delete', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.904504', '2023-05-08 20:41:01.000000', 36, 10, '', '执行一次', 'system:task:once', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.907401', '2023-05-08 20:40:54.000000', 37, 10, '', '查询', 'system:task:read', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.910221', '2023-05-08 20:40:45.000000', 38, 10, '', '运行', 'system:task:start', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.913098', '2023-05-08 20:40:37.000000', 39, 10, '', '暂停', 'system:task:stop', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:54:07.916502', '2023-05-08 20:40:28.000000', 40, 10, '', '更新', 'system:task:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:58:13.642200', '2023-05-08 15:17:32.000000', 41, 7, '', '查询登录日志', 'system:log:login:list', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 14:58:13.646915', '2023-05-08 15:16:58.000000', 42, 7, '', '查询任务日志', 'system:log:task:list', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-05 16:57:03.198541', '2023-05-07 00:40:46.000000', 43, NULL, '/about', '关于', '', 0, 'simple-icons:about-dot-me', 255, '/sys/about/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-13 17:29:13.961084', '2022-05-13 17:29:13.961084', 44, NULL, '/level', '多级菜单', NULL, 0, 'ant-design:menu-outlined', 253, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-13 17:30:07.968766', '2022-05-13 17:30:07.968766', 45, 44, '/level/menu1', 'Menu1', NULL, 0, '', 1, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-13 17:48:20.119632', '2022-05-13 17:49:28.218757', 46, 45, '/level/menu1/menu1-1', 'Menu-1-1', NULL, 1, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-13 17:48:46.887840', '2022-05-13 17:48:46.887840', 47, 44, '/level/menu2', 'Menu2', NULL, 1, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-13 17:58:08.175948', '2022-05-15 01:06:17.000000', 48, NULL, '/tools', '系统工具', NULL, 0, 'ant-design:tool-outlined', 254, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-13 18:00:17.507170', '2023-05-06 18:27:54.721826', 49, 48, '/tools/email', '邮件工具', 'system:tools:email', 1, '', 1, '/tools/email/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-14 19:14:40.038017', '2022-05-15 01:27:44.000000', 50, 49, NULL, '发送邮件', 'tools:email:send', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-15 01:26:45.531494', '2023-04-27 15:10:09.620932', 51, 48, '/tools/storage', '存储管理', 'tools:storage:list', 1, '', 2, '/tools/storage/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-15 01:27:32.585503', '2022-05-15 01:27:32.585503', 52, 51, NULL, '文件上传', 'upload', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-05-15 16:53:02.343638', '2022-05-15 16:53:02.343638', 53, 51, NULL, '文件删除', 'tools:storage:delete', 2, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-06-06 15:20:26.509930', '2023-05-06 18:27:54.721826', 54, 2, NULL, '修改密码', 'system:user:password', 2, '', 5, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-06-24 01:37:11.694562', '2023-04-27 15:10:13.134294', 55, NULL, '/profile/setting', '个人设置', '', 1, '', 252, '/system/profile/index', 1, 0, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-10-13 00:08:57.971469', '2023-05-07 00:10:08.000000', 56, 1, '/system/dict', '字典管理', 'system:dict:list', 1, '', 4, '/system/dict/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-10-13 00:14:34.220628', '2023-05-07 00:10:28.000000', 57, 56, NULL, '新增', 'system:dict:create', 2, '', 1, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-10-13 00:14:52.311703', '2023-05-07 00:10:36.000000', 58, 56, NULL, '更新', 'system:dict:update', 2, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-10-13 00:15:09.832903', '2023-05-07 00:10:44.000000', 59, 56, NULL, '删除', 'system:dict:delete', 2, '', 3, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-10-13 00:15:36.452796', '2023-05-07 00:10:54.000000', 60, 56, NULL, '查询', 'system:dict:info', 2, '', 4, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-12-05 01:34:18.599016', '2023-05-06 18:27:54.721826', 61, 1, '/system/dept', '部门管理', 'system:dept:list', 1, '', 3, '/system/dept/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-12-05 01:38:21.933874', '2023-05-07 02:27:47.000000', 62, 61, NULL, '新增', 'system:dept:create', 2, '', 1, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-12-05 01:39:25.630217', '2023-05-06 18:27:54.721826', 63, 61, NULL, '更新', 'system:dept:update', 2, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-12-05 01:40:41.930385', '2023-05-06 18:27:54.721826', 64, 61, NULL, '删除', 'system:dept:delete', 2, '', 3, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2022-12-05 01:42:19.474973', '2023-05-07 23:15:15.000000', 65, 61, NULL, '查询', 'system:dept:read', 2, '', 4, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2023-05-09 00:05:46.678404', '2023-05-09 01:10:00.000000', 68, 5, '/health', '健康检查', '', 1, '', 4, 'LAYOUT', 1, 0, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2023-05-09 00:06:47.107749', '2023-05-09 00:06:47.107749', 69, 68, NULL, '网络', 'app:health:network', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` (`created_at`, `updated_at`, `id`, `parent`, `path`, `name`, `permission`, `type`, `icon`, `order_no`, `component`, `keepalive`, `show`, `status`, `external`) VALUES ('2023-05-09 00:06:47.107749', '2023-05-09 00:06:47.107749', 70, 68, NULL, '数据库', 'app:health: database', 2, '', 0, NULL, 1, 1, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_223de54d6badbe43a5490450c3` (`name`) USING BTREE,
  UNIQUE KEY `IDX_05edc0a51f41bb16b7d8137da9` (`value`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`created_at`, `updated_at`, `id`, `value`, `name`, `remark`, `status`) VALUES ('2022-04-18 13:51:57.000000', '2023-05-07 23:14:52.000000', 1, 'admin', '管理员', '超级管理员', 1);
INSERT INTO `sys_role` (`created_at`, `updated_at`, `id`, `value`, `name`, `remark`, `status`) VALUES ('2022-04-18 15:52:51.645691', '2023-05-07 23:14:14.000000', 2, 'user', '用户', '', 1);
INSERT INTO `sys_role` (`created_at`, `updated_at`, `id`, `value`, `name`, `remark`, `status`) VALUES ('2022-04-21 01:45:10.448676', '2023-05-07 23:14:00.000000', 3, 'test', '测试', '', 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `role_id` int NOT NULL,
  `dept_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (1, 1, 1, '2022-04-18 17:04:19.462420', '2022-04-18 17:04:19.462420');
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (2, 2, 16, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (3, 2, 18, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (4, 2, 17, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` (`id`, `role_id`, `menu_id`, `created_at`, `updated_at`) VALUES (9, 2, 43, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menus_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menus_sys_menu`;
CREATE TABLE `sys_role_menus_sys_menu` (
  `sysRoleId` int NOT NULL,
  `sysMenuId` int NOT NULL,
  PRIMARY KEY (`sysRoleId`,`sysMenuId`) USING BTREE,
  KEY `IDX_e7c90b5f1eae0da649c74cfbcb` (`sysRoleId`) USING BTREE,
  KEY `IDX_c6e4b76cb3f4ab1028f2461963` (`sysMenuId`) USING BTREE,
  CONSTRAINT `FK_c6e4b76cb3f4ab1028f24619635` FOREIGN KEY (`sysMenuId`) REFERENCES `sys_menu` (`id`),
  CONSTRAINT `FK_e7c90b5f1eae0da649c74cfbcb4` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role_menus_sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 1);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 2);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 3);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 4);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 5);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 6);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 7);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 8);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 9);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 10);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 11);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 12);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 13);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 14);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 15);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 16);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 17);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 18);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 19);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 20);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 21);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 22);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 23);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 24);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 25);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 26);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 27);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 28);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 29);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 30);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 31);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 32);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 34);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 35);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 36);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 37);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 38);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 39);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 40);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 41);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 42);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 43);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 44);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 45);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 46);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 47);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 48);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 49);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 50);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 51);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 52);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 53);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 54);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 55);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 56);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 57);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 58);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 59);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 60);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 61);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 62);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 63);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 64);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (1, 65);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (2, 43);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (2, 44);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (2, 45);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (2, 46);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (2, 47);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (2, 55);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 12);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 13);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 14);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 15);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 43);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 44);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 45);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 46);
INSERT INTO `sys_role_menus_sys_menu` (`sysRoleId`, `sysMenuId`) VALUES (3, 47);
COMMIT;

-- ----------------------------
-- Table structure for sys_task
-- ----------------------------
DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` tinyint NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `limit` int DEFAULT '0',
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `every` int DEFAULT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `job_opts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_ef8e5ab5ef2fe0ddb1428439ef` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_task
-- ----------------------------
BEGIN;
INSERT INTO `sys_task` (`id`, `name`, `service`, `type`, `status`, `start_time`, `end_time`, `limit`, `cron`, `every`, `data`, `job_opts`, `remark`, `created_at`, `updated_at`) VALUES (2, '定时清空登录日志', 'LogClearJob.clearLoginLog', 0, 0, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:2:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":2}', '定时清空登录日志', '2022-04-18 13:51:58.066927', '2023-05-08 23:02:30.603709');
INSERT INTO `sys_task` (`id`, `name`, `service`, `type`, `status`, `start_time`, `end_time`, `limit`, `cron`, `every`, `data`, `job_opts`, `remark`, `created_at`, `updated_at`) VALUES (3, '定时清空任务日志', 'LogClearJob.clearTaskLog', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:3:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}', '定时清空任务日志', '2022-04-18 13:51:58.066927', '2023-05-09 01:05:54.000000');
INSERT INTO `sys_task` (`id`, `name`, `service`, `type`, `status`, `start_time`, `end_time`, `limit`, `cron`, `every`, `data`, `job_opts`, `remark`, `created_at`, `updated_at`) VALUES (4, '访问百度首页', 'HttpRequestJob.handle', 0, 0, NULL, NULL, 1, '* * * * * ?', NULL, '{\"url\":\"https://www.baidu.com\",\"method\":\"get\"}', NULL, '访问百度首页', '2022-04-29 00:34:59.365492', '2022-04-29 13:02:32.000000');
INSERT INTO `sys_task` (`id`, `name`, `service`, `type`, `status`, `start_time`, `end_time`, `limit`, `cron`, `every`, `data`, `job_opts`, `remark`, `created_at`, `updated_at`) VALUES (5, '发送邮箱', 'EmailJob.send', 0, 0, NULL, NULL, -1, '0 0 0 1 * ?', NULL, '{\"subject\":\"这是标题\",\"to\":\"zeyu57@163.com\",\"content\":\"这是正文\"}', NULL, '每月发送邮箱', '2022-05-14 19:58:51.344360', '2022-05-14 19:58:51.000000');
COMMIT;

-- ----------------------------
-- Table structure for sys_task_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_task_log`;
CREATE TABLE `sys_task_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskId` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `consume_time` int DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_46ad23dbfa00ffe8b33f0c3eae4` (`taskId`),
  CONSTRAINT `FK_46ad23dbfa00ffe8b33f0c3eae4` FOREIGN KEY (`taskId`) REFERENCES `sys_task` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_task_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `psalt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint DEFAULT '1',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `deptId` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`) USING BTREE,
  KEY `FK_41e45b2bcc509e4b7ab67fe6bf7` (`deptId`),
  CONSTRAINT `FK_41e45b2bcc509e4b7ab67fe6bf7` FOREIGN KEY (`deptId`) REFERENCES `sys_dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `username`, `password`, `avatar`, `email`, `phone`, `remark`, `psalt`, `status`, `created_at`, `updated_at`, `nick_name`, `qq`, `deptId`) VALUES (1, 'admin', 'a11571e778ee85e82caae2d980952546', '/upload/logo-202305072136471.jpeg', 'hi@kuizuo.cn', NULL, '管理员', 'xQYCspvFb8cAW6GG1pOoUGTLqsuUSO3d', 1, '2022-04-18 13:51:58.000000', '2023-05-07 21:36:31.000000', '愧怍', '911993023', 1);
INSERT INTO `sys_user` (`id`, `username`, `password`, `avatar`, `email`, `phone`, `remark`, `psalt`, `status`, `created_at`, `updated_at`, `nick_name`, `qq`, `deptId`) VALUES (2, 'user', 'dbd89546dec743f82bb9073d6ac39361', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=911993023', 'kuizuo12@163.com', NULL, '无', 'qlovDV7pL5dPYPI3QgFFo1HH74nP6sJe', 1, '2022-05-05 15:21:29.941577', '2023-05-07 21:42:54.000000', '用户', '911993023', 2);
INSERT INTO `sys_user` (`id`, `username`, `password`, `avatar`, `email`, `phone`, `remark`, `psalt`, `status`, `created_at`, `updated_at`, `nick_name`, `qq`, `deptId`) VALUES (8, 'kuizuo', 'f03fa2a99595127b9a39587421d471f6', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=911993023', '911993023@qq.com', NULL, NULL, 'NbGM1z9Vhgo7f4dd2I7JGaGP12RidZdE', 1, '2022-05-27 00:49:42.341553', '2023-05-07 21:40:46.000000', '愧怍小儿', '911993023', 6);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_depts_sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_depts_sys_dept`;
CREATE TABLE `sys_user_depts_sys_dept` (
  `sysUserId` int NOT NULL,
  `sysDeptId` int NOT NULL,
  PRIMARY KEY (`sysUserId`,`sysDeptId`) USING BTREE,
  KEY `IDX_6157b48ab86c9043672a57f1b9` (`sysUserId`) USING BTREE,
  KEY `IDX_865845258bb0dc77d628fff629` (`sysDeptId`) USING BTREE,
  CONSTRAINT `FK_6157b48ab86c9043672a57f1b92` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_865845258bb0dc77d628fff6295` FOREIGN KEY (`sysDeptId`) REFERENCES `sys_dept` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_user_depts_sys_dept
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_user_roles_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_roles_sys_role`;
CREATE TABLE `sys_user_roles_sys_role` (
  `sysUserId` int NOT NULL,
  `sysRoleId` int NOT NULL,
  PRIMARY KEY (`sysUserId`,`sysRoleId`) USING BTREE,
  KEY `IDX_d1daac450217c1a1e384e99254` (`sysUserId`) USING BTREE,
  KEY `IDX_45602f09af1715f5532db91a43` (`sysRoleId`) USING BTREE,
  CONSTRAINT `FK_45602f09af1715f5532db91a43d` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`),
  CONSTRAINT `FK_d1daac450217c1a1e384e99254a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_user_roles_sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_roles_sys_role` (`sysUserId`, `sysRoleId`) VALUES (1, 1);
INSERT INTO `sys_user_roles_sys_role` (`sysUserId`, `sysRoleId`) VALUES (2, 3);
INSERT INTO `sys_user_roles_sys_role` (`sysUserId`, `sysRoleId`) VALUES (8, 1);
COMMIT;

-- ----------------------------
-- Table structure for tool-storage
-- ----------------------------
DROP TABLE IF EXISTS `tool-storage`;
CREATE TABLE `tool-storage` (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `ext_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '文件名',
  `fileName` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '真实文件名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of tool-storage
-- ----------------------------
BEGIN;
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-05-15 23:18:10.106054', '2022-05-15 23:18:10.106054', 1, 'jpg', '/upload/logo-202205152318102.jpg', '图片', '41.72 KB', 1, '', NULL);
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 12:17:26.620764', '2022-06-24 12:17:26.620764', 2, 'jpg', '/upload/group-202206241217613.jpg', '图片', '8.91 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:11:11.063990', '2022-06-24 13:11:11.063990', 3, 'jpg', '/upload/group-202206241311059.jpg', '图片', '8.81 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:23:53.792470', '2022-06-24 13:23:53.792470', 4, 'jpg', '/upload/group-202206241323789.jpg', '图片', '8.81 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:25:18.967834', '2022-06-24 13:25:18.967834', 5, 'jpg', '/upload/group-202206241325965.jpg', '图片', '8.81 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:28:10.010700', '2022-06-24 13:28:10.010700', 6, 'jpg', '/upload/10557-202206241328008.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:32:02.690719', '2022-06-24 13:32:02.690719', 7, 'jpg', '/upload/10557-202206241332687.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:39:57.191874', '2022-06-24 13:39:57.191874', 8, 'jpg', '/upload/10557-202206241339189.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 13:41:43.325983', '2022-06-24 13:41:43.325983', 9, 'jpg', '/upload/10557-202206241341323.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:10:04.938689', '2022-06-24 14:10:04.938689', 10, 'jpg', '/upload/-38937d964dcd5466-202206241410927.jpg', '图片', '70.65 KB', 1, '-38937d964dcd5466', '-38937d964dcd5466.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:12:56.211305', '2022-06-24 14:12:56.211305', 11, 'jpg', '/upload/-38937d964dcd5466-202206241412204.jpg', '图片', '70.65 KB', 1, '-38937d964dcd5466', '-38937d964dcd5466.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:25:21.195792', '2022-06-24 14:25:21.195792', 12, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241425187.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:25:48.458873', '2022-06-24 14:25:48.458873', 13, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241425455.jpg', '图片', '78.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:28:44.183225', '2022-06-24 14:28:44.183225', 14, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241428850.jpg', '图片', '41.61 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:28:49.604961', '2022-06-24 14:28:49.604961', 15, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241428518.jpg', '图片', '41.61 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:29:32.674298', '2022-06-24 14:29:32.674298', 16, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241429629.jpg', '图片', '78.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:47:13.811704', '2022-06-24 14:47:13.811704', 17, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241447238.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:47:23.298837', '2022-06-24 14:47:23.298837', 18, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241447396.jpg', '图片', '78.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:47:31.946829', '2022-06-24 14:47:31.946829', 19, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241447789.jpg', '图片', '15.86 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:50:30.696426', '2022-06-24 14:50:30.696426', 20, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241450688.jpg', '图片', '15.86 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:52:08.792906', '2022-06-24 14:52:08.792906', 21, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241452009.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:52:47.278072', '2022-06-24 14:52:47.278072', 22, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241452273.jpg', '图片', '39.86 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-06-24 14:52:59.298522', '2022-06-24 14:52:59.298522', 23, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241452293.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-11-06 17:27:43.130669', '2022-11-06 17:27:43.130669', 24, 'ico', '/upload/favicon-202211061727124.ico', '其他', '4.19 KB', 1, 'favicon', 'favicon.ico');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2022-11-06 17:27:45.921296', '2022-11-06 17:27:45.921296', 25, 'ico', '/upload/favicon-202211061727919.ico', '其他', '4.19 KB', 1, 'favicon', 'favicon.ico');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2023-05-07 21:20:49.120395', '2023-05-07 21:20:49.120395', 26, 'png', '/upload/my_Mac-202305072120101.png', '图片', '267.7 KB', 1, 'my_Mac-202305072120101.png', 'my_Mac.png');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2023-05-07 21:33:02.159688', '2023-05-07 21:33:02.159688', 27, 'png', '/upload/my_Mac-202305072133154.png', '图片', '267.7 KB', 1, 'my_Mac-202305072133154.png', 'my_Mac.png');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2023-05-07 21:33:56.738289', '2023-05-07 21:33:56.738289', 28, 'png', '/upload/my_Mac-202305072133730.png', '图片', '267.7 KB', 1, 'my_Mac-202305072133730.png', 'my_Mac.png');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2023-05-07 21:34:18.178203', '2023-05-07 21:34:18.178203', 29, 'jpeg', '/upload/logo-202305072134173.jpeg', '图片', '50.96 KB', 1, 'logo-202305072134173.jpeg', 'logo.png.jpeg');
INSERT INTO `tool-storage` (`created_at`, `updated_at`, `id`, `ext_name`, `path`, `type`, `size`, `user_id`, `name`, `fileName`) VALUES ('2023-05-07 21:36:29.472406', '2023-05-07 21:36:29.472406', 30, 'jpeg', '/upload/logo-202305072136471.jpeg', '图片', '50.96 KB', 1, 'logo-202305072136471.jpeg', 'logo.png.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for user_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `user_access_tokens`;
CREATE TABLE `user_access_tokens` (
  `id` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `value` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `expired_at` datetime NOT NULL COMMENT '令牌过期时间',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '令牌创建时间',
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_71a030e491d5c8547fc1e38ef82` (`userId`) USING BTREE,
  CONSTRAINT `FK_71a030e491d5c8547fc1e38ef82` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_access_tokens
-- ----------------------------
BEGIN;
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('0bf66501-ccfd-400c-8de4-f0aff0d70028', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM1NTA3N30.3DKfu-794mMuF46rWzvjbfsQcPdya9Nqh2IVSAD8rNI', '2023-04-26 00:51:18', '2023-04-25 00:51:17.630677', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('1779d7ff-f1f4-4edd-b995-d876bd317aaf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1MzE3ODN9.iKDSvpXdxdBg7UQrfjQVDz2fErlHeh8ygqA63T7dGqQ', '2023-05-09 15:43:04', '2023-05-08 15:43:03.855091', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('234632bc-2647-4491-8c2c-2f69a305fa9b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1MzExNzJ9.66izLsX7mOWOST0FQDxQyCmaW49NH2H1pqcBNApZSdw', '2023-05-09 15:32:52', '2023-05-08 15:32:52.038154', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('2adcce23-88b6-40b4-8f0a-e022c7ae1c08', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjEwOTUxN30.UtIWO-WE5NB_OjF9GE3mEMBRwh94WRFv2UCwqZOgjRk', '2023-04-23 04:38:38', '2023-04-22 04:38:37.530570', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('2e6d7a6d-26d6-4301-bd56-49d8e1a27d9a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NjQxNjd9.cDC9kGTGHZdZKtovQZ1GWlBkm7tZoB-cYLPqhcemwa8', '2023-05-08 20:56:08', '2023-05-07 20:56:07.999893', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('307ab961-fdb8-489b-a091-0e9b38864398', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NTk2MTN9.Lwgze5hMux2CnQuy2EV7rP5tmIioaO2vezovPvmBlu0', '2023-05-08 19:40:14', '2023-05-07 19:40:13.866115', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('3b4718f7-4256-4f06-94d5-0d6fe2f97d93', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1MzAxMTN9.yPzZ0j2feQ6wEDfFGf_0w-9OCRE2eWWLJwOHdHrhyWU', '2023-05-09 15:15:13', '2023-05-08 15:15:13.388511', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('3d498280-12f0-46b6-92ff-f4308b17a6fe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1NjU0NTB9.x2KHTjhoGl2sQ6J3al6kao28sOSKbI6tX0EbZO56Bhw', '2023-05-10 01:04:10', '2023-05-09 01:04:10.082704', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('3dad2744-7743-43be-bdc8-4ab8bf0b1769', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDkyMX0.Mx4dc-_hD9H-zRHoGWsa_TvV02OYQ7cP7spTYd0CeXY', '2023-04-22 05:08:42', '2023-04-21 05:08:41.867064', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('487babbf-855d-4dc4-b65a-b0cc975ed6bd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NzExNTR9.MIOmKXgAWjK9Zh5x7entXsVL9Cb-DsRF64v1pYtLg14', '2023-05-08 22:52:35', '2023-05-07 22:52:34.914393', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('4b61741b-91f0-46b2-b7e7-351c430f189d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NjUyMzJ9.5fInUoEcOCV2CLbzaJiZVz7dNHkcAPrigfP9_mQh5QE', '2023-05-08 21:13:52', '2023-05-07 21:13:52.452001', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('5a3c5de6-d3f7-41ca-924e-4eec38da3f13', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1MjgzMjN9.Km2NnvWrRY4QVKsnWCjtPZHKDVww71bBn301Be2L1rs', '2023-05-09 14:45:23', '2023-05-08 14:45:23.060249', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('5bed43ff-fa88-4acc-b675-855834b80ee0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDAwNX0.n_gdgBk3X0fb3ux52CrqE7DDP2sspjQvmZplLdzjgUA', '2023-04-22 04:53:26', '2023-04-21 04:53:25.604921', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('65949f6f-8121-4bb6-b155-f7916c1daec7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MDg3MH0.4xXEBjgXZUi5KdJzsGx6vdBFxI8zGfl_jpVMw0hX-4s', '2023-04-25 20:54:30', '2023-04-24 20:54:30.153732', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('7010d2af-ec82-4baf-8f15-84df98386e40', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjI3ODcxNn0.JeeB5U2I8aquEAKHYdFQBgqaNsYV46EhYKRP3JRueTI', '2023-04-25 03:38:37', '2023-04-24 03:38:36.584456', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('78f0765e-5c59-493b-801d-bf7a6b79586e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDA2MH0.IKDcnww6bzi3ZZVGtL4Hh2U9XQrGaTL0d71J3HNJUAg', '2023-04-22 04:54:20', '2023-04-21 04:54:20.070467', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('944b1d90-f533-4ea5-ad86-ace2d4c3f8b5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODMzMDc0NDJ9.N7UlguyXHOwqwRm7AVCtFCbY0SOBjSUC5N0jIdz_YTs', '2023-05-07 01:24:03', '2023-05-06 01:24:02.563759', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('97f35e6b-340f-41d7-8116-97a5564cc7b8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODMzMDgzOTF9.Udfzns4f4DU43JRrZbyd4cMgWACvuJsgKg_KXm7vCUY', '2023-05-07 01:39:51', '2023-05-06 01:39:51.228687', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('9c43b599-c078-4a88-bae0-2028d44a44fb', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjE5MjY1Mn0.j6e69LCjkzxDSZ79Ygw-gWwa3IrwhYa28hjQbp3ewfA', '2023-04-24 03:44:13', '2023-04-23 03:44:12.662318', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('9f5a86ce-194b-4387-92d7-67836a70fb24', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MTA5M30.Ahtg4ROMt6qSh2B2TomGrcmyicSj6tliMLSaDQGfW-Q', '2023-04-25 20:58:14', '2023-04-24 20:58:13.814960', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('a8ec700c-2bdf-4330-8337-4bd8d98f0d61', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODMzOTgwMjh9.CLjc--zjqfcdDe_rlqt0bXv8X7LlvnmlfYXjxlFzM3A', '2023-05-08 02:33:48', '2023-05-07 02:33:48.329350', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('b69bcc8d-8885-40fa-be0e-f9a08cdc5efd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1NDk1Njl9.LW-NTlO2g78DQWyFYa-h0ZPJ1Js1EGnejHYHCv3W0wc', '2023-05-09 20:39:30', '2023-05-08 20:39:29.899142', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('bbe565a6-0855-4b25-9bb1-2ad4fea64f91', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjEwODA2Nn0.67zqZTf5KTF8p1aGjMZ35BC5GDLtlHbGmWbi2UN3H_c', '2023-04-23 04:14:27', '2023-04-22 04:14:26.522260', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('c357272b-e46b-4289-a733-dd7e246d3946', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NTk3MTB9.h1VhCrTR589uOddHsBx1qF1tUJpIUgsqhmRvwCGuNm0', '2023-05-08 19:41:50', '2023-05-07 19:41:50.201243', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('c35d3119-556c-497b-88cd-54268995190b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NjQxNTB9.s7o8oDSMVq8yf6evmfzcNnBp9tVZPLw2hd_yT5jPQCE', '2023-05-08 20:55:51', '2023-05-07 20:55:50.530266', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('d0062a7d-1709-4a3a-81d1-05e300067ae4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODMzNjg4OTB9.CnY2O3h7pw-mcIY5UUUTWnTpupA3m5VTMJgilUCjzXw', '2023-05-07 18:28:11', '2023-05-06 18:28:10.584639', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('d1e6a05b-5d56-40ee-a4ce-e5cefd55f788', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NTg3OTl9.IDznIC_AZUaPSH1veONhnTIsElMPEI6gFhpnJI_V5kU', '2023-05-08 19:26:40', '2023-05-07 19:26:39.533957', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('d2bd1f2f-895e-4067-8cce-4c494546add5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MTA4OX0.1agXkuSj_BYNEWvBFLbFCoNomLrIhmCnfYSH2B0iHNM', '2023-04-25 20:58:09', '2023-04-24 20:58:09.019841', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('d2e4be5d-7b78-4e87-a95f-a805a2bc69a2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1MzAyOTh9.j5or19Y-V17G2vkgONbzoiMQkU61C3zgs4JlzmMQJLY', '2023-05-09 15:18:19', '2023-05-08 15:18:18.844441', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('d83f4349-1ab3-4775-bd5a-f04be509b3c3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyMzk0M30.mVxG_DKEZKYkPrvWNgRealrfvWGnaX0KOL_MWpaSDZ4', '2023-04-22 04:52:24', '2023-04-21 04:52:23.629859', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('e5ad0146-4bbe-41de-a0f2-a53d1c2fb92c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM1NDk3OTV9.0A2ARohEgZtKVdyAWEbYFUqgvNsITm4STWv8fuIElRw', '2023-05-09 20:43:15', '2023-05-08 20:43:15.359084', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('f47120d1-b8ee-4923-9ab8-b76476c75bed', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE2ODM0NjQwNzl9.-udoIxpKGaX39xGk4CiUifx8igYPDyuGCzbbsJrj_Zo', '2023-05-08 20:54:40', '2023-05-07 20:54:39.920058', 1);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('f5958e50-bad1-41f4-9539-d2abfca1842d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDA5NX0.7h1FNKJU85q09Sk6i-nU4p8CQOVtA-0NyTKzPfW1ymo', '2023-04-22 04:54:56', '2023-04-21 04:54:55.742586', 8);
INSERT INTO `user_access_tokens` (`id`, `value`, `expired_at`, `createdAt`, `userId`) VALUES ('ff028953-8102-4d96-8cd8-28c6f5a9b399', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MTA1N30.KkGdE9V7pHtm0MZNTXEU1VTbTY32I3rb5mkt5-_TNZY', '2023-04-25 20:57:37', '2023-04-24 20:57:37.326668', 1);
COMMIT;

-- ----------------------------
-- Table structure for user_refresh_tokens
-- ----------------------------
DROP TABLE IF EXISTS `user_refresh_tokens`;
CREATE TABLE `user_refresh_tokens` (
  `id` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `value` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `expired_at` datetime NOT NULL COMMENT '令牌过期时间',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '令牌创建时间',
  `accessTokenId` varchar(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `REL_1dfd080c2abf42198691b60ae3` (`accessTokenId`) USING BTREE,
  CONSTRAINT `FK_1dfd080c2abf42198691b60ae39` FOREIGN KEY (`accessTokenId`) REFERENCES `user_access_tokens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_refresh_tokens
-- ----------------------------
BEGIN;
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('04549d79-5ee0-435b-907f-bc2702eea11a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNG9ySV9VUUt0RmhLSnVyRnZkQkxWIiwiaWF0IjoxNjgyMzQxMDkzfQ.12ByMWz3UZGSfHb6YUfmoX0bucg2b3ikQtgsM3UhzLs', '2023-05-24 20:58:14', '2023-04-24 20:58:13.820359', '9f5a86ce-194b-4387-92d7-67836a70fb24');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('04b62a12-6e0f-43f2-9953-1a43cfd24887', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiejVhOVR0ZGxtdzNiWXE4aE1XWE1TIiwiaWF0IjoxNjgzNDY0MDc5fQ.qsuBcaeJoT9fNx1nliCskrioToW2LdARMy2a8TQ5yns', '2023-06-06 20:54:40', '2023-05-07 20:54:39.952371', 'f47120d1-b8ee-4923-9ab8-b76476c75bed');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('1144a9c4-5b2a-43ba-9c86-76d5371af3c2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoia1hyLUNkcS1UdXlFWTVhNDR2Z1lvIiwiaWF0IjoxNjgyMTA5NTE3fQ.43Jm0N8vxcyaBx3Sz9G0j-lqLjJSPQje3qolVNYGYOQ', '2023-05-22 04:38:38', '2023-04-22 04:38:37.539323', '2adcce23-88b6-40b4-8f0a-e022c7ae1c08');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('14bc9c01-89ea-46bc-becb-37d921439a54', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNUxLVjhITjJvWXFMRENYUzRWM29hIiwiaWF0IjoxNjgzNTMwMjk4fQ.WmtNIqngya5zlUmFUTBhN2hj8EKNOk05HwMIPJqGLmA', '2023-06-07 15:18:19', '2023-05-08 15:18:18.851664', 'd2e4be5d-7b78-4e87-a95f-a805a2bc69a2');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('1f1fb457-1500-4f83-a157-7403fd8313a1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMUlmMk5YT2RKX2R5YjBTNmxvMjlsIiwiaWF0IjoxNjgzNDY0MTUwfQ.8ig1gxdpnWG-HZln2H9Y9KwOYHIp7ChCIIWXE6kBv_Q', '2023-06-06 20:55:51', '2023-05-07 20:55:50.535196', 'c35d3119-556c-497b-88cd-54268995190b');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('1f690ae9-4739-4cdd-8bf6-d9acb87cb6ec', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoidEJidEpXMlZXQlNWcGVZanlDUE9qIiwiaWF0IjoxNjgzMzY4ODkwfQ.L5zA-26HiB0OxdWNoYe9stJ_yMA2vJU3Hm1byI0X7KE', '2023-06-05 18:28:11', '2023-05-06 18:28:10.591268', 'd0062a7d-1709-4a3a-81d1-05e300067ae4');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('20230db8-c819-4abd-aea4-6b590b221de4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiM0NFTTRsbnpzNWI0NGFfb0hQN25HIiwiaWF0IjoxNjgzNDU5NjEzfQ.Zh_Acff7pcRRTz5BJy2vLzmj896BG86Vk66aBN3vngA', '2023-06-06 19:40:14', '2023-05-07 19:40:13.871080', '307ab961-fdb8-489b-a091-0e9b38864398');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('280c1e4b-ce3a-4946-9a48-7f5faa210348', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiUmlqLXdXS1NHRnFsRFdaZzl2d1VRIiwiaWF0IjoxNjgyMTkyNjUyfQ.pShuvnZzYctXS0nAp5bSDznTOM9hPfWPLL_o4q2Wja0', '2023-05-23 03:44:13', '2023-04-23 03:44:12.671150', '9c43b599-c078-4a88-bae0-2028d44a44fb');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('432be2c2-fd24-4160-8ecb-1af8c4a3d09a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYVItZDdfZlpoSEZRS2FuUDhSSmlHIiwiaWF0IjoxNjgzNDY0MTY4fQ.AUF7HQwJv3voNelExZYDSo3HrSzz0344bo_IwHQEavc', '2023-06-06 20:56:08', '2023-05-07 20:56:08.032908', '2e6d7a6d-26d6-4301-bd56-49d8e1a27d9a');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('4764e824-0b84-4343-87e7-f83546648d96', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODZ5OWhBQW9vc1VZaS1Tb2d3RVhBIiwiaWF0IjoxNjgzNDY1MjMyfQ.Pe6q2BxPLXpr9Zdjq9sQ9eiopi1PovNWsblHYh0UXWA', '2023-06-06 21:13:52', '2023-05-07 21:13:52.456102', '4b61741b-91f0-46b2-b7e7-351c430f189d');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('47cb6050-a063-4b74-b676-969738f4f794', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoienFnemo1UUZOY2cxRFIyYVZsaERDIiwiaWF0IjoxNjgyMzQxMDU3fQ.JI6CBsh4ZHQYuG4M6H1SzOiYhfIX0NM8EMP7jqpanxM', '2023-05-24 20:57:37', '2023-04-24 20:57:37.334297', 'ff028953-8102-4d96-8cd8-28c6f5a9b399');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('4c0f5c37-30e5-4b22-93a1-97f58c36148e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoibFRzSFVkWi04RnNrZ3ZOUkN6UWpVIiwiaWF0IjoxNjgzNDU4Nzk5fQ.MEuTQ99nIvYpdiE1La9I4Z3kujyg15F8nbW2nI2uHQE', '2023-06-06 19:26:40', '2023-05-07 19:26:39.542084', 'd1e6a05b-5d56-40ee-a4ce-e5cefd55f788');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('52a1443e-0293-4d27-a3ef-14e0e92e4a3f', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNnlmYTJIOWprUFFKNG9fY2xuU3VoIiwiaWF0IjoxNjgzNTI4MzIzfQ.2gFiInIJV1Lr951VShNX9MVDz7K_ld7lZjgOFsnQCQs', '2023-06-07 14:45:23', '2023-05-08 14:45:23.070678', '5a3c5de6-d3f7-41ca-924e-4eec38da3f13');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('5468e045-2398-4fe6-a755-cadb234b89b1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoidHB1SXJYSmV0aTRsZ3A2YVdILXY3IiwiaWF0IjoxNjgzNTMwMTEzfQ.uupwL6i60s2xUui_izVzR6mQpNjOIZrrD4eug3c82rY', '2023-06-07 15:15:13', '2023-05-08 15:15:13.400645', '3b4718f7-4256-4f06-94d5-0d6fe2f97d93');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('6d25599a-63ce-43a0-80e9-23d01bb3975b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiVTFDUE5wVGtaQ3poUWZGbjdYU1RmIiwiaWF0IjoxNjgyMDI0MDYyfQ.uM4WEApfGWys8QGENo0ReUx0Q-_kjsxO6VE4reoBALQ', '2023-05-21 04:54:23', '2023-04-21 04:54:22.981536', '78f0765e-5c59-493b-801d-bf7a6b79586e');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('718f868f-2abb-4582-8b7d-e27ab0fae7ab', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoibGN5a2I0WFRvbzRycW1tQm1OZ3RCIiwiaWF0IjoxNjgyMzQxMDg5fQ.77egAIu4RBhFMzAoF8hu6yMgpJk1QSFM6fOO7iYgmUo', '2023-05-24 20:58:09', '2023-04-24 20:58:09.026788', 'd2bd1f2f-895e-4067-8cce-4c494546add5');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('7ad2bb1f-336d-484f-b03c-514ab6ee627a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiWTBvWHJtN3JwaENZYWppbXQtcVFOIiwiaWF0IjoxNjgyMDI0MDk1fQ.H6cykLbgbiIeXOp0gRdut_DaAZFVVaE7yl_Ib627iCs', '2023-05-21 04:54:56', '2023-04-21 04:54:55.750566', 'f5958e50-bad1-41f4-9539-d2abfca1842d');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('7ed812a1-f436-450a-8cf8-b6fda4a0fa88', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNXE5QTU0S0tIbFVNTFNsSHBCbHFaIiwiaWF0IjoxNjgzNTQ5Nzk1fQ.aBOpwOECwdLge9LqBUymzfPYKK9Og4EL0C5Fz9zj7PU', '2023-06-07 20:43:15', '2023-05-08 20:43:15.366164', 'e5ad0146-4bbe-41de-a0f2-a53d1c2fb92c');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('90619ec7-0284-4d6f-ba6a-e73ceda2f51b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoidE9SYzRHU2p0N0c5M1ZFU0NhV2lUIiwiaWF0IjoxNjgzNDcxMTU0fQ.VIUDG2jnzKOq-k7J5HcWdHmEE3eb7sCULPFaPXwNkgs', '2023-06-06 22:52:35', '2023-05-07 22:52:34.926119', '487babbf-855d-4dc4-b65a-b0cc975ed6bd');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('9f997f60-8e76-4887-a555-836f10ca7116', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiTldPZFUtWE9RUVBBMzBZMXpyRU01IiwiaWF0IjoxNjgzMzA4MzkxfQ.sS9SVJgsBXVDa0HTsrvTR8fmivAdcEFXikjpTWg2vtY', '2023-06-05 01:39:51', '2023-05-06 01:39:51.233999', '97f35e6b-340f-41d7-8116-97a5564cc7b8');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('a24b2605-b104-42db-9aa0-1eed89424fe1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoib0dCUU5vT21LY1daclk5VnF6ZExBIiwiaWF0IjoxNjgzNTQ5NTY5fQ.N3OyaFgWxagi1FJnSRbLTFvlAQAdEGetV54g4Ma7TYk', '2023-06-07 20:39:30', '2023-05-08 20:39:29.919806', 'b69bcc8d-8885-40fa-be0e-f9a08cdc5efd');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('bfe4bea4-7984-4bf9-89c5-721fd63dfbfa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiemc4dXNDS0dDZ0FtVWhUZDk0NG5tIiwiaWF0IjoxNjgzNTY1NDUwfQ.mCbGU2QJk583zEmXQwkpxXKdpLQaRSQGMWaeMAQbe4U', '2023-06-08 01:04:10', '2023-05-09 01:04:10.126591', '3d498280-12f0-46b6-92ff-f4308b17a6fe');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('c2f805b4-537a-4ff9-a5d8-71729768b47f', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNmtmcnB4dmJ0VE9kYS1sZFRYMU1TIiwiaWF0IjoxNjgzNTMxMTcyfQ.kJ7Yr273uP9AtifNR7UNppGRLAycSUwl9cDhSTAwTOk', '2023-06-07 15:32:52', '2023-05-08 15:32:52.046506', '234632bc-2647-4491-8c2c-2f69a305fa9b');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('e2214439-b13e-4ad1-afc5-456503f6ebf4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiRldLMkZuQW1fOTJndjI1dExiSWJ2IiwiaWF0IjoxNjgyMTA4MDY2fQ.dbAL_Ku14wSlYS15Z_vAALGNVCy5nHj7ixM6MpUqxdc', '2023-05-22 04:14:27', '2023-04-22 04:14:26.529963', 'bbe565a6-0855-4b25-9bb1-2ad4fea64f91');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('e6729ce7-5493-4cab-a880-bdf6a5faed49', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiN2o1UVRGWWVPaXhDeWRnN3dXWERuIiwiaWF0IjoxNjgyMzQwODcwfQ.7nKe1D0mr4YMeZ4eT2y4NmdH_FOGHHWSj6NGnlpZD4E', '2023-05-24 20:54:30', '2023-04-24 20:54:30.167355', '65949f6f-8121-4bb6-b155-f7916c1daec7');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('e71b677c-a7de-412f-aa9d-71d4023b32cd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjN4LTB1WnpTZHV5eTVJS0FKclZnIiwiaWF0IjoxNjgzNDU5NzEwfQ.gyhB_aQyGDxd_k-pruvPYaCWNg6zk_oYeV4T0uaNCn0', '2023-06-06 19:41:50', '2023-05-07 19:41:50.207363', 'c357272b-e46b-4289-a733-dd7e246d3946');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('eac37f86-54a4-4ffe-9389-82b9db3dc308', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiUlBwWUc1S1VRTEZjeUZ4NjFKMXp1IiwiaWF0IjoxNjgzNTMxNzgzfQ.1yySfkJWXdnKIuT4TLyaSTAWPUD2t39jX1s0792Tv54', '2023-06-07 15:43:04', '2023-05-08 15:43:03.873675', '1779d7ff-f1f4-4edd-b995-d876bd317aaf');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('eb364f01-99e6-4026-b62f-c29a09e85daa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMnhiMGc0QXIxSEF3ZkNPNnBMbmJKIiwiaWF0IjoxNjgzMzA3NDQyfQ.cPVPQZVbzbn5eXOjQHPpDHHHb7-8ZLvOMKv3FdIeDGI', '2023-06-05 01:24:03', '2023-05-06 01:24:02.579046', '944b1d90-f533-4ea5-ad86-ace2d4c3f8b5');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('f57f0b75-6f6a-4e85-832e-79942d4b4e0d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNHAzOWRWbW5VUnlTazZwSEl4eXZWIiwiaWF0IjoxNjgzMzk4MDI4fQ.HgB7lpblfciwY5Dx63hzubzccaNxiufeIGVXme-LmNY', '2023-06-06 02:33:48', '2023-05-07 02:33:48.345450', 'a8ec700c-2bdf-4330-8337-4bd8d98f0d61');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('f69912dc-a0ad-449f-85c9-7c9b6fd54593', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoia0VwaElIazB1bk53a3d6OVNUaXZsIiwiaWF0IjoxNjgyMDI0OTIxfQ.X4ylUdplFwh7xz7hUPoVsqp2hqAHhaJRAFuWxHyLTks', '2023-05-21 05:08:42', '2023-04-21 05:08:41.876765', '3dad2744-7743-43be-bdc8-4ab8bf0b1769');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('f9a31e97-1360-4a24-aa55-6f8dcda53c21', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiRDZxbVVZLU5GV2J1OF8xQlpDUEozIiwiaWF0IjoxNjgyMzU1MDc3fQ.ja0m-61rhDKYO6so99U2uA4wfNPgI6GFkv6T8ZN2Bjk', '2023-05-25 00:51:18', '2023-04-25 00:51:17.639191', '0bf66501-ccfd-400c-8de4-f0aff0d70028');
INSERT INTO `user_refresh_tokens` (`id`, `value`, `expired_at`, `createdAt`, `accessTokenId`) VALUES ('fa3e2c8d-764f-4969-9df4-2d5460fb809c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODZxcnNDUmdITHZLM2otUXJFYk42IiwiaWF0IjoxNjgyMjc4NzE2fQ.RZwUYQeTH7hd4F0GTNa7mb8OzjcTQTOCfYBX0Sfil68', '2023-05-24 03:38:37', '2023-04-24 03:38:36.592981', '7010d2af-ec82-4baf-8f15-84df98386e40');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
