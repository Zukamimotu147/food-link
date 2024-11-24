CREATE TABLE `Charity` (
	`charityId` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`charityName` varchar(255) NOT NULL,
	`streetAddress` varchar(255) NOT NULL,
	`barangay` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`province` varchar(255) NOT NULL,
	`contactNumber` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `Charity_charityId` PRIMARY KEY(`charityId`)
);
--> statement-breakpoint
CREATE TABLE `Contact` (
	`contactId` int AUTO_INCREMENT NOT NULL,
	`firstname` varchar(255) NOT NULL,
	`lastname` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`message` varchar(255) NOT NULL,
	CONSTRAINT `Contact_contactId` PRIMARY KEY(`contactId`)
);
--> statement-breakpoint
CREATE TABLE `DonationHistory` (
	`historyId` int AUTO_INCREMENT NOT NULL,
	`scheduleId` int NOT NULL,
	`completionDate` date NOT NULL,
	`completionTime` timestamp NOT NULL,
	CONSTRAINT `DonationHistory_historyId` PRIMARY KEY(`historyId`)
);
--> statement-breakpoint
CREATE TABLE `FoodDonation` (
	`donationId` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`charityId` int NOT NULL,
	`foodItemName` varchar(255) NOT NULL,
	`quantity` int NOT NULL,
	`category` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`streetAddress` varchar(255) NOT NULL,
	`barangay` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`province` varchar(255) NOT NULL,
	`pickupDate` date NOT NULL,
	`specialInstructions` varchar(255) NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`contactNumber` varchar(255) NOT NULL,
	`allergens` varchar(255) NOT NULL,
	`storageRequirements` varchar(255) NOT NULL,
	`photoUrl` varchar(255) NOT NULL,
	`donationStatus` enum('PENDING','ACCEPTED','REJECTED') NOT NULL DEFAULT 'PENDING',
	CONSTRAINT `FoodDonation_donationId` PRIMARY KEY(`donationId`)
);
--> statement-breakpoint
CREATE TABLE `PickupSchedule` (
	`scheduleId` int AUTO_INCREMENT NOT NULL,
	`donationId` int NOT NULL,
	`charityId` int NOT NULL,
	`status` varchar(255) NOT NULL,
	CONSTRAINT `PickupSchedule_scheduleId` PRIMARY KEY(`scheduleId`)
);
--> statement-breakpoint
CREATE TABLE `Restaurant` (
	`restaurantId` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`restaurantName` varchar(255) NOT NULL,
	`streetAddress` varchar(255) NOT NULL,
	`barangay` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`province` varchar(255) NOT NULL,
	`contactNumber` varchar(255) NOT NULL,
	CONSTRAINT `Restaurant_restaurantId` PRIMARY KEY(`restaurantId`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`Id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`googleId` varchar(255),
	`userRole` enum('ADMIN','RESTAURANT') NOT NULL DEFAULT 'RESTAURANT',
	CONSTRAINT `Users_Id` PRIMARY KEY(`Id`),
	CONSTRAINT `Users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `Charity` ADD CONSTRAINT `Charity_userId_Users_Id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `DonationHistory` ADD CONSTRAINT `DonationHistory_scheduleId_PickupSchedule_scheduleId_fk` FOREIGN KEY (`scheduleId`) REFERENCES `PickupSchedule`(`scheduleId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FoodDonation` ADD CONSTRAINT `FoodDonation_userId_Users_Id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `FoodDonation` ADD CONSTRAINT `FoodDonation_charityId_Charity_charityId_fk` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`charityId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `PickupSchedule` ADD CONSTRAINT `PickupSchedule_donationId_FoodDonation_donationId_fk` FOREIGN KEY (`donationId`) REFERENCES `FoodDonation`(`donationId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `PickupSchedule` ADD CONSTRAINT `PickupSchedule_charityId_Charity_charityId_fk` FOREIGN KEY (`charityId`) REFERENCES `Charity`(`charityId`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_userId_Users_Id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;