/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100411
 Source Host           : localhost:3306
 Source Schema         : activity_pro

 Target Server Type    : MySQL
 Target Server Version : 100411
 File Encoding         : 65001

 Date: 16/08/2020 20:16:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for act_data
-- ----------------------------
DROP TABLE IF EXISTS `act_data`;
CREATE TABLE `act_data`  (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `activityId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `animation` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pro_id` int(11) NULL DEFAULT NULL,
  `css` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `option` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `covName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isShow` tinyint(4) NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE,
  INDEX `FK_db57179bea18ef21639733cc858`(`pro_id`) USING BTREE,
  CONSTRAINT `FK_db57179bea18ef21639733cc858` FOREIGN KEY (`pro_id`) REFERENCES `act_pro` (`_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of act_data
-- ----------------------------
INSERT INTO `act_data` VALUES (27, 'ca3c9741-b390-475e-99dc-af8c279b8954', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":184,\"left\":132,\"width\":166,\"height\":300,\"zIndex\":4,\"background\":\"rgba(162, 52, 52, 1)\",\"borderColor\":\"rgba(116, 52, 52, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":11,\"borderRadius\":71,\"color\":\"\"}', '{\"colorType\":false}', '块级元素1', 1);
INSERT INTO `act_data` VALUES (28, '8129bc02-2c99-462d-801a-17997f8e4dc8', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":53,\"left\":56,\"width\":102,\"height\":95,\"zIndex\":2,\"background\":\"rgba(242, 242, 242, 1)\",\"borderColor\":\"rgba(0, 0, 0, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":0,\"borderRadius\":20}', '{\"colorType\":false}', '块级元素2', 1);
INSERT INTO `act_data` VALUES (29, 'e2ffbc6c-99bd-432d-b138-de931c0fbd97', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":184,\"left\":20,\"width\":102,\"height\":95,\"zIndex\":3,\"background\":\"rgba(242, 242, 242, 1)\",\"borderColor\":\"rgba(0, 0, 0, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":0,\"borderRadius\":20}', '{\"colorType\":false}', '块级元素3441发是打发第三方', 1);
INSERT INTO `act_data` VALUES (31, '5d46ac27-a85a-49d3-a755-97765815de81', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":251,\"left\":152,\"width\":100,\"height\":100,\"zIndex\":5,\"background\":\"rgba(242, 242, 242, 1)\",\"borderColor\":\"rgba(0, 0, 0, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":0,\"borderRadius\":20}', '{\"colorType\":false}', '块级元素4', 1);
INSERT INTO `act_data` VALUES (32, '093ba47a-6787-491d-8e5f-b390d28c8212', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":94,\"left\":43,\"width\":166,\"height\":300,\"zIndex\":5,\"background\":\"rgba(162, 52, 52, 1)\",\"borderColor\":\"rgba(116, 52, 52, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":11,\"borderRadius\":71,\"color\":\"\"}', '{\"colorType\":false}', '块级元素5', 1);
INSERT INTO `act_data` VALUES (33, 'ff6b6638-6584-437a-ad8e-965b5eb68003', 'base-img', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":70,\"left\":141,\"width\":114,\"height\":57,\"zIndex\":5}', '{\"text\":\"i1596786268520logo01080_1703.jpg\",\"httpName\":\"we\"}', '图片2', 1);
INSERT INTO `act_data` VALUES (34, '17952628-e8dd-4777-9df1-4aaa42bac755', 'base-buttom', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":502,\"left\":152,\"width\":100,\"height\":50,\"zIndex\":6,\"background\":\"rgba(241, 241, 241, 1)\",\"color\":\"rgba(0, 0, 0, 1)\",\"fontSize\":29,\"borderColor\":\"rgba(0, 0, 0, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":0,\"borderRadius\":0,\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"textDecoration\":\"none\"}', '{\"text\":\"按钮\",\"btnType\":2,\"refInput\":[\"a\",\"b\",\"radio名称相同的即为一组\",\"check名称相同的即为一组\"],\"inputFromUrl\":\"http://localhost:818/try\",\"urlMethod\":\"post\",\"QQNum\":\"\",\"PhoneNum\":\"\",\"link\":\"\",\"colorType\":false,\"formOne\":false,\"mustInput\":[\"check名称相同的即为一组\"],\"httpName\":\"buttom1\"}', '按钮1', 1);
INSERT INTO `act_data` VALUES (35, '5a70cf35-b648-4044-9279-32336bfaaf79', 'base-input', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"box-sizing\":\"border-box\",\"top\":370,\"left\":126,\"width\":150,\"height\":30,\"zIndex\":7,\"background\":\"rgba(173, 92, 92, 1)\",\"color\":\"rgba(0, 0, 0, 1)\",\"borderColor\":\"rgba(28, 247, 255, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":4,\"borderRadius\":100,\"paddingLeft\":5,\"paddingRight\":5,\"fontSize\":7}', '{\"text\":\"\",\"inputName\":\"default8\",\"placeholder\":\"\",\"colorType\":false,\"formName\":\"a\"}', '输入框1', 1);
INSERT INTO `act_data` VALUES (36, '5845b558-c6b7-4623-8139-d6c1680c9262', 'base-swiper', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":8,\"left\":7,\"width\":350,\"height\":100,\"zIndex\":8}', '{\"autoplay\":\"2000\",\"item\":[{\"img\":\"i1596786164917197e78eb9a8a82d91241.jpg\",\"link\":\"\"},{\"img\":\"i1596764371104118748adde1e5677cf538dcf9dcea568.jpg\",\"link\":\"\"}],\"httpName\":\"opop\"}', '轮播图1', 1);
INSERT INTO `act_data` VALUES (37, 'c214279e-a6d9-49b6-a95d-9ce61109d27d', 'base-input', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"box-sizing\":\"border-box\",\"top\":433,\"left\":124,\"width\":150,\"height\":30,\"zIndex\":9,\"background\":\"rgba(255, 255, 255, 1)\",\"color\":\"rgba(0, 0, 0, 1)\",\"borderColor\":\"rgba(0, 0, 0, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":1,\"borderRadius\":1,\"paddingLeft\":5,\"paddingRight\":5,\"fontSize\":12}', '{\"text\":\"\",\"inputName\":\"default10\",\"placeholder\":\"\",\"colorType\":false,\"formName\":\"b\"}', '输入框2', 1);
INSERT INTO `act_data` VALUES (46, '8c700bc4-3867-429f-8be3-3f64cddc1660', 'base-text', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":557.5,\"left\":56,\"width\":300,\"height\":33,\"zIndex\":16,\"background\":\"rgba(255, 255, 255, 0)\",\"border\":\"none\",\"color\":\"rgba(0, 0, 0, 1)\",\"fontSize\":24,\"fontWeight\":\"normal\",\"fontStyle\":\"normal\",\"textAlign\":\"center\",\"textDecoration\":\"none\"}', '{\"text\":\"请修改此处的文字\",\"colorType\":false,\"httpName\":\"ababab\"}', '文本1', 1);
INSERT INTO `act_data` VALUES (47, 'a00e3e26-a198-4dce-b357-eccead1c8aca', 'base-check', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":279,\"left\":122,\"zIndex\":17,\"fontSize\":17,\"color\":\"rgba(0, 0, 0, 1)\",\"width\":0,\"height\":0,\"frameWidth\":17,\"frameBackGround\":\"rgba(230, 230, 230, 1)\",\"frameChooseGround\":\"rgba(0,191,255,1)\"}', '{\"text\":\"内容\",\"formName\":\"check名称相同的即为一组\",\"itemValue\":\"选中对应值\"}', '复选框3', 1);
INSERT INTO `act_data` VALUES (48, '31f6b294-cd82-4af0-bf3f-0bc5f471b882', 'base-check', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":313,\"left\":114,\"zIndex\":18,\"fontSize\":17,\"color\":\"rgba(0, 0, 0, 1)\",\"width\":0,\"height\":0,\"frameWidth\":17,\"frameBackGround\":\"rgba(230, 230, 230, 1)\",\"frameChooseGround\":\"rgba(0,191,255,1)\"}', '{\"text\":\"内容\",\"formName\":\"c\",\"itemValue\":\"选中对应值\"}', '复选框4', 1);
INSERT INTO `act_data` VALUES (49, '28a1725f-5885-40c9-93a1-2fb17fdbbfd3', 'base-radio', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":203,\"left\":111,\"zIndex\":19,\"fontSize\":17,\"color\":\"rgba(0, 0, 0, 1)\",\"frameBackGround\":\"rgba(230, 230, 230, 1)\",\"frameChooseGround\":\"rgba(0,191,255,1)\",\"width\":0,\"height\":0,\"frameWidth\":17}', '{\"text\":\"内容\",\"formName\":\"d\",\"itemValue\":\"选中对应值\"}', '单选框4', 1);
INSERT INTO `act_data` VALUES (50, '5597b03e-79e0-40e3-8916-fcc823f75fb6', 'base-radio', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 8, '{\"top\":236,\"left\":111,\"zIndex\":20,\"fontSize\":17,\"color\":\"rgba(0, 0, 0, 1)\",\"frameBackGround\":\"rgba(230, 230, 230, 1)\",\"frameChooseGround\":\"rgba(0,191,255,1)\",\"width\":0,\"height\":0,\"frameWidth\":17}', '{\"text\":\"内容\",\"formName\":\"radio名称相同的即为一组\",\"itemValue\":\"选中对应值\"}', '单选框5', 1);
INSERT INTO `act_data` VALUES (58, '7917f02a-7889-4a0e-90ce-da7a26780033', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', 20, '{\"top\":352,\"left\":110,\"width\":196,\"height\":64,\"zIndex\":23,\"background\":\"rgba(242, 242, 242, 1)\",\"borderColor\":\"rgba(0, 0, 0, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":0,\"borderRadius\":0}', '{\"colorType\":false}', '图形8', 1);

-- ----------------------------
-- Table structure for act_pro
-- ----------------------------
DROP TABLE IF EXISTS `act_pro`;
CREATE TABLE `act_pro`  (
  `textName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `titlePage` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `disp` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `height` int(11) NOT NULL,
  `background` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `time` int(11) NOT NULL,
  `proType` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `initSet` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `belongId` int(11) NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of act_pro
-- ----------------------------
INSERT INTO `act_pro` VALUES ('kf1', 'kf1', 'aintro15975668069341597566806922.jpg', '', 'kf1', 667, 'rgba(255, 255, 255, 1)', 2147483647, '1', 8, 'kf1', 'pageData.b=\"123\"\r\npageData.opop=[\'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597405774043&di=c6f1cc5524bceeab8698fb67525970c6&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg\']\r\npageData.we=\'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597405774043&di=c6f1cc5524bceeab8698fb67525970c6&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F180330%2F4-1P330160644.jpg\'\r\npageData.d=\"7897987\"\r\npageData.buttom1=\"buttomdaaa\"\r\npageData.c=\"dafZfafda\"\r\npageData.ababab=\"afababababbabab\"', 0);
INSERT INTO `act_pro` VALUES ('', 'kf1', 'aintro15975577397471597557739737.jpg', 'adf', '', 667, 'rgba(176, 30, 30, 1)', 2147483647, '2', 16, '', '', 0);
INSERT INTO `act_pro` VALUES ('fadfasdf', 'kf2', 'aintro15975668069341597566806922.jpg', '', '二个月热那个地方', 667, 'rgba(255, 255, 255, 1)', 2147483647, '3', 20, 'kf1', 'var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象\n                httpRequest.open(\'POST\', \'URL\', true); //第二步：打开连接\n                httpRequest.setRequestHeader(\"Content-type\",\"application/x-www-form-urlencoded\");\n                //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）\n                httpRequest.send(\'name=teswe&ee=ef\');//发送请求 将情头体写在send中\n                /**\n                 * 获取数据后的处理程序\n                 */\n                httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中\n                    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功\n                        var json = httpRequest.responseText;//获取到服务端返回的数据\n                        pageData.Buttom1=\"xxxx\";//可单独为某个名称的组件设置值\n                        pageData.text=[\'xxx\',\'xxxxx\',\'xxxxx\']//也可以用数组的方式数组的顺序与添加组件的顺序相同\n                    }\n                };', 8);

-- ----------------------------
-- Table structure for com_data
-- ----------------------------
DROP TABLE IF EXISTS `com_data`;
CREATE TABLE `com_data`  (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `compName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `animation` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `css` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `option` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of com_data
-- ----------------------------
INSERT INTO `com_data` VALUES (15, '测试1', 'base-div', '{\"animationName\":\"\",\"animationDuration\":1000,\"animationDelay\":0,\"animationIterationCount\":1,\"animationFillMode\":\"both\"}', '{\"top\":184,\"left\":132,\"width\":166,\"height\":300,\"zIndex\":4,\"background\":\"rgba(162, 52, 52, 1)\",\"borderColor\":\"rgba(116, 52, 52, 1)\",\"borderStyle\":\"solid\",\"borderWidth\":11,\"borderRadius\":71,\"color\":\"\"}', '{\"colorType\":false}');

-- ----------------------------
-- Table structure for pro_image
-- ----------------------------
DROP TABLE IF EXISTS `pro_image`;
CREATE TABLE `pro_image`  (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image_type` int(11) NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 78 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pro_image
-- ----------------------------
INSERT INTO `pro_image` VALUES (1, 'i1596764371104118748adde1e5677cf538dcf9dcea568.jpg', 1);
INSERT INTO `pro_image` VALUES (2, 'i1596786164917197e78eb9a8a82d91241.jpg', 1);
INSERT INTO `pro_image` VALUES (3, 'i1596786268520logo01080_1703.jpg', 1);
INSERT INTO `pro_image` VALUES (4, 'i1596787327812118748adde1e5677cf538dcf9dcea568.jpg', 2);
INSERT INTO `pro_image` VALUES (5, 'i15967874384071596787438385.jpg', 2);
INSERT INTO `pro_image` VALUES (6, 'i15967875029421596787502927.jpg', 2);
INSERT INTO `pro_image` VALUES (7, 'i15967881446961596788144687.jpg', 2);
INSERT INTO `pro_image` VALUES (8, 'i15967882102871596788210256.jpg', 2);
INSERT INTO `pro_image` VALUES (9, 'i15967886893111596788689292.jpg', 2);
INSERT INTO `pro_image` VALUES (10, 'i15967888693201596788869302.jpg', 2);
INSERT INTO `pro_image` VALUES (11, 'i15967891109581596789110940.jpg', 2);
INSERT INTO `pro_image` VALUES (12, 'i15967892604661596789260446.jpg', 2);
INSERT INTO `pro_image` VALUES (13, 'i15967893326461596789332628.jpg', 2);
INSERT INTO `pro_image` VALUES (14, 'i15967893770611596789377046.jpg', 2);
INSERT INTO `pro_image` VALUES (15, 'i15967894572711596789457250.jpg', 2);
INSERT INTO `pro_image` VALUES (16, 'i15967895572941596789557268.jpg', 2);
INSERT INTO `pro_image` VALUES (17, 'i15967896188541596789618834.jpg', 2);
INSERT INTO `pro_image` VALUES (18, 'i15967896640841596789664068.jpg', 2);
INSERT INTO `pro_image` VALUES (19, 'i15967898759571596789875939.jpg', 2);
INSERT INTO `pro_image` VALUES (20, 'i15967900747151596790074697.jpg', 2);
INSERT INTO `pro_image` VALUES (21, 'i15967904127421596790412729.jpg', 2);
INSERT INTO `pro_image` VALUES (22, 'i15968021117291596802111703.jpg', 2);
INSERT INTO `pro_image` VALUES (23, 'i15968021862041596802186196.jpg', 2);
INSERT INTO `pro_image` VALUES (24, 'i15968022169411596802216935.jpg', 2);
INSERT INTO `pro_image` VALUES (25, 'i15968023549711596802354960.jpg', 2);
INSERT INTO `pro_image` VALUES (26, 'i15968023630731596802363066.jpg', 2);
INSERT INTO `pro_image` VALUES (27, 'i15968024824391596802482432.jpg', 2);
INSERT INTO `pro_image` VALUES (28, 'i15968025177511596802517744.jpg', 2);
INSERT INTO `pro_image` VALUES (29, 'i1596805353765OD7PWZA7.png', 1);
INSERT INTO `pro_image` VALUES (30, 'i15968499699991596849969968.jpg', 2);
INSERT INTO `pro_image` VALUES (31, 'i15968660445051596866044478.jpg', 2);
INSERT INTO `pro_image` VALUES (32, 'i15968681652681596868165260.jpg', 2);
INSERT INTO `pro_image` VALUES (33, 'i15968743369381596874336927.jpg', 2);
INSERT INTO `pro_image` VALUES (34, 'i15968755139121596875513889.jpg', 2);
INSERT INTO `pro_image` VALUES (35, 'i15968755274211596875527411.jpg', 2);
INSERT INTO `pro_image` VALUES (36, 'i15968923914861596892391454.jpg', 2);
INSERT INTO `pro_image` VALUES (37, 'i15968934396711596893439665.jpg', 2);
INSERT INTO `pro_image` VALUES (38, 'i15969400998611596940099840.jpg', 2);
INSERT INTO `pro_image` VALUES (39, 'i15969402155721596940215564.jpg', 2);
INSERT INTO `pro_image` VALUES (40, 'i15969406030411596940603034.jpg', 2);
INSERT INTO `pro_image` VALUES (41, 'i15969613516481596961351634.jpg', 2);
INSERT INTO `pro_image` VALUES (42, 'i15970247670461597024767023.jpg', 2);
INSERT INTO `pro_image` VALUES (43, 'i15970449533941597044953378.jpg', 2);
INSERT INTO `pro_image` VALUES (44, 'i15970505196411597050519613.jpg', 2);
INSERT INTO `pro_image` VALUES (45, 'i15970692586011597069258584.jpg', 2);
INSERT INTO `pro_image` VALUES (46, 'i15971127879221597112787893.jpg', 2);
INSERT INTO `pro_image` VALUES (47, 'i15971322215071597132221493.jpg', 2);
INSERT INTO `pro_image` VALUES (48, 'i15971336551111597133655102.jpg', 2);
INSERT INTO `pro_image` VALUES (49, 'aintro15971920818431597192081829.jpg', 2);
INSERT INTO `pro_image` VALUES (50, 'aintro15971951654371597195165426.jpg', 2);
INSERT INTO `pro_image` VALUES (51, 'aintro15971951914201597195191410.jpg', 2);
INSERT INTO `pro_image` VALUES (52, 'aintro15972229204431597222920413.jpg', 2);
INSERT INTO `pro_image` VALUES (53, 'aintro15972823806551597282380628.jpg', 2);
INSERT INTO `pro_image` VALUES (54, 'aintro15972843640171597284364007.jpg', 2);
INSERT INTO `pro_image` VALUES (55, 'aintro15972866913011597286691293.jpg', 2);
INSERT INTO `pro_image` VALUES (56, 'aintro15972867689611597286768955.jpg', 2);
INSERT INTO `pro_image` VALUES (57, 'aintro15973859654971597385965453.jpg', 2);
INSERT INTO `pro_image` VALUES (58, 'aintro15973875822041597387582197.jpg', 2);
INSERT INTO `pro_image` VALUES (59, 'aintro15973950948831597395094870.jpg', 2);
INSERT INTO `pro_image` VALUES (60, 'aintro15973958317691597395831762.jpg', 2);
INSERT INTO `pro_image` VALUES (61, 'aintro15974062897191597406289701.jpg', 2);
INSERT INTO `pro_image` VALUES (62, 'aintro15974062944311597406294423.jpg', 2);
INSERT INTO `pro_image` VALUES (63, 'aintro15974074863741597407486357.jpg', 2);
INSERT INTO `pro_image` VALUES (64, 'aintro15974078271411597407827133.jpg', 2);
INSERT INTO `pro_image` VALUES (65, 'aintro15974129547421597412954730.jpg', 2);
INSERT INTO `pro_image` VALUES (66, 'aintro15974143054771597414305454.jpg', 2);
INSERT INTO `pro_image` VALUES (67, 'aintro15975575367051597557536674.jpg', 2);
INSERT INTO `pro_image` VALUES (68, 'aintro15975576430891597557643082.jpg', 2);
INSERT INTO `pro_image` VALUES (69, 'aintro15975577170191597557717012.jpg', 2);
INSERT INTO `pro_image` VALUES (70, 'aintro15975577397471597557739737.jpg', 2);
INSERT INTO `pro_image` VALUES (71, 'aintro15975655825381597565582522.jpg', 2);
INSERT INTO `pro_image` VALUES (72, 'aintro15975659587621597565958755.jpg', 2);
INSERT INTO `pro_image` VALUES (73, 'aintro15975661807141597566180695.jpg', 2);
INSERT INTO `pro_image` VALUES (74, 'aintro15975664562331597566456216.jpg', 2);
INSERT INTO `pro_image` VALUES (75, 'aintro15975665838541597566583836.jpg', 2);
INSERT INTO `pro_image` VALUES (76, 'aintro15975667759801597566775962.jpg', 2);
INSERT INTO `pro_image` VALUES (77, 'aintro15975668069341597566806922.jpg', 2);

SET FOREIGN_KEY_CHECKS = 1;
