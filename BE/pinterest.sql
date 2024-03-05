/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comment` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `pictureId` int DEFAULT NULL,
  `commentDate` date DEFAULT NULL,
  `commentContent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `userId` (`userId`),
  KEY `pictureId` (`pictureId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`pictureId`) REFERENCES `picture` (`pictureId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `picture` (
  `pictureId` int NOT NULL AUTO_INCREMENT,
  `pictureName` varchar(255) DEFAULT NULL,
  `pictureUrl` varchar(255) DEFAULT NULL,
  `pictureDescription` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`pictureId`),
  KEY `userId` (`userId`),
  CONSTRAINT `picture_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `savePicture` (
  `userId` int NOT NULL,
  `pictureId` int NOT NULL,
  `saveDate` date DEFAULT NULL,
  PRIMARY KEY (`userId`,`pictureId`),
  KEY `pictureId` (`pictureId`),
  CONSTRAINT `savePicture_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `savePicture_ibfk_2` FOREIGN KEY (`pictureId`) REFERENCES `picture` (`pictureId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comment` (`commentId`, `userId`, `pictureId`, `commentDate`, `commentContent`) VALUES
(1, 1, 1, '2024-03-03', 'Comment 1 on Picture 1 by User 1');
INSERT INTO `comment` (`commentId`, `userId`, `pictureId`, `commentDate`, `commentContent`) VALUES
(2, 1, 1, '2024-03-04', 'Comment 2 on Picture 1 by User 1');
INSERT INTO `comment` (`commentId`, `userId`, `pictureId`, `commentDate`, `commentContent`) VALUES
(3, 2, 3, '2024-03-05', 'Comment 1 on Picture 1 by User 2');
INSERT INTO `comment` (`commentId`, `userId`, `pictureId`, `commentDate`, `commentContent`) VALUES
(4, 2, 3, '2024-03-06', 'Comment 2 on Picture 1 by User 2'),
(5, 3, 5, '2024-03-07', 'Comment 1 on Picture 1 by User 3'),
(6, 3, 5, '2024-03-08', 'Comment 2 on Picture 1 by User 3'),
(7, 1, 2, '2024-03-09', 'Comment 1 on Picture 2 by User 1'),
(8, 1, 2, '2024-03-10', 'Comment 2 on Picture 2 by User 1'),
(9, 2, 4, '2024-03-11', 'Comment 1 on Picture 2 by User 2'),
(10, 2, 4, '2024-03-12', 'Comment 2 on Picture 2 by User 2'),
(11, 3, 6, '2024-03-13', 'Comment 1 on Picture 2 by User 3'),
(12, 3, 6, '2024-03-14', 'Comment 2 on Picture 2 by User 3'),
(13, 4, 1, NULL, 'CommentTest');

INSERT INTO `picture` (`pictureId`, `pictureName`, `pictureUrl`, `pictureDescription`, `userId`) VALUES
(1, 'Picture 1 User 1', 'https://i.pinimg.com/564x/c1/bf/08/c1bf08655fcfc7917cc53c151c38244e.jpg', 'Description of Picture 1 by User 1', 1);
INSERT INTO `picture` (`pictureId`, `pictureName`, `pictureUrl`, `pictureDescription`, `userId`) VALUES
(2, 'Picture 2 User 1', 'https://i.pinimg.com/564x/63/bb/9b/63bb9b9690cea474ff5c8f7a1191c82d.jpg', 'Description of Picture 2 by User 1', 1);
INSERT INTO `picture` (`pictureId`, `pictureName`, `pictureUrl`, `pictureDescription`, `userId`) VALUES
(3, 'Picture 1 User 2', 'https://i.pinimg.com/564x/3b/1d/98/3b1d98c99dc86e667235ee4a7b7c3652.jpg', 'Description of Picture 1 by User 2', 2);
INSERT INTO `picture` (`pictureId`, `pictureName`, `pictureUrl`, `pictureDescription`, `userId`) VALUES
(4, 'Picture 2 User 2', 'https://i.pinimg.com/564x/2b/66/ed/2b66ed8b2742c92c8527c80ab3172b09.jpg', 'Description of Picture 2 by User 2', 2),
(5, 'Picture 1 User 3', 'https://i.pinimg.com/564x/f8/fd/0e/f8fd0e001591b6d8ff5f60e0761a72a6.jpg', 'Description of Picture 1 by User 3', 3),
(6, 'Picture 2 User 3', 'https://i.pinimg.com/564x/d1/cb/69/d1cb69a538250e1b024bd1aa1c1f4260.jpg', 'Description of Picture 2 by User 3', 3),
(7, 'Picture 1 User 4', 'https://i.pinimg.com/564x/7e/b0/1a/7eb01ae56f1f024cb744426be298d598.jpg', 'Description of Picture 1 User 4', 4);

INSERT INTO `savePicture` (`userId`, `pictureId`, `saveDate`) VALUES
(1, 1, '2024-03-03');
INSERT INTO `savePicture` (`userId`, `pictureId`, `saveDate`) VALUES
(1, 2, '2024-03-04');
INSERT INTO `savePicture` (`userId`, `pictureId`, `saveDate`) VALUES
(2, 3, '2024-03-05');
INSERT INTO `savePicture` (`userId`, `pictureId`, `saveDate`) VALUES
(2, 4, '2024-03-06'),
(3, 5, '2024-03-07'),
(3, 6, '2024-03-08'),
(4, 1, '2024-03-03');

INSERT INTO `user` (`userId`, `email`, `password`, `userName`, `age`, `avatar`) VALUES
(1, 'user1@example.com', 'password1', 'User1', 25, 'avatar1.jpg');
INSERT INTO `user` (`userId`, `email`, `password`, `userName`, `age`, `avatar`) VALUES
(2, 'user2@example.com', 'password2', 'User2', 30, 'avatar2.jpg');
INSERT INTO `user` (`userId`, `email`, `password`, `userName`, `age`, `avatar`) VALUES
(3, 'user3@example.com', 'password3', 'User3', 28, 'avatar3.jpg');
INSERT INTO `user` (`userId`, `email`, `password`, `userName`, `age`, `avatar`) VALUES
(4, 'user4@example.com', '$2b$10$AolK7cAythd04mXPdeBWa.YnC.li9FgKklqr5OLghbVxDNOX.HnsC', 'User4 Updated', 27, '');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;