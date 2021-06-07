/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2021-06-07 16:13:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userlike
-- ----------------------------
DROP TABLE IF EXISTS `userlike`;
CREATE TABLE `userlike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userlike
-- ----------------------------
INSERT INTO `userlike` VALUES ('3', '2', '5', '2021-06-06 15:29:29');
INSERT INTO `userlike` VALUES ('4', '2', '2', '2021-06-06 15:29:32');
INSERT INTO `userlike` VALUES ('5', '2', '3', '2021-06-06 15:29:38');
INSERT INTO `userlike` VALUES ('6', '4', '3', '2021-06-06 15:33:46');
INSERT INTO `userlike` VALUES ('7', '4', '5', '2021-06-06 15:34:01');
INSERT INTO `userlike` VALUES ('8', '5', '4', '2021-06-06 15:34:25');
INSERT INTO `userlike` VALUES ('9', '5', '1', '2021-06-06 15:34:27');
INSERT INTO `userlike` VALUES ('10', '5', '2', '2021-06-06 15:35:05');
INSERT INTO `userlike` VALUES ('11', '3', '1', '2021-06-06 15:35:59');
INSERT INTO `userlike` VALUES ('12', '3', '2', '2021-06-06 15:36:01');
INSERT INTO `userlike` VALUES ('13', '3', '4', '2021-06-06 15:43:41');
INSERT INTO `userlike` VALUES ('14', '1', '5', '2021-06-06 15:51:49');
INSERT INTO `userlike` VALUES ('15', '1', '4', '2021-06-06 15:52:27');
INSERT INTO `userlike` VALUES ('16', '1', '6', '2021-06-06 20:29:32');
INSERT INTO `userlike` VALUES ('17', '1', '10', '2021-06-07 10:58:55');
