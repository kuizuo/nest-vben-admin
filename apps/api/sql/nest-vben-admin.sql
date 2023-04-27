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

 Date: 27/04/2023 15:10:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for demo_entity
-- ----------------------------
DROP TABLE IF EXISTS `demo_entity`;
CREATE TABLE `demo_entity`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of demo_entity
-- ----------------------------

-- ----------------------------
-- Table structure for sys_captcha_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_captcha_log`;
CREATE TABLE `sys_captcha_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int(11) NULL DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_captcha_log
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, 'sys_user_initPassword', '初始密码', '123456', '创建管理员账号的初始密码', '2022-04-18 13:51:59.021771', '2022-04-18 13:51:59.176361');
INSERT INTO `sys_config` VALUES (2, 'sys_api_token', 'API Token', 'kz-admin', '用于请求 @ApiToken 的控制器', '2022-10-13 00:10:51.146746', '2022-10-13 00:12:29.000000');

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `orderNo` int(11) NULL DEFAULT 0,
  `mpath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `parentId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_c75280b01c49779f2323536db67`(`parentId`) USING BTREE,
  CONSTRAINT `FK_c75280b01c49779f2323536db67` FOREIGN KEY (`parentId`) REFERENCES `sys_dept` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (1, '2022-12-05 01:56:36.454842', '2022-12-05 01:56:36.000000', '华东分部', 1, '1.', NULL);
INSERT INTO `sys_dept` VALUES (2, '2022-12-05 01:56:51.609649', '2022-12-05 01:56:51.000000', '研发部', 1, '1.2.', 1);
INSERT INTO `sys_dept` VALUES (3, '2022-12-05 01:57:02.171144', '2022-12-05 01:57:02.000000', '市场部', 2, '1.3.', 1);
INSERT INTO `sys_dept` VALUES (4, '2022-12-05 01:57:09.787832', '2022-12-05 01:57:09.000000', '商务部', 3, '1.4.', 1);
INSERT INTO `sys_dept` VALUES (5, '2022-12-05 01:57:18.070162', '2022-12-05 01:57:18.000000', '财务部', 4, '1.5.', 1);
INSERT INTO `sys_dept` VALUES (6, '2022-12-05 01:57:32.261756', '2022-12-05 01:57:32.000000', '华南分部', 2, '6.', NULL);
INSERT INTO `sys_dept` VALUES (7, '2022-12-05 01:57:49.769066', '2022-12-05 01:57:49.000000', '西北分部', 3, '7.', NULL);
INSERT INTO `sys_dept` VALUES (8, '2022-12-05 01:57:59.323718', '2022-12-05 01:57:59.000000', '研发部', 1, '6.8.', 6);

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
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 122 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_login_log
-- ----------------------------
INSERT INTO `sys_login_log` VALUES (1, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50', '2022-05-01 00:13:29.203119', '2022-05-13 17:04:55.312794', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (14, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-13 16:52:27.475217', '2022-05-13 16:52:27.475217', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (15, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-13 16:53:17.363455', '2022-05-13 16:53:17.363455', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (16, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-14 16:53:38.296226', '2022-05-14 16:53:38.296226', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (17, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-14 19:14:48.397320', '2022-05-14 19:14:48.397320', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (18, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-15 01:00:50.365353', '2022-05-15 01:00:50.365353', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (19, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-15 01:11:02.770238', '2022-05-15 01:11:02.770238', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (20, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36 Edg/101.0.1210.39', '2022-05-15 15:47:00.475699', '2022-05-15 15:47:00.475699', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (21, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.47', '2022-05-16 19:54:11.508215', '2022-05-16 19:54:11.508215', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (22, 2, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0', '2022-05-16 21:28:50.058982', '2022-05-16 21:28:50.058982', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (23, 2, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.47', '2022-05-16 22:10:16.077302', '2022-05-16 22:10:16.077302', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (24, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.47', '2022-05-17 17:27:24.268632', '2022-05-17 17:27:24.268632', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (25, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-24 21:44:30.530596', '2022-05-24 21:44:30.530596', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (26, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-26 23:26:37.012410', '2022-05-26 23:26:37.012410', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (27, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-26 23:27:10.287027', '2022-05-26 23:27:10.287027', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (28, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-26 23:40:37.867300', '2022-05-26 23:40:37.867300', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (29, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-26 23:42:29.343866', '2022-05-26 23:42:29.343866', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (30, 7, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-27 00:47:35.601525', '2022-05-27 00:47:35.601525', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (31, 8, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-27 00:49:54.031877', '2022-05-27 00:49:54.031877', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (32, 8, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53', '2022-05-27 00:50:18.602503', '2022-05-27 00:50:18.602503', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (33, 2, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36', '2022-06-06 15:17:13.300024', '2022-06-06 15:17:13.300024', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (34, 2, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36', '2022-06-06 15:18:48.982612', '2022-06-06 15:18:48.982612', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (35, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-23 23:08:16.859012', '2022-06-23 23:08:16.859012', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (36, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-23 23:08:17.016878', '2022-06-23 23:08:17.016878', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (37, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 11:47:26.997003', '2022-06-24 11:47:26.997003', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (38, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 11:47:55.441337', '2022-06-24 11:47:55.441337', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (39, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 11:48:20.540839', '2022-06-24 11:48:20.540839', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (40, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 13:03:52.525444', '2022-06-24 13:03:52.525444', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (41, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 13:06:58.572895', '2022-06-24 13:06:58.572895', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (42, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 15:17:35.211475', '2022-06-24 15:17:35.211475', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (43, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 15:19:07.260109', '2022-06-24 15:19:07.260109', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (44, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-24 15:19:31.581676', '2022-06-24 15:19:31.581676', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (45, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44', '2022-06-26 18:15:09.486400', '2022-06-26 18:15:09.486400', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (46, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.27', '2022-09-06 22:24:54.498764', '2022-09-06 22:24:54.498764', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (47, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.27', '2022-09-13 19:33:22.410568', '2022-09-13 19:33:22.410568', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (48, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26', '2022-10-31 15:04:55.606683', '2022-10-31 15:04:55.606683', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (49, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26', '2022-10-31 15:04:58.259296', '2022-10-31 15:04:58.259296', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (50, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26', '2022-11-01 18:08:28.584756', '2022-11-01 18:08:28.584756', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (51, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26', '2022-11-01 18:08:28.688336', '2022-11-01 18:08:28.688336', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (52, 1, '127.0.0.1', NULL, '', '2022-11-05 11:07:37.216934', '2022-11-05 11:07:37.216934', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (53, 1, '127.0.0.1', NULL, '', '2022-11-05 11:07:37.327768', '2022-11-05 11:07:37.327768', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (54, 1, '127.0.0.1', NULL, '', '2022-11-05 11:08:42.396452', '2022-11-05 11:08:42.396452', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (55, 1, '127.0.0.1', NULL, '', '2022-11-05 11:13:56.641426', '2022-11-05 11:13:56.641426', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (56, 1, '127.0.0.1', NULL, '', '2022-11-05 11:16:04.895238', '2022-11-05 11:16:04.895238', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (57, 1, '127.0.0.1', NULL, '', '2022-11-06 16:38:57.908120', '2022-11-06 16:38:57.908120', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (58, 1, '127.0.0.1', NULL, '', '2022-11-06 16:38:57.980948', '2022-11-06 16:38:57.980948', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (59, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 12:51:07.999994', '2022-11-07 12:51:07.999994', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (60, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 12:52:02.675266', '2022-11-07 12:52:02.675266', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (61, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 12:52:02.745285', '2022-11-07 12:52:02.745285', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (62, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 12:54:01.477348', '2022-11-07 12:54:01.477348', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (63, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 12:54:01.545497', '2022-11-07 12:54:01.545497', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (64, 1, '127.0.0.1', NULL, '', '2022-11-07 13:40:48.996788', '2022-11-07 13:40:48.996788', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (65, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 13:59:13.486983', '2022-11-07 13:59:13.486983', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (66, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 13:59:13.554552', '2022-11-07 13:59:13.554552', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (67, 1, '127.0.0.1', NULL, '', '2022-11-07 14:21:37.231744', '2022-11-07 14:21:37.231744', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (68, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 15:37:58.753126', '2022-11-07 15:37:58.753126', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (69, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 15:38:00.125835', '2022-11-07 15:38:00.125835', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (70, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 15:38:00.846110', '2022-11-07 15:38:00.846110', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (71, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 15:38:59.849169', '2022-11-07 15:38:59.849169', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (72, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 15:39:16.547277', '2022-11-07 15:39:16.547277', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (73, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35', '2022-11-07 15:39:16.614087', '2022-11-07 15:39:16.614087', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (74, 1, '127.0.0.1', NULL, '', '2022-11-26 15:57:04.657473', '2022-11-26 15:57:04.657473', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (75, 1, '127.0.0.1', NULL, '', '2022-11-26 15:57:04.752585', '2022-11-26 15:57:04.752585', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (76, 1, '127.0.0.1', NULL, '', '2022-11-26 15:57:08.422146', '2022-11-26 15:57:08.422146', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (77, 1, '127.0.0.1', NULL, '', '2022-11-26 15:57:10.061229', '2022-11-26 15:57:10.061229', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (78, 1, '127.0.0.1', NULL, '', '2022-11-26 15:57:56.676087', '2022-11-26 15:57:56.676087', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (79, 1, '127.0.0.1', NULL, '', '2022-11-26 15:58:04.553299', '2022-11-26 15:58:04.553299', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (80, 1, '127.0.0.1', NULL, '', '2022-11-26 17:01:36.210175', '2022-11-26 17:01:36.210175', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (81, 1, '127.0.0.1', NULL, '', '2022-11-26 20:48:41.231206', '2022-11-26 20:48:41.231206', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (82, 1, '127.0.0.1', NULL, '', '2022-11-26 22:06:48.594422', '2022-11-26 22:06:48.594422', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (83, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:37.242862', '2022-11-27 01:35:37.242862', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (84, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:38.387048', '2022-11-27 01:35:38.387048', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (85, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:39.332949', '2022-11-27 01:35:39.332949', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (86, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:39.999632', '2022-11-27 01:35:39.999632', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (87, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:44.314032', '2022-11-27 01:35:44.314032', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (88, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:45.595382', '2022-11-27 01:35:45.595382', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (89, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:35:48.592366', '2022-11-27 01:35:48.592366', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (90, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:36:01.736387', '2022-11-27 01:36:01.736387', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (91, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:36:25.974168', '2022-11-27 01:36:25.974168', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (92, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42', '2022-11-27 01:36:26.049644', '2022-11-27 01:36:26.049644', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (93, 1, '127.0.0.1', NULL, '', '2022-11-27 02:51:18.247591', '2022-11-27 02:51:18.247591', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (94, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-04 17:30:50.411835', '2022-12-04 17:30:50.411835', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (95, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-04 17:30:50.502393', '2022-12-04 17:30:50.502393', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (96, 1, '127.0.0.1', NULL, '', '2022-12-04 18:06:54.585153', '2022-12-04 18:06:54.585153', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (97, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-04 20:38:47.891225', '2022-12-04 20:38:47.891225', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (98, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-05 01:47:34.373737', '2022-12-05 01:47:34.373737', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (99, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-05 01:47:34.596282', '2022-12-05 01:47:34.596282', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (100, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-05 01:49:35.102707', '2022-12-05 01:49:35.102707', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (101, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-05 01:49:35.321044', '2022-12-05 01:49:35.321044', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (102, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-05 01:52:17.987180', '2022-12-05 01:52:17.987180', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (103, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-05 01:52:18.198881', '2022-12-05 01:52:18.198881', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (104, 1, '127.0.0.1', NULL, '', '2022-12-05 16:04:38.238089', '2022-12-05 16:04:38.238089', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (105, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-06 19:42:50.746844', '2022-12-06 19:42:50.746844', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (106, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.62', '2022-12-06 19:42:54.075760', '2022-12-06 19:42:54.075760', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (107, 8, '127.0.0.1', NULL, '', '2023-04-21 03:25:15.495274', '2023-04-21 03:25:15.495274', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (108, 8, '127.0.0.1', NULL, '', '2023-04-21 04:08:14.150734', '2023-04-21 04:08:14.150734', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (109, 8, '127.0.0.1', NULL, '', '2023-04-21 04:10:10.322960', '2023-04-21 04:10:10.322960', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (110, 8, '127.0.0.1', NULL, '', '2023-04-21 04:11:58.244376', '2023-04-21 04:11:58.244376', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (111, 8, '127.0.0.1', NULL, '', '2023-04-21 04:54:24.277997', '2023-04-21 04:54:24.277997', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (112, 8, '127.0.0.1', NULL, '', '2023-04-21 04:54:55.963152', '2023-04-21 04:54:55.963152', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (113, 8, '127.0.0.1', NULL, '', '2023-04-22 04:14:27.070841', '2023-04-22 04:14:27.070841', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (114, 8, '127.0.0.1', NULL, '', '2023-04-22 04:38:37.671012', '2023-04-22 04:38:37.671012', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (115, 8, '127.0.0.1', NULL, '', '2023-04-23 03:44:13.363656', '2023-04-23 03:44:13.363656', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (116, 8, '127.0.0.1', NULL, '', '2023-04-24 03:38:37.221518', '2023-04-24 03:38:37.221518', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (117, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58', '2023-04-24 20:54:32.303519', '2023-04-24 20:54:32.303519', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (118, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58', '2023-04-24 20:57:37.567019', '2023-04-24 20:57:37.567019', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (119, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58', '2023-04-24 20:58:08.989896', '2023-04-24 20:58:08.989896', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (120, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58', '2023-04-24 20:58:13.788621', '2023-04-24 20:58:13.788621', ' 本机地址', NULL);
INSERT INTO `sys_login_log` VALUES (121, 1, '127.0.0.1', NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58', '2023-04-25 00:51:19.161474', '2023-04-25 00:51:19.161474', ' 本机地址', NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 66 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-15 01:11:36.682283', 1, NULL, '/system', '系统管理', '', 0, 'ant-design:setting-outlined', 254, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2023-04-27 15:09:13.793338', 2, 1, '/system/user', '用户管理', 'sys:user:list', 1, '', 0, '/system/user/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2023-04-27 15:09:17.428496', 3, 1, '/system/role', '角色管理', 'sys:role:list,sys:role:page', 1, '', 1, '/system/role/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2023-04-27 15:09:21.433081', 4, 1, '/system/menu', '菜单管理', 'sys:menu:list', 1, '', 2, '/system/menu/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-10-12 23:30:14.914107', 5, 1, '/system/monitor', '系统监控', '', 0, '', 5, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2023-04-27 15:09:26.977343', 6, 5, '/system/monitor/online', '在线用户', 'sys:online:list', 1, '', 0, '/system/monitor/online/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 16:57:03.198541', '2023-04-27 15:09:35.157344', 7, 5, '/sys/monitor/login-log', '登录日志', '', 1, '', 0, '/system/monitor/login-log/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 16:13:44.214923', '2022-05-05 15:14:51.878278', 8, 5, '/system/monitor/serve', '服务监控', 'sys:monitor:serve', 1, '', 4, '/admin/system/monitor/serve/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-10-12 23:30:04.361622', 9, 1, '/system/schedule', '任务调度', '', 0, '', 6, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2023-04-27 15:09:41.145352', 10, 9, '/system/schedule/task', '定时任务', '', 1, '', 0, '/system/schedule/task/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2023-04-27 15:09:47.258201', 11, 9, '/system/schedule/log', '任务日志', 'sys:task:page', 1, '', 0, '/system/schedule/log/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 13:51:56.794076', '2022-05-05 15:14:43.240670', 12, NULL, '/document', '文档', '', 0, 'ion:tv-outline', 2, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 20:06:18.596668', '2022-05-05 15:16:25.575966', 13, 12, 'https://vvbin.cn/doc-next/', 'Vben项目文档', '', 0, '', 1, NULL, 1, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2022-05-05 00:46:15.381404', '2022-05-05 15:16:28.377252', 14, 12, 'https://typeorm.bootcss.com/', 'Typeorm中文文档', NULL, 1, '', 3, NULL, 1, 1, 1, 1);
INSERT INTO `sys_menu` VALUES ('2022-05-05 00:47:18.653750', '2022-05-05 15:16:31.808051', 15, 12, 'https://docs.nestjs.cn/', 'Nest.js中文文档', '', 1, '', 4, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 12:40:23.328931', '2022-05-05 15:14:36.736848', 16, NULL, '/dashboard', '仪表盘', NULL, 0, 'ion:grid-outline', 0, 'LAYOUT', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 12:41:24.136217', '2022-05-05 15:16:33.686876', 17, 16, '/dashboard/workbench', '工作台', 'dashboard:workbench', 1, '', 2, '/dashboard/workbench/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 12:42:45.781049', '2022-05-05 15:16:35.792168', 18, 16, '/dashboard/analysis', '分析页', 'dashboard:analysis', 1, '', 1, '/dashboard/analysis/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-05 21:47:57.744418', '2023-04-27 15:09:51.200199', 19, 1, '/system/user_detail/:id', '用户详情', 'sys:user:detail', 1, '', 10, '/system/user/UserDetail', 1, 0, 1, 0);
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
INSERT INTO `sys_menu` VALUES ('2022-05-13 18:00:17.507170', '2023-04-27 15:10:05.842940', 49, 48, '/tools/email', '邮件工具', 'sys:tools:email', 1, '', 1, '/tools/email/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-14 19:14:40.038017', '2022-05-15 01:27:44.000000', 50, 49, NULL, '发送邮件', 'tools:email:send', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-15 01:26:45.531494', '2023-04-27 15:10:09.620932', 51, 48, '/tools/storage', '存储管理', 'tools:storage:list', 1, '', 2, '/tools/storage/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-15 01:27:32.585503', '2022-05-15 01:27:32.585503', 52, 51, NULL, '文件上传', 'upload', 2, '', 0, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-05-15 16:53:02.343638', '2022-05-15 16:53:02.343638', 53, 51, NULL, '文件删除', 'tools:storage:delete', 2, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-06-06 15:20:26.509930', '2022-06-06 15:20:40.000000', 54, 2, NULL, '修改密码', 'sys:user:password', 2, '', 5, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-06-24 01:37:11.694562', '2023-04-27 15:10:13.134294', 55, NULL, '/profile/setting', '个人设置', '', 1, '', 252, '/system/profile/index', 1, 0, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-10-13 00:08:57.971469', '2023-04-27 15:10:16.986072', 56, 1, '/system/param-config', '参数配置', 'sys:param-config:page', 1, '', 4, '/system/param-config/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-10-13 00:14:34.220628', '2022-10-13 00:14:34.220628', 57, 56, NULL, '新增', 'sys:param-config:add', 2, '', 1, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-10-13 00:14:52.311703', '2022-10-13 00:14:52.311703', 58, 56, NULL, '更新', 'sys:param-config:update', 2, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-10-13 00:15:09.832903', '2022-10-13 00:15:09.832903', 59, 56, NULL, '删除', 'sys:param-config:delete', 2, '', 3, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-10-13 00:15:36.452796', '2022-10-13 00:15:36.452796', 60, 56, NULL, '查询', 'sys:param-config:info', 2, '', 4, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-12-05 01:34:18.599016', '2023-04-27 15:10:22.151071', 61, 1, '/system/dept', '部门管理', 'sys:dept:list', 1, '', 3, '/system/dept/index', 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-12-05 01:38:21.933874', '2022-12-05 01:52:11.000000', 62, 61, NULL, '新增', 'sys:dept:add', 2, '', 1, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-12-05 01:39:25.630217', '2022-12-05 01:39:25.630217', 63, 61, NULL, '更新', 'sys:dept:update', 2, '', 2, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-12-05 01:40:41.930385', '2022-12-05 01:40:41.930385', 64, 61, NULL, '删除', 'sys:dept:delete', 2, '', 3, NULL, 1, 1, 1, 0);
INSERT INTO `sys_menu` VALUES ('2022-12-05 01:42:19.474973', '2022-12-05 01:42:19.474973', 65, 61, NULL, '详情', 'sys:dept:detail', 2, '', 4, NULL, 1, 1, 1, 0);

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
INSERT INTO `sys_role` VALUES ('2022-04-18 13:51:57.000000', '2023-04-25 02:25:58.326102', 1, 'admin', '管理员', NULL, 1);
INSERT INTO `sys_role` VALUES ('2022-04-18 15:52:51.645691', '2022-05-05 14:04:03.913722', 2, 'user', '用户', '', 1);
INSERT INTO `sys_role` VALUES ('2022-04-21 01:45:10.448676', '2022-05-05 14:04:01.437848', 3, 'test', '测试', '', 1);

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `role_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (1, 1, 1, '2022-04-18 17:04:19.462420', '2022-04-18 17:04:19.462420');
INSERT INTO `sys_role_menu` VALUES (2, 2, 16, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (3, 2, 18, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (4, 2, 17, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');
INSERT INTO `sys_role_menu` VALUES (9, 2, 43, '2022-05-05 15:25:04.461136', '2022-05-05 15:25:04.461136');

-- ----------------------------
-- Table structure for sys_role_menus_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menus_sys_menu`;
CREATE TABLE `sys_role_menus_sys_menu`  (
  `sysRoleId` int(11) NOT NULL,
  `sysMenuId` int(11) NOT NULL,
  PRIMARY KEY (`sysRoleId`, `sysMenuId`) USING BTREE,
  INDEX `IDX_e7c90b5f1eae0da649c74cfbcb`(`sysRoleId`) USING BTREE,
  INDEX `IDX_c6e4b76cb3f4ab1028f2461963`(`sysMenuId`) USING BTREE,
  CONSTRAINT `FK_c6e4b76cb3f4ab1028f24619635` FOREIGN KEY (`sysMenuId`) REFERENCES `sys_menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e7c90b5f1eae0da649c74cfbcb4` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menus_sys_menu
-- ----------------------------

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
INSERT INTO `sys_task` VALUES (3, '定时清空任务日志', 'SysLogClearJob.clearTaskLog', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"key\":\"__default__:3:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}', '定时清空任务日志', '2022-04-18 13:51:58.066927', '2023-04-25 18:25:56.000000');
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_task_log
-- ----------------------------
INSERT INTO `sys_task_log` VALUES (1, 3, 1, NULL, 0, '2022-05-03 23:58:35.696042', '2022-05-03 23:58:35.696042');
INSERT INTO `sys_task_log` VALUES (2, 5, 1, NULL, 0, '2022-05-14 19:58:56.289519', '2022-05-14 19:58:56.289519');
INSERT INTO `sys_task_log` VALUES (3, 3, 0, 'Error: Nest could not find SysLogClearJob element (this provider does not exist in the current context)', 0, '2022-12-05 03:00:00.092995', '2022-12-05 03:00:00.092995');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'admin', 'a11571e778ee85e82caae2d980952546', 'https://vvbin.cn/doc-next/logo.png', 'hi@kuizuo.cn', NULL, '管理员', 'xQYCspvFb8cAW6GG1pOoUGTLqsuUSO3d', 1, '2022-04-18 13:51:58.000000', '2022-12-05 02:19:20.628813', '愧怍', '911993023');
INSERT INTO `sys_user` VALUES (2, 'user', '98b6f2563e89b1a0e4af638345155527', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=911993023', 'kuizuo12@163.com', NULL, '无', 'qlovDV7pL5dPYPI3QgFFo1HH74nP6sJe', 1, '2022-05-05 15:21:29.941577', '2022-12-05 15:36:02.000000', '用户', '911993023');
INSERT INTO `sys_user` VALUES (8, 'kuizuo', 'f03fa2a99595127b9a39587421d471f6', 'https://q1.qlogo.cn/g?b=qq&s=100&nk=911993023', '911993023@qq.com', NULL, NULL, 'NbGM1z9Vhgo7f4dd2I7JGaGP12RidZdE', 1, '2022-05-27 00:49:42.341553', '2022-12-05 02:19:22.235686', '愧怍小儿', '911993023');
INSERT INTO `sys_user` VALUES (9, '秦勇', '56a30d90c695f08bfa222f86c4c00f32', NULL, NULL, NULL, NULL, 'SO1RlR7K31rXcFSjbPvFjbAWqkqppQ96', 1, '2023-04-21 04:10:23.009115', '2023-04-21 04:10:23.009115', NULL, NULL);

-- ----------------------------
-- Table structure for sys_user_depts_sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_depts_sys_dept`;
CREATE TABLE `sys_user_depts_sys_dept`  (
  `sysUserId` int(11) NOT NULL,
  `sysDeptId` int(11) NOT NULL,
  PRIMARY KEY (`sysUserId`, `sysDeptId`) USING BTREE,
  INDEX `IDX_6157b48ab86c9043672a57f1b9`(`sysUserId`) USING BTREE,
  INDEX `IDX_865845258bb0dc77d628fff629`(`sysDeptId`) USING BTREE,
  CONSTRAINT `FK_6157b48ab86c9043672a57f1b92` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_865845258bb0dc77d628fff6295` FOREIGN KEY (`sysDeptId`) REFERENCES `sys_dept` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_depts_sys_dept
-- ----------------------------

-- ----------------------------
-- Table structure for sys_user_roles_sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_roles_sys_role`;
CREATE TABLE `sys_user_roles_sys_role`  (
  `sysUserId` int(11) NOT NULL,
  `sysRoleId` int(11) NOT NULL,
  PRIMARY KEY (`sysUserId`, `sysRoleId`) USING BTREE,
  INDEX `IDX_d1daac450217c1a1e384e99254`(`sysUserId`) USING BTREE,
  INDEX `IDX_45602f09af1715f5532db91a43`(`sysRoleId`) USING BTREE,
  CONSTRAINT `FK_45602f09af1715f5532db91a43d` FOREIGN KEY (`sysRoleId`) REFERENCES `sys_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d1daac450217c1a1e384e99254a` FOREIGN KEY (`sysUserId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_roles_sys_role
-- ----------------------------
INSERT INTO `sys_user_roles_sys_role` VALUES (1, 1);

-- ----------------------------
-- Table structure for tool-storage
-- ----------------------------
DROP TABLE IF EXISTS `tool-storage`;
CREATE TABLE `tool-storage`  (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ext_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件名',
  `fileName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实文件名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tool-storage
-- ----------------------------
INSERT INTO `tool-storage` VALUES ('2022-05-15 23:18:10.106054', '2022-05-15 23:18:10.106054', 1, 'jpg', '/upload/logo-202205152318102.jpg', '图片', '41.72 KB', 1, '', NULL);
INSERT INTO `tool-storage` VALUES ('2022-06-24 12:17:26.620764', '2022-06-24 12:17:26.620764', 2, 'jpg', '/upload/group-202206241217613.jpg', '图片', '8.91 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:11:11.063990', '2022-06-24 13:11:11.063990', 3, 'jpg', '/upload/group-202206241311059.jpg', '图片', '8.81 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:23:53.792470', '2022-06-24 13:23:53.792470', 4, 'jpg', '/upload/group-202206241323789.jpg', '图片', '8.81 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:25:18.967834', '2022-06-24 13:25:18.967834', 5, 'jpg', '/upload/group-202206241325965.jpg', '图片', '8.81 KB', 1, 'group', 'group.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:28:10.010700', '2022-06-24 13:28:10.010700', 6, 'jpg', '/upload/10557-202206241328008.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:32:02.690719', '2022-06-24 13:32:02.690719', 7, 'jpg', '/upload/10557-202206241332687.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:39:57.191874', '2022-06-24 13:39:57.191874', 8, 'jpg', '/upload/10557-202206241339189.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 13:41:43.325983', '2022-06-24 13:41:43.325983', 9, 'jpg', '/upload/10557-202206241341323.jpg', '图片', '70.66 KB', 1, '10557', '10557.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:10:04.938689', '2022-06-24 14:10:04.938689', 10, 'jpg', '/upload/-38937d964dcd5466-202206241410927.jpg', '图片', '70.65 KB', 1, '-38937d964dcd5466', '-38937d964dcd5466.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:12:56.211305', '2022-06-24 14:12:56.211305', 11, 'jpg', '/upload/-38937d964dcd5466-202206241412204.jpg', '图片', '70.65 KB', 1, '-38937d964dcd5466', '-38937d964dcd5466.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:25:21.195792', '2022-06-24 14:25:21.195792', 12, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241425187.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:25:48.458873', '2022-06-24 14:25:48.458873', 13, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241425455.jpg', '图片', '78.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:28:44.183225', '2022-06-24 14:28:44.183225', 14, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241428850.jpg', '图片', '41.61 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:28:49.604961', '2022-06-24 14:28:49.604961', 15, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241428518.jpg', '图片', '41.61 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:29:32.674298', '2022-06-24 14:29:32.674298', 16, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241429629.jpg', '图片', '78.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:47:13.811704', '2022-06-24 14:47:13.811704', 17, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241447238.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:47:23.298837', '2022-06-24 14:47:23.298837', 18, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241447396.jpg', '图片', '78.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:47:31.946829', '2022-06-24 14:47:31.946829', 19, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241447789.jpg', '图片', '15.86 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:50:30.696426', '2022-06-24 14:50:30.696426', 20, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241450688.jpg', '图片', '15.86 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:52:08.792906', '2022-06-24 14:52:08.792906', 21, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241452009.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:52:47.278072', '2022-06-24 14:52:47.278072', 22, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241452273.jpg', '图片', '39.86 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-06-24 14:52:59.298522', '2022-06-24 14:52:59.298522', 23, 'jpg', '/upload/-7dc4e24e8a3c2126-202206241452293.jpg', '图片', '70.65 KB', 1, '-7dc4e24e8a3c2126', '-7dc4e24e8a3c2126.jpg');
INSERT INTO `tool-storage` VALUES ('2022-11-06 17:27:43.130669', '2022-11-06 17:27:43.130669', 24, 'ico', '/upload/favicon-202211061727124.ico', '其他', '4.19 KB', 1, 'favicon', 'favicon.ico');
INSERT INTO `tool-storage` VALUES ('2022-11-06 17:27:45.921296', '2022-11-06 17:27:45.921296', 25, 'ico', '/upload/favicon-202211061727919.ico', '其他', '4.19 KB', 1, 'favicon', 'favicon.ico');

-- ----------------------------
-- Table structure for user_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `user_access_tokens`;
CREATE TABLE `user_access_tokens`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expired_at` datetime(0) NOT NULL COMMENT '令牌过期时间',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '令牌创建时间',
  `userId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_71a030e491d5c8547fc1e38ef82`(`userId`) USING BTREE,
  CONSTRAINT `FK_71a030e491d5c8547fc1e38ef82` FOREIGN KEY (`userId`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_access_tokens
-- ----------------------------
INSERT INTO `user_access_tokens` VALUES ('0bf66501-ccfd-400c-8de4-f0aff0d70028', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM1NTA3N30.3DKfu-794mMuF46rWzvjbfsQcPdya9Nqh2IVSAD8rNI', '2023-04-26 00:51:18', '2023-04-25 00:51:17.630677', 1);
INSERT INTO `user_access_tokens` VALUES ('2adcce23-88b6-40b4-8f0a-e022c7ae1c08', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjEwOTUxN30.UtIWO-WE5NB_OjF9GE3mEMBRwh94WRFv2UCwqZOgjRk', '2023-04-23 04:38:38', '2023-04-22 04:38:37.530570', 8);
INSERT INTO `user_access_tokens` VALUES ('3dad2744-7743-43be-bdc8-4ab8bf0b1769', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDkyMX0.Mx4dc-_hD9H-zRHoGWsa_TvV02OYQ7cP7spTYd0CeXY', '2023-04-22 05:08:42', '2023-04-21 05:08:41.867064', 8);
INSERT INTO `user_access_tokens` VALUES ('5bed43ff-fa88-4acc-b675-855834b80ee0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDAwNX0.n_gdgBk3X0fb3ux52CrqE7DDP2sspjQvmZplLdzjgUA', '2023-04-22 04:53:26', '2023-04-21 04:53:25.604921', 8);
INSERT INTO `user_access_tokens` VALUES ('65949f6f-8121-4bb6-b155-f7916c1daec7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MDg3MH0.4xXEBjgXZUi5KdJzsGx6vdBFxI8zGfl_jpVMw0hX-4s', '2023-04-25 20:54:30', '2023-04-24 20:54:30.153732', 1);
INSERT INTO `user_access_tokens` VALUES ('7010d2af-ec82-4baf-8f15-84df98386e40', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjI3ODcxNn0.JeeB5U2I8aquEAKHYdFQBgqaNsYV46EhYKRP3JRueTI', '2023-04-25 03:38:37', '2023-04-24 03:38:36.584456', 8);
INSERT INTO `user_access_tokens` VALUES ('78f0765e-5c59-493b-801d-bf7a6b79586e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDA2MH0.IKDcnww6bzi3ZZVGtL4Hh2U9XQrGaTL0d71J3HNJUAg', '2023-04-22 04:54:20', '2023-04-21 04:54:20.070467', 8);
INSERT INTO `user_access_tokens` VALUES ('9c43b599-c078-4a88-bae0-2028d44a44fb', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjE5MjY1Mn0.j6e69LCjkzxDSZ79Ygw-gWwa3IrwhYa28hjQbp3ewfA', '2023-04-24 03:44:13', '2023-04-23 03:44:12.662318', 8);
INSERT INTO `user_access_tokens` VALUES ('9f5a86ce-194b-4387-92d7-67836a70fb24', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MTA5M30.Ahtg4ROMt6qSh2B2TomGrcmyicSj6tliMLSaDQGfW-Q', '2023-04-25 20:58:14', '2023-04-24 20:58:13.814960', 1);
INSERT INTO `user_access_tokens` VALUES ('bbe565a6-0855-4b25-9bb1-2ad4fea64f91', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjEwODA2Nn0.67zqZTf5KTF8p1aGjMZ35BC5GDLtlHbGmWbi2UN3H_c', '2023-04-23 04:14:27', '2023-04-22 04:14:26.522260', 8);
INSERT INTO `user_access_tokens` VALUES ('d2bd1f2f-895e-4067-8cce-4c494546add5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MTA4OX0.1agXkuSj_BYNEWvBFLbFCoNomLrIhmCnfYSH2B0iHNM', '2023-04-25 20:58:09', '2023-04-24 20:58:09.019841', 1);
INSERT INTO `user_access_tokens` VALUES ('d83f4349-1ab3-4775-bd5a-f04be509b3c3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyMzk0M30.mVxG_DKEZKYkPrvWNgRealrfvWGnaX0KOL_MWpaSDZ4', '2023-04-22 04:52:24', '2023-04-21 04:52:23.629859', 8);
INSERT INTO `user_access_tokens` VALUES ('f5958e50-bad1-41f4-9539-d2abfca1842d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjAyNDA5NX0.7h1FNKJU85q09Sk6i-nU4p8CQOVtA-0NyTKzPfW1ymo', '2023-04-22 04:54:56', '2023-04-21 04:54:55.742586', 8);
INSERT INTO `user_access_tokens` VALUES ('ff028953-8102-4d96-8cd8-28c6f5a9b399', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6W10sImlhdCI6MTY4MjM0MTA1N30.KkGdE9V7pHtm0MZNTXEU1VTbTY32I3rb5mkt5-_TNZY', '2023-04-25 20:57:37', '2023-04-24 20:57:37.326668', 1);

-- ----------------------------
-- Table structure for user_refresh_tokens
-- ----------------------------
DROP TABLE IF EXISTS `user_refresh_tokens`;
CREATE TABLE `user_refresh_tokens`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expired_at` datetime(0) NOT NULL COMMENT '令牌过期时间',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '令牌创建时间',
  `accessTokenId` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_1dfd080c2abf42198691b60ae3`(`accessTokenId`) USING BTREE,
  CONSTRAINT `FK_1dfd080c2abf42198691b60ae39` FOREIGN KEY (`accessTokenId`) REFERENCES `user_access_tokens` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_refresh_tokens
-- ----------------------------
INSERT INTO `user_refresh_tokens` VALUES ('04549d79-5ee0-435b-907f-bc2702eea11a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNG9ySV9VUUt0RmhLSnVyRnZkQkxWIiwiaWF0IjoxNjgyMzQxMDkzfQ.12ByMWz3UZGSfHb6YUfmoX0bucg2b3ikQtgsM3UhzLs', '2023-05-24 20:58:14', '2023-04-24 20:58:13.820359', '9f5a86ce-194b-4387-92d7-67836a70fb24');
INSERT INTO `user_refresh_tokens` VALUES ('1144a9c4-5b2a-43ba-9c86-76d5371af3c2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoia1hyLUNkcS1UdXlFWTVhNDR2Z1lvIiwiaWF0IjoxNjgyMTA5NTE3fQ.43Jm0N8vxcyaBx3Sz9G0j-lqLjJSPQje3qolVNYGYOQ', '2023-05-22 04:38:38', '2023-04-22 04:38:37.539323', '2adcce23-88b6-40b4-8f0a-e022c7ae1c08');
INSERT INTO `user_refresh_tokens` VALUES ('280c1e4b-ce3a-4946-9a48-7f5faa210348', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiUmlqLXdXS1NHRnFsRFdaZzl2d1VRIiwiaWF0IjoxNjgyMTkyNjUyfQ.pShuvnZzYctXS0nAp5bSDznTOM9hPfWPLL_o4q2Wja0', '2023-05-23 03:44:13', '2023-04-23 03:44:12.671150', '9c43b599-c078-4a88-bae0-2028d44a44fb');
INSERT INTO `user_refresh_tokens` VALUES ('47cb6050-a063-4b74-b676-969738f4f794', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoienFnemo1UUZOY2cxRFIyYVZsaERDIiwiaWF0IjoxNjgyMzQxMDU3fQ.JI6CBsh4ZHQYuG4M6H1SzOiYhfIX0NM8EMP7jqpanxM', '2023-05-24 20:57:37', '2023-04-24 20:57:37.334297', 'ff028953-8102-4d96-8cd8-28c6f5a9b399');
INSERT INTO `user_refresh_tokens` VALUES ('6d25599a-63ce-43a0-80e9-23d01bb3975b', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiVTFDUE5wVGtaQ3poUWZGbjdYU1RmIiwiaWF0IjoxNjgyMDI0MDYyfQ.uM4WEApfGWys8QGENo0ReUx0Q-_kjsxO6VE4reoBALQ', '2023-05-21 04:54:23', '2023-04-21 04:54:22.981536', '78f0765e-5c59-493b-801d-bf7a6b79586e');
INSERT INTO `user_refresh_tokens` VALUES ('718f868f-2abb-4582-8b7d-e27ab0fae7ab', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoibGN5a2I0WFRvbzRycW1tQm1OZ3RCIiwiaWF0IjoxNjgyMzQxMDg5fQ.77egAIu4RBhFMzAoF8hu6yMgpJk1QSFM6fOO7iYgmUo', '2023-05-24 20:58:09', '2023-04-24 20:58:09.026788', 'd2bd1f2f-895e-4067-8cce-4c494546add5');
INSERT INTO `user_refresh_tokens` VALUES ('7ad2bb1f-336d-484f-b03c-514ab6ee627a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiWTBvWHJtN3JwaENZYWppbXQtcVFOIiwiaWF0IjoxNjgyMDI0MDk1fQ.H6cykLbgbiIeXOp0gRdut_DaAZFVVaE7yl_Ib627iCs', '2023-05-21 04:54:56', '2023-04-21 04:54:55.750566', 'f5958e50-bad1-41f4-9539-d2abfca1842d');
INSERT INTO `user_refresh_tokens` VALUES ('e2214439-b13e-4ad1-afc5-456503f6ebf4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiRldLMkZuQW1fOTJndjI1dExiSWJ2IiwiaWF0IjoxNjgyMTA4MDY2fQ.dbAL_Ku14wSlYS15Z_vAALGNVCy5nHj7ixM6MpUqxdc', '2023-05-22 04:14:27', '2023-04-22 04:14:26.529963', 'bbe565a6-0855-4b25-9bb1-2ad4fea64f91');
INSERT INTO `user_refresh_tokens` VALUES ('e6729ce7-5493-4cab-a880-bdf6a5faed49', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiN2o1UVRGWWVPaXhDeWRnN3dXWERuIiwiaWF0IjoxNjgyMzQwODcwfQ.7nKe1D0mr4YMeZ4eT2y4NmdH_FOGHHWSj6NGnlpZD4E', '2023-05-24 20:54:30', '2023-04-24 20:54:30.167355', '65949f6f-8121-4bb6-b155-f7916c1daec7');
INSERT INTO `user_refresh_tokens` VALUES ('f69912dc-a0ad-449f-85c9-7c9b6fd54593', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoia0VwaElIazB1bk53a3d6OVNUaXZsIiwiaWF0IjoxNjgyMDI0OTIxfQ.X4ylUdplFwh7xz7hUPoVsqp2hqAHhaJRAFuWxHyLTks', '2023-05-21 05:08:42', '2023-04-21 05:08:41.876765', '3dad2744-7743-43be-bdc8-4ab8bf0b1769');
INSERT INTO `user_refresh_tokens` VALUES ('f9a31e97-1360-4a24-aa55-6f8dcda53c21', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiRDZxbVVZLU5GV2J1OF8xQlpDUEozIiwiaWF0IjoxNjgyMzU1MDc3fQ.ja0m-61rhDKYO6so99U2uA4wfNPgI6GFkv6T8ZN2Bjk', '2023-05-25 00:51:18', '2023-04-25 00:51:17.639191', '0bf66501-ccfd-400c-8de4-f0aff0d70028');
INSERT INTO `user_refresh_tokens` VALUES ('fa3e2c8d-764f-4969-9df4-2d5460fb809c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiODZxcnNDUmdITHZLM2otUXJFYk42IiwiaWF0IjoxNjgyMjc4NzE2fQ.RZwUYQeTH7hd4F0GTNa7mb8OzjcTQTOCfYBX0Sfil68', '2023-05-24 03:38:37', '2023-04-24 03:38:36.592981', '7010d2af-ec82-4baf-8f15-84df98386e40');

SET FOREIGN_KEY_CHECKS = 1;
