USE test_db;

--TODO Crie a tabela de user;
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);

--TODO Crie a tabela de posts;
CREATE TABLE `post` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`title` varchar(100) NOT NULL,
	`description` varchar(100) NOT NULL,
	`userId` int NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `post` ADD CONSTRAINT `post_fk3` FOREIGN KEY (`userId`) REFERENCES `user`(`id`);
