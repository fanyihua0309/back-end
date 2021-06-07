/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2021-06-07 16:14:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usersee
-- ----------------------------
DROP TABLE IF EXISTS `usersee`;
CREATE TABLE `usersee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rate` smallint(6) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usersee
-- ----------------------------
INSERT INTO `usersee` VALUES ('1', '1', '1', '5', '2021-06-06 15:27:43');
INSERT INTO `usersee` VALUES ('2', '2', '4', '4', '2021-06-06 15:29:47');
INSERT INTO `usersee` VALUES ('3', '2', '2', '4', '2021-06-06 15:29:56');
INSERT INTO `usersee` VALUES ('4', '4', '1', '4', '2021-06-06 15:33:33');
INSERT INTO `usersee` VALUES ('5', '4', '3', '5', '2021-06-06 15:33:45');
INSERT INTO `usersee` VALUES ('6', '4', '5', '5', '2021-06-06 15:33:58');
INSERT INTO `usersee` VALUES ('7', '5', '3', '4', '2021-06-06 15:34:39');
INSERT INTO `usersee` VALUES ('8', '5', '2', '4', '2021-06-06 15:34:57');
INSERT INTO `usersee` VALUES ('9', '3', '5', '5', '2021-06-06 15:36:12');
INSERT INTO `usersee` VALUES ('10', '3', '1', '5', '2021-06-06 15:43:30');
INSERT INTO `usersee` VALUES ('11', '1', '5', '5', '2021-06-06 15:51:55');
