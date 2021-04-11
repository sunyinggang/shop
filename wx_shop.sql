-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-04-11 18:46:55
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `wx_shop`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`id`, `user_id`, `name`, `phone`, `address`) VALUES
(4, 17, 'wqe', 'ewqe', 'wqe');

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `context` text COLLATE utf8_unicode_ci COMMENT '商品信息',
  `brief` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '简介',
  `img_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `title`, `price`, `context`, `brief`, `img_url`) VALUES
(1, '双色百褶裙', '199.00', '新款大码高腰百褶裙', '秋季新款，绽放女人心', 'static/images/good1.png'),
(2, 'Sleeve羊绒毛衣', '399.00', '长袖百搭休闲保暖穿针织毛衣', '当季经典款', 'static/images/good2.png'),
(3, '卡帝乐鳄鱼短袖', '139.00', '青年商务休闲翻领上衣服休闲男士polo衫 深灰色', '2021夏季韩版', 'static/images/good3.png'),
(4, 'HLA海澜之家短袖T恤', '78.00', '2021夏季时尚圆领印花舒适透气休闲t恤', '100%新疆棉', 'static/images/good4.png'),
(5, '马克华菲夹克', '308.00', '男士外套修身休闲男装 黑色', '春秋季潮流飞行员棒球服', 'static/images/good5.png'),
(6, '麦克丹奴工装裤男休闲裤', '128.00', '春夏季束脚裤男哈伦裤子男士修身潮牌多口袋小脚收口裤', '宽松九分裤运动休闲长裤', 'static/images/good6.png'),
(7, '寂益冰丝休闲裤', '108.00', '女卫裤女韩版bf风运动裤女束脚2021新款春夏季显瘦百搭小个子哈伦休闲大码裤子', '2021新款春夏季显瘦百搭', 'static/images/good7.png'),
(8, '休闲裤夏装套装', '128.00', '名媛小香风洋气显瘦时尚职业雪纺衫裤子两件套', '新款女装轻熟赫本风', 'static/images/good8.png'),
(9, '谷颜连衣裙', '158.00', '时尚女装蕾丝拼接雪纺连衣裙收腰显衬衫领短袖中长款裙子', '春夏季新款韩版', 'static/images/good9.png'),
(10, '伊贝海娜雪纺连衣裙', '129.00', '女装气质显瘦高贵印花性感棉麻中长款小个子打底裙子潮', '2021年夏季新款韩版大码', 'static/images/good10.png');

-- --------------------------------------------------------

--
-- 表的结构 `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL,
  `label_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `context` text COLLATE utf8_unicode_ci,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `label`
--

INSERT INTO `label` (`id`, `label_name`, `context`, `title`) VALUES
(1, '潜在客户', '我', '12'),
(2, '基础客户', '基础客户内容1', '消息通知'),
(3, '一般客户', '一般客户内容', '消息通知'),
(4, '重点客户', '重点客户内容', '消息通知');

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `order_num` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `good_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `total_price` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_info` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_people_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `order`
--

INSERT INTO `order` (`id`, `order_num`, `good_title`, `price`, `number`, `total_price`, `address_info`, `address_people_name`, `address_phone`, `user_id`, `create_time`, `image_url`) VALUES
(45, '2021041118452603136676366', '双色百褶裙', '199.00', 1, '199.0', 'wqe', 'wqe', 'ewqe', 17, '2021-04-11 18:45:26', 'static/images/good1.png'),
(36, '20210407140119943658710838', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 17, '2021-04-07 14:01:19', 'static/images/good1.png'),
(37, '20210407140240492497310767', 'Sleeve羊绒毛衣', '399.00', 1, '399.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:02:40', 'static/images/good2.png'),
(38, '2021040714025126335817762', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:02:51', 'static/images/good1.png'),
(39, '2021040714030624800832255', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:03:06', 'static/images/good1.png'),
(40, '20210407140314529120666810', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:03:14', 'static/images/good1.png'),
(41, '2021040714032200441513471', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:03:22', 'static/images/good1.png'),
(42, '2021040714034276042256597', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:03:42', 'static/images/good1.png'),
(43, '2021040714035777764898711', 'Sleeve羊绒毛衣', '399.00', 4, '1596.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:03:57', 'static/images/good2.png'),
(44, '20210407140842531730782310', '双色百褶裙', '199.00', 1, '199.0', '广东省广州市海珠区新港中路397号', '张三', '020-81167888', 18, '2021-04-07 14:08:42', 'static/images/good1.png');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `buy_num` int(11) NOT NULL COMMENT '购买次数',
  `age` int(11) DEFAULT NULL,
  `total_consume` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '总的消费金额',
  `label_id` int(11) DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `phone`, `buy_num`, `age`, `total_consume`, `label_id`, `password`, `email`) VALUES
(16, '12345', 0, 17, '0', 1, 'pbkdf2:sha256:150000$Z6J5u45l$cbf868a9e13f3583362fcb82aac1e44eb31d6eecdf969038fd77d76283cb753b', '136080416@qq.com'),
(17, '123', 2, 17, '398.0', 2, 'pbkdf2:sha256:150000$FXQmY5fn$0b0b1dd8e4b8dcc72e657964cfdc12db8c8a438b44a487c628bf533ca9916704', '1974124574@qq.com'),
(18, '123777', 8, 17, '3189.0', 3, 'pbkdf2:sha256:150000$yUON8djZ$247118bac9b1b366962358d7cec592cd1ab1bef1cc9aa56c4a3cb02f27afc436', '1905616293@qq.com'),
(19, '15432', 0, 18, '0', 1, 'pbkdf2:sha256:150000$4A1xUkTi$ac59e8d5e295e1a2cfa6f66d782f5ffe3aacc37e96be87fbba69723bcb884a90', '1391973617@qq.com');

--
-- 转储表的索引
--

--
-- 表的索引 `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
