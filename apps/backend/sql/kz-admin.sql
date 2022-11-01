/*
 Navicat Premium Data Transfer

 Source Server         : phpstudy
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : kz-admin

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 15/05/2022 23:19:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_2c363c25cf99bcaab3a7f389ba`(`key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, 'sys_user_initPassword', '初始密码', '123456', '创建管理员账号的初始密码', '2022-04-18 13:51:59.021771', '2022-04-18 13:51:59.176361');

-- ----------------------------
-- Table structure for sys_login_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_login_log`;
CREATE TABLE `sys_login_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `ua` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
INSERT INTO `sys_login_log` VALUES (1, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50', '2022-05-01 00:13:29.203119', '2022-05-13 17:04:55.312794', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (14, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-13 16:52:27.475217', '2022-05-13 16:52:27.475217', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (15, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-13 16:53:17.363455', '2022-05-13 16:53:17.363455', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (16, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-14 16:53:38.296226', '2022-05-14 16:53:38.296226', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (17, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-14 19:14:48.397320', '2022-05-14 19:14:48.397320', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (18, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-15 01:00:50.365353', '2022-05-15 01:00:50.365353', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (19, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-15 01:11:02.770238', '2022-05-15 01:11:02.770238', ' 本机地址');
INSERT INTO `sys_login_log` VALUES (20, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-15 15:47:00.475699', '2022-05-15 15:47:00.475699', ' 本机地址');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` int(11) NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '',
  `order_no` int(11) NULL DEFAULT 0,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keepalive` tinyint(4) NOT NULL DEFAULT 1,
  `show` tinyint(4) NOT NULL DEFAULT 1,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `external` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:11:36.682283', 1, NULL, '/system', '系统管理', '', 0, 'ant-design:setting-outlined', 254, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:03:56.210517', 2, 1, '/system/user', '用户管理', 'sys:user:list', 1, '', 0, '/admin/system/user/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:04:11.012979', 3, 1, '/system/role', '角色管理', 'sys:role:list,sys:role:page', 1, '', 1, '/admin/system/role/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:04:25.479739', 4, 1, '/system/menu', '菜单管理', 'sys:menu:list', 1, '', 2, '/admin/system/menu/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-05 14:25:40.809791', 5, 1, '/system/monitor', '系统监控', '', 0, '', 4, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:05:02.045318', 6, 5, '/system/monitor/online', '在线用户', 'sys:online:list', 1, '', 0, '/admin/system/monitor/online/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 16:57:03.198541', '2022-05-05 15:15:55.969186', 7, 5, '/sys/monitor/login-log', '登录日志', '', 1, '', 0, '/admin/system/monitor/login-log/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 16:13:44.214923', '2022-05-05 15:14:51.878278', 8, 5, '/system/monitor/serve', '服务监控', 'sys:monitor:serve', 1, '', 4, '/admin/system/monitor/serve/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:05:25.116518', 9, 1, '/system/schedule', '任务调度', '', 0, '', 5, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-05 15:16:50.331218', 10, 9, '/system/schedule/task', '定时任务', '', 1, '', 0, '/admin/system/schedule/task/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:05:22.437041', 11, 9, '/system/schedule/log', '任务日志', 'sys:task:page', 1, '', 0, '/admin/system/schedule/log/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-05 15:14:43.240670', 12, NULL, '/document', '文档', '', 0, 'ion:tv-outline', 2, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 20:06:18.596668', '2022-05-05 15:16:25.575966', 13, 12, 'https://vvbin.cn/doc-next/', 'Vben项目文档', '', 0, '', 1, NULL, 1, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2022-05-05 00:46:15.381404', '2022-05-05 15:16:28.377252', 14, 12, 'https://typeorm.bootcss.com/', 'Typeorm中文文档', NULL, 1, '', 3, NULL, 1, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2022-05-05 00:47:18.653750', '2022-05-05 15:16:31.808051', 15, 12, 'https://docs.nestjs.cn/', 'Nest.js中文文档', '', 1, '', 4, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 12:40:23.328931', '2022-05-05 15:14:36.736848', 16, NULL, '/dashboard', '仪表盘', NULL, 0, 'ion:grid-outline', 0, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 12:41:24.136217', '2022-05-05 15:16:33.686876', 17, 16, '/dashboard/workbench', '工作台', 'dashboard:workbench', 1, '', 2, '/dashboard/workbench/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 12:42:45.781049', '2022-05-05 15:16:35.792168', 18, 16, '/dashboard/analysis', '分析页', 'dashboard:analysis', 1, '', 1, '/dashboard/analysis/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 21:47:57.744418', '2022-05-05 14:26:02.429730', 19, 1, '/system/user_detail/:id', '用户详情', 'sys:user:detail', 1, '', 3, '/admin/system/user/UserDetail', 1, 0, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:29:42.984193', '2022-05-05 14:30:53.424785', 20, 2, NULL, '新增', 'sys:user:add', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:32:50.757513', '2022-05-05 14:32:50.757513', 21, 2, '', '删除', 'sys:user:delete', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:32:50.765599', '2022-05-05 14:34:09.576671', 22, 2, '', '更新', 'sys:user:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:32:50.762543', '2022-05-15 01:03:14.800895', 23, 2, '', '查询', 'sys:user:info', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:39:13.114441', '2022-05-05 14:40:21.091670', 24, 3, '', '新增', 'sys:role:add', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:38:10.600098', '2022-05-05 14:38:17.708100', 25, 3, '', '删除', 'sys:role:delete', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:39:13.119436', '2022-05-05 14:40:23.964640', 26, 3, '', '修改', 'sys:role:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:39:17.300382', '2022-05-15 01:04:04.777566', 27, 3, '', '查询', 'sys:role:info', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:42:21.553915', '2022-05-05 14:42:21.553915', 28, 4, NULL, '新增', 'sys:menu:add', 2, NULL, 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:42:21.558801', '2022-05-05 14:42:21.558801', 29, 4, NULL, '删除', 'sys:menu:delete', 2, NULL, 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:42:21.566086', '2022-05-05 14:42:21.566086', 30, 4, '', '修改', 'sys:menu:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:42:21.562494', '2022-05-05 14:42:21.562494', 31, 4, NULL, '查询', 'sys:menu:list,sys:menu:info', 2, NULL, 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:50:49.063275', '2022-05-15 01:04:50.613053', 32, 6, '', '下线', 'sys:online:kick', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.896098', '2022-05-05 14:54:07.896098', 34, 9, '', '新增', 'sys:task:add', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.901193', '2022-05-05 14:54:07.901193', 35, 9, '', '删除', 'sys:task:delete', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.904504', '2022-05-05 14:54:07.904504', 36, 9, '', '执行一次', 'sys:task:once', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.907401', '2022-05-15 01:05:13.935188', 37, 9, '', '查询', 'sys:task:info', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.910221', '2022-05-05 14:54:07.910221', 38, 9, '', '运行', 'sys:task:start', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.913098', '2022-05-05 14:54:07.913098', 39, 9, '', '暂停', 'sys:task:stop', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:54:07.916502', '2022-05-05 14:54:07.916502', 40, 9, '', '更新', 'sys:task:update', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:58:13.642200', '2022-05-05 14:58:13.642200', 41, 10, '', '查询', 'sys:log:login:page', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 14:58:13.646915', '2022-05-05 14:58:13.646915', 42, 10, '', '查询', 'sys:log:task:page', 2, '', 0, '', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 16:57:03.198541', '2022-05-05 14:26:06.488268', 43, NULL, '/about', '关于', '', 0, 'simple-icons:about-dot-me', 255, '/sys/about/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-13 17:29:13.961084', '2022-05-13 17:29:13.961084', 44, NULL, '/level', '多级菜单', NULL, 0, 'ant-design:menu-outlined', 253, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-13 17:30:07.968766', '2022-05-13 17:30:07.968766', 45, 44, '/level/menu1', 'Menu1', NULL, 0, '', 1, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-13 17:48:20.119632', '2022-05-13 17:49:28.218757', 46, 45, '/level/menu1/menu1-1', 'Menu-1-1', NULL, 1, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-13 17:48:46.887840', '2022-05-13 17:48:46.887840', 47, 44, '/level/menu2', 'Menu2', NULL, 1, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-13 17:58:08.175948', '2022-05-15 01:06:17.000000', 48, NULL, '/tools', '系统工具', NULL, 0, 'ant-design:tool-outlined', 254, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-13 18:00:17.507170', '2022-05-15 01:06:24.000000', 49, 48, '/tools/email', '邮件工具', 'sys:tools:email', 1, '', 1, '/admin/tools/email/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-14 19:14:40.038017', '2022-05-15 01:27:44.000000', 50, 49, NULL, '发送邮件', 'tools:email:send', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-15 01:26:45.531494', '2022-05-15 15:43:07.000000', 51, 48, '/tools/storage', '存储管理', 'tools:storage:list', 1, '', 2, '/admin/tools/storage/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-15 01:27:32.585503', '2022-05-15 01:27:32.585503', 52, 51, NULL, '文件上传', 'upload', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-15 16:53:02.343638', '2022-05-15 16:53:02.343638', 53, 51, NULL, '文件删除', 'tools:storage:delete', 2, '', 2, NULL, 1, 1, 1, 0);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` tinyint(4) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_223de54d6badbe43a5490450c3`(`name`) USING BTREE,
  UNIQUE INDEX `IDX_05edc0a51f41bb16b7d8137da9`(`value`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('2022-04-18 13:51:57.000000', '2022-04-18 14:20:58.233567', 1, 'root', '超级管理员', NULL, 1);
INSERT INTO `sys_role` VALUES ('2022-04-18 15:52:51.645691', '2022-05-05 14:04:03.913722', 2, 'user', '用户', '', 1);
INSERT INTO `sys_role` VALUES ('2022-04-21 01:45:10.448676', '2022-05-05 14:04:01.437848', 3, 'test', '测试', '', 1);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 1, 1, '2022-04-18 17:04:19.462420', '2022-04-18 17:04:19.462420');
INSERT INTO `sys_role_menu` VALUES (2, 2, 16, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (3, 2, 18, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (4, 2, 17, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (9, 2, 43, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (10, 2, 20, '2022-05-15 01:02:20.397784', '2022-05-15 01:02:20.397784');
INSERT INTO `sys_role_menu` VALUES (11, 2, 22, '2022-05-15 01:02:20.397784', '2022-05-15 01:02:20.397784');
INSERT INTO `sys_role_menu` VALUES (12, 2, 23, '2022-05-15 01:02:20.397784', '2022-05-15 01:02:20.397784');
INSERT INTO `sys_role_menu` VALUES (13, 2, 2, '2022-05-15 01:02:20.397784', '2022-05-15 01:02:20.397784');
INSERT INTO `sys_role_menu` VALUES (14, 2, 1, '2022-05-15 01:02:20.397784', '2022-05-15 01:02:20.397784');
INSERT INTO `sys_role_menu` VALUES (20, 2, 3, '2022-05-15 01:03:48.028164', '2022-05-15 01:03:48.028164');
INSERT INTO `sys_role_menu` VALUES (21, 2, 24, '2022-05-15 01:03:48.028164', '2022-05-15 01:03:48.028164');
INSERT INTO `sys_role_menu` VALUES (22, 2, 25, '2022-05-15 01:03:48.028164', '2022-05-15 01:03:48.028164');
INSERT INTO `sys_role_menu` VALUES (23, 2, 26, '2022-05-15 01:03:48.028164', '2022-05-15 01:03:48.028164');
INSERT INTO `sys_role_menu` VALUES (24, 2, 27, '2022-05-15 01:03:48.028164', '2022-05-15 01:03:48.028164');
INSERT INTO `sys_role_menu` VALUES (25, 2, 52, '2022-05-15 01:28:20.895618', '2022-05-15 01:28:20.895618');
INSERT INTO `sys_role_menu` VALUES (26, 2, 51, '2022-05-15 01:28:20.895618', '2022-05-15 01:28:20.895618');
INSERT INTO `sys_role_menu` VALUES (27, 2, 48, '2022-05-15 01:28:20.895618', '2022-05-15 01:28:20.895618');

-- ----------------------------
-- Table structure for sys_task
-- ----------------------------
DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` tinyint(4) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `start_time` datetime(0) NULL DEFAULT NULL,
  `end_time` datetime(0) NULL DEFAULT NULL,
  `limit` int(11) NULL DEFAULT 0,
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `every` int(11) NULL DEFAULT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `job_opts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ef8e5ab5ef2fe0ddb1428439ef`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_task
-- ----------------------------
INSERT INTO `sys_task` VALUES (2, '定时清空登录日志', 'SysLogClearJob.clearLoginLog', 0, 0, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:2:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":2}', '定时清空登录日志', '2022-04-18 13:51:58.066927', '2022-04-29 00:04:39.000000');
INSERT INTO `sys_task` VALUES (3, '定时清空任务日志', 'SysLogClearJob.clearTaskLog', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:3:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}', '定时清空任务日志', '2022-04-18 13:51:58.066927', '2022-05-15 23:14:58.000000');
INSERT INTO `sys_task` VALUES (4, '访问百度首页', 'HttpRequestJob.handle', 0, 0, NULL, NULL, 1, '* * * * * ?', NULL, '{\"url\":\"https://www.baidu.com\",\"method\":\"get\"}', NULL, '访问百度首页', '2022-04-29 00:34:59.365492', '2022-04-29 13:02:32.000000');
INSERT INTO `sys_task` VALUES (5, '发送邮箱', 'EmailJob.send', 0, 0, NULL, NULL, -1, '0 0 0 1 * ?', NULL, '{\"subject\":\"这是标题\",\"to\":\"zeyu57@163.com\",\"content\":\"这是正文\"}', NULL, '每月发送邮箱', '2022-05-14 19:58:51.344360', '2022-05-14 19:58:51.000000');

-- ----------------------------
-- Table structure for sys_task_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_task_log`;
CREATE TABLE `sys_task_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `consume_time` int(11) NULL DEFAULT 0,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_task_log
-- ----------------------------
INSERT INTO `sys_task_log` VALUES (1, 3, 1, NULL, 0, '2022-05-03 23:58:35.696042', '2022-05-03 23:58:35.696042');
INSERT INTO `sys_task_log` VALUES (2, 5, 1, NULL, 0, '2022-05-14 19:58:56.289519', '2022-05-14 19:58:56.289519');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `psalt` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(4) NULL DEFAULT 1,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9e7164b2f1ea1348bc0eb0a7da`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', 'ccdb5f7e5be14fe0c0528974428f79f9', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=911993023', 'kuizuo12@163.com', NULL, '描述', 'xQYCspvFb8cAW6GG1pOoUGTLqsuUSO3d', 1, '2022-04-18 13:51:58.000000', '2022-05-05 14:47:15.219140', '愧怍', '911993023');
INSERT INTO `sys_user` VALUES (2, 'user', '186ae252f2fb24d71c65708e5a6ec8eb', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=911993023', 'kuizuo12@163.com', NULL, NULL, 'qlovDV7pL5dPYPI3QgFFo1HH74nP6sJe', 1, '2022-05-05 15:21:29.941577', '2022-05-05 15:25:40.151674', '用户', '911993023');
INSERT INTO `sys_user` VALUES (3, 'user1', '47893b1c5727361051b4c19b28aa8696', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=12345', 'zeyu57@163.com', NULL, NULL, 'GiQSun6hrVL6oQmlfybuuC5Jodq3jkm4', 1, '2022-05-05 17:18:17.196300', '2022-05-05 17:18:17.196300', '12345', '12345');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, 1, '2022-04-20 14:08:52.788308', '2022-05-05 15:25:49.157062');
INSERT INTO `sys_user_role` VALUES (2, 2, 2, '2022-05-05 15:24:05.631702', '2022-05-05 15:25:52.773330');
INSERT INTO `sys_user_role` VALUES (3, 3, 2, '2022-05-05 17:18:17.200375', '2022-05-05 17:18:17.200375');

-- ----------------------------
-- Table structure for tool-storage
-- ----------------------------
DROP TABLE IF EXISTS `tool-storage`;
CREATE TABLE `tool-storage`  (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件名',
  `fileName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实文件名',
  `ext_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tool-storage
-- ----------------------------
INSERT INTO `tool-storage` VALUES ('2022-05-15 23:18:10.106054', '2022-05-15 23:18:10.106054', 1, 'logo', 'logo.jpg', 'jpg', '/upload/logo-202205152318102.jpg', '图片', '41.72 KB', 1);

SET FOREIGN_KEY_CHECKS = 1;
