-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2023 at 09:35 AM
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
-- Table structure for table `sccv1_product`
--

CREATE TABLE `sccv1_product` (
  `product_aid` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_is_active` tinyint(1) NOT NULL,
  `product_created_at` datetime NOT NULL,
  `product_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sccv1_product`
--

INSERT INTO `sccv1_product` (`product_aid`, `product_name`, `product_quantity`, `product_is_active`, `product_created_at`, `product_updated_at`) VALUES
(1, 'apple', 1, 1, '2023-09-26 15:32:44', '2023-09-26 15:32:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sccv1_product`
--
ALTER TABLE `sccv1_product`
  ADD PRIMARY KEY (`product_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sccv1_product`
--
ALTER TABLE `sccv1_product`
  MODIFY `product_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
