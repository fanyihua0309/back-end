/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2021-06-07 16:13:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(32) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '柠檬', '15651658181', 'nuaaccstfyh@163.com', 'fanyihua');
INSERT INTO `users` VALUES ('2', 'user1', '13860929570', '2684096603@qq.com', 'fanyihua');
INSERT INTO `users` VALUES ('3', 'user2', '15651658180', '2684096603@qq.com', 'fanyihua');
INSERT INTO `users` VALUES ('4', 'user3', '13860929571', '2684096603@qq.com', 'fanyihua');
INSERT INTO `users` VALUES ('5', 'user4', '15651658182', '2684096603@qq.com', 'fanyihua');
