-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emetdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `emetdb` ;

-- -----------------------------------------------------
-- Schema emetdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emetdb` DEFAULT CHARACTER SET utf8 ;
USE `emetdb` ;

-- -----------------------------------------------------
-- Table `concert`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `concert` ;

CREATE TABLE IF NOT EXISTS `concert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `venue` VARCHAR(45) NOT NULL,
  `performer` VARCHAR(45) NULL,
  `genre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `street` VARCHAR(200) NULL,
  `zipcode` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `performers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `performers` ;

CREATE TABLE IF NOT EXISTS `performers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS emetuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'emetuser'@'localhost' IDENTIFIED BY 'emetuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'emetuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `concert`
-- -----------------------------------------------------
START TRANSACTION;
USE `emetdb`;
INSERT INTO `concert` (`id`, `name`, `venue`, `performer`, `genre`) VALUES (1, 'Foam Wonderland', 'National Western Complex', 'Ghastly', 'Dubstep');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `emetdb`;
INSERT INTO `address` (`id`, `city`, `state`, `street`, `zipcode`) VALUES (1, 'Denver', 'CO', '1515 East 47th Ave', 80216);

COMMIT;


-- -----------------------------------------------------
-- Data for table `performers`
-- -----------------------------------------------------
START TRANSACTION;
USE `emetdb`;
INSERT INTO `performers` (`id`, `name`, `genre`) VALUES (1, 'Getter', 'Dubstep');

COMMIT;

