-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 03:25 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sccv1`
--

-- --------------------------------------------------------

--
-- Table structure for table `sccv1_individual`
--

CREATE TABLE `sccv1_individual` (
  `individual_aid` int(11) NOT NULL,
  `individual_is_active` tinyint(1) NOT NULL,
  `individual_fname` varchar(100) NOT NULL,
  `individual_lname` varchar(100) NOT NULL,
  `individual_created_at` datetime NOT NULL,
  `individual_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_individual`
--

INSERT INTO `sccv1_individual` (`individual_aid`, `individual_is_active`, `individual_fname`, `individual_lname`, `individual_created_at`, `individual_updated_at`) VALUES
(2, 1, 'Emman', 'Manalo', '2023-09-27 09:24:50', '2023-09-27 09:24:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_individual`
--
ALTER TABLE `sccv1_individual`
  ADD PRIMARY KEY (`individual_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_individual`
--
ALTER TABLE `sccv1_individual`
  MODIFY `individual_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
