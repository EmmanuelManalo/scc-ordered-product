-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 06:33 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
-- Table structure for table `sccv1_transaction`
--

CREATE TABLE `sccv1_transaction` (
  `transaction_aid` int(11) NOT NULL,
  `transaction_product_id` varchar(11) NOT NULL,
  `transaction_individual_id` varchar(11) NOT NULL,
  `transaction_quantity` int(11) NOT NULL,
  `transaction_total` varchar(20) NOT NULL,
  `transaction_is_paid` tinyint(1) NOT NULL,
  `transaction_created_at` datetime NOT NULL,
  `transaction_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_transaction`
--

INSERT INTO `sccv1_transaction` (`transaction_aid`, `transaction_product_id`, `transaction_individual_id`, `transaction_quantity`, `transaction_total`, `transaction_is_paid`, `transaction_created_at`, `transaction_updated_at`) VALUES
(2, '2', '1', 2, '', 0, '2023-09-27 09:36:31', '2023-09-27 12:27:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_transaction`
--
ALTER TABLE `sccv1_transaction`
  ADD PRIMARY KEY (`transaction_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_transaction`
--
ALTER TABLE `sccv1_transaction`
  MODIFY `transaction_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
