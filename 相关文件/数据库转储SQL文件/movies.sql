/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50610
Source Host           : localhost:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50610
File Encoding         : 65001

Date: 2021-06-07 16:12:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for movies
-- ----------------------------
DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `date` date DEFAULT NULL,
  `area` varchar(128) DEFAULT NULL,
  `director` varchar(128) DEFAULT NULL,
  `starring` varchar(128) DEFAULT NULL,
  `type` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of movies
-- ----------------------------
INSERT INTO `movies` VALUES ('1', '肖申克的救赎', '1994-10-14', '美国', '弗兰克·德拉邦特', ' 蒂姆·罗宾斯', '剧情 犯罪');
INSERT INTO `movies` VALUES ('2', '霸王别姬', '1993-07-26', '中国大陆 中国香港', '陈凯歌', '张国荣 张丰毅', '剧情 爱情 同性');
INSERT INTO `movies` VALUES ('3', '阿甘正传', '1994-07-06', '美国', '罗伯特·泽米吉斯', '汤姆·汉克斯', '剧情 爱情');
INSERT INTO `movies` VALUES ('4', '这个杀手不太冷', '1994-09-14', '法国 美国', '吕克·贝松', '让·雷诺', '剧情 动作 犯罪');
INSERT INTO `movies` VALUES ('5', '泰坦尼克号', '1997-12-19', '美国 墨西哥', '詹姆斯·卡梅隆', '莱昂纳多·迪卡普里奥', '剧情 爱情 灾难');
INSERT INTO `movies` VALUES ('6', '美丽人生', '1997-12-20', '意大利', '罗伯托·贝尼尼', '罗伯托·贝尼尼', '剧情 战争 爱情');
INSERT INTO `movies` VALUES ('7', '千与千寻', '2001-07-20', '日本', '宫崎骏', '柊瑠美', '动画 奇幻');
INSERT INTO `movies` VALUES ('8', '辛德勒的名单', '1994-02-04', '美国', '史蒂文·斯皮尔伯格', ' 连姆·尼森', '剧情 战争 历史');
INSERT INTO `movies` VALUES ('9', '盗梦空间', '2010-07-16', '美国 英国', '克里斯托弗·诺兰', '莱昂纳多·迪卡普里奥', '剧情 科幻 冒险');
INSERT INTO `movies` VALUES ('10', '忠犬八公的故事', '2010-03-12', '美国 英国', '拉斯·霍尔斯道姆', '斯蒂芬·P·林赛', '剧情');
INSERT INTO `movies` VALUES ('11', '星际穿越', '2014-11-07', '美国 英国', '克里斯托弗·诺兰', '马修·麦康纳', '剧情 科幻 冒险');
INSERT INTO `movies` VALUES ('12', '楚门的世界', '1998-06-05', '美国', '彼得·威尔', '金·凯瑞', '剧情 科幻');
INSERT INTO `movies` VALUES ('13', '海上钢琴师', '1998-10-28', '意大利', '朱塞佩·托纳多雷', '蒂姆·罗斯', '剧情 音乐');
INSERT INTO `movies` VALUES ('14', '三傻大闹宝莱坞', '2009-12-25', '印度', '拉吉库马尔·希拉尼', '阿米尔·汗', '剧情 喜剧 爱情');
INSERT INTO `movies` VALUES ('15', '机器人总动员', '2008-06-27', '美国', '安德鲁·斯坦顿', '本·贝尔特', '科幻 动画');
INSERT INTO `movies` VALUES ('16', '放牛班的春天', '2004-03-17', '法国 瑞士', '克里斯托夫·巴拉蒂', '乔治·沙普罗', '剧情 音乐');
INSERT INTO `movies` VALUES ('17', '无间道', '2002-12-12', '中国香港', '刘伟强 麦兆辉', '刘德华 梁朝伟', '剧情 犯罪 惊悚');
INSERT INTO `movies` VALUES ('18', '疯狂动物城', '2016-03-04', '美国', '拜伦·霍华德', '金妮弗·古德温', '动画 冒险 喜剧');
INSERT INTO `movies` VALUES ('19', '大话西游之大圣娶亲', '1995-02-04', '中国香港 中国大陆', '刘镇伟', '周星驰 吴孟达', '喜剧 爱情 奇幻');
INSERT INTO `movies` VALUES ('20', '熔炉', '2011-09-22', '韩国', '黄东赫', '孔刘 郑有美', '剧情');
INSERT INTO `movies` VALUES ('21', '教父', '1972-03-24', '美国', '弗朗西斯·福特·科波拉', '马龙·白兰度', '剧情 犯罪');
INSERT INTO `movies` VALUES ('22', '当幸福来敲门', '2006-12-15', '美国', '加布里埃莱·穆奇诺', '威尔·史密斯', '剧情 家庭 传记');
INSERT INTO `movies` VALUES ('23', '龙猫', '1988-04-16', '日本', '宫崎骏', '日高法子', '剧情 奇幻 冒险');
INSERT INTO `movies` VALUES ('24', '怦然心动', '2010-09-10', '美国', '罗伯·莱纳', '玛德琳·卡罗尔 卡兰·麦克奥利菲', '剧情 爱情');
INSERT INTO `movies` VALUES ('25', '控方证人', '1957-12-17', '美国', '比利·怀德', '泰隆·鲍华', '剧情 悬疑 犯罪');
INSERT INTO `movies` VALUES ('26', '触不可及', '2011-11-02', '法国', '奥利维埃·纳卡什', '弗朗索瓦·克鲁塞', '剧情 喜剧');
