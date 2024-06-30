-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 08:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bike`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE `admin_login` (
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`email`, `password`) VALUES
('[motobon@gmail.com]', '0'),
('motonbon@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `bikedetails`
--

CREATE TABLE `bikedetails` (
  `bike_name` varchar(30) NOT NULL,
  `reg_no` varchar(15) NOT NULL,
  `eng_no` int(20) NOT NULL,
  `chas_no` int(20) NOT NULL,
  `price` int(10) NOT NULL,
  `bike_condition` varchar(100) NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT 1,
  `pickupDate` varchar(20) NOT NULL,
  `pickupTime` varchar(20) NOT NULL,
  `dropoffDate` varchar(20) NOT NULL,
  `dropoffTime` varchar(20) NOT NULL,
  `bike_photo_path` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bikedetails`
--

INSERT INTO `bikedetails` (`bike_name`, `reg_no`, `eng_no`, `chas_no`, `price`, `bike_condition`, `availability`, `pickupDate`, `pickupTime`, `dropoffDate`, `dropoffTime`, `bike_photo_path`) VALUES
('Bajaj Dominar 400', 'KL01BM125', 123456789, 98765423, 600, 'Bike is in great condition, 60 kmpl mileage', 0, '2024-06-17', '22:06', '2024-06-17', '23:07', 'C:/Users/Abhay/Desktop/mini/src/Bike/bike_photos/KL01BM125.jpg'),
('Bajaj Discover 125 ST', 'KL01BM1255', 2147483647, 2147483647, 500, '', 1, '', '', '', '', 'C:/Users/Abhay/Desktop/mini/src/Bike/bike_photos/KL01BM1255.jpg'),
('Duke 390', 'KL01CK509', 2147483647, 123412341, 600, '', 0, '2024-06-29', '23:54', '2024-06-28', '23:54', 'C:/Users/Abhay/Desktop/mini/src/Bike/bike_photos/KL01CK509.jpg'),
('Bajaj RS 200', 'KL01CR896', 2147483647, 2147483647, 500, 'Bike has small missing problem, 30 kmpl mileage', 0, '2024-06-25', '14:03', '2024-08-08', '13:03', 'C:/Users/Abhay/Desktop/mini/src/Bike/bike_photos/KL01CR896.jpg'),
('Yamaha R15', 'KL01GG6547', 4534534, 23423423, 500, 'Bike is in Great condition, 40 kmpl mileage', 0, '2024-06-19', '14:06', '2024-06-20', '14:06', 'C:/Users/Abhay/Desktop/mini/src/Bike/bike_photos/KL01GG6547.jpg'),
('Royal Enfield Hunter', 'KL02CK2056', 2147483647, 2147483647, 550, '', 1, '', '', '', '', 'C:/Users/Abhay/Desktop/mini/src/Bike/bike_photos/KL02CK2056.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `booking_details`
--

CREATE TABLE `booking_details` (
  `name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `ph_no` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `reg_no` varchar(10) NOT NULL,
  `bike_name` varchar(10) NOT NULL,
  `pickuptime` varchar(10) NOT NULL,
  `pickupdate` varchar(10) NOT NULL,
  `dropofftime` varchar(10) NOT NULL,
  `dropoffdate` varchar(10) NOT NULL,
  `totalamount` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking_details`
--

INSERT INTO `booking_details` (`name`, `email`, `ph_no`, `address`, `reg_no`, `bike_name`, `pickuptime`, `pickupdate`, `dropofftime`, `dropoffdate`, `totalamount`) VALUES
('Aby', 'aby123@gmail.com', '987654321', 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01CR896', 'Bajaj RS 2', '14:03', '2024-06-25', '13:03', '2024-08-08', '22000'),
('Abhay', 'abhaysbabu@gmail.com', '7907694440', 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01GG6547', 'Yamaha R15', '14:06', '2024-06-19', '14:06', '2024-06-20', '500'),
('Abhay', 'abhaysbabu@gmail.com', '7907694440', 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01BM125', 'Bajaj Domi', '22:06', '2024-06-17', '23:07', '2024-06-17', '600'),
('Devika', 'devikasuresh5289@gma', '123456', 'kudumasreeeee', 'KL01CK509', 'Duke 390', '23:54', '2024-06-29', '23:54', '2024-06-28', '600');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`name`, `email`, `message`) VALUES
('Abhay', 'abhay@gmail.com', 'good'),
('Aby', 'abythomas@gmail.com', 'motonbon is a very nice bike rental system, bikes are also on great conditions and decent price also, but there are some suggestions to be made in such as give full tank petrol'),
('Anto ', 'binu@gmail.com', 'this site is good'),
('Varun', 'Varun@gmail.com', 'Nice Bike');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `ph_no` int(15) NOT NULL,
  `address` varchar(100) NOT NULL,
  `reg_no` varchar(15) NOT NULL,
  `bike_name` varchar(30) NOT NULL,
  `pickuptime` varchar(10) NOT NULL,
  `pickupdate` varchar(10) NOT NULL,
  `dropofftime` varchar(10) NOT NULL,
  `dropoffdate` varchar(10) NOT NULL,
  `totalamount` int(20) NOT NULL,
  `booked_date` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`name`, `email`, `ph_no`, `address`, `reg_no`, `bike_name`, `pickuptime`, `pickupdate`, `dropofftime`, `dropoffdate`, `totalamount`, `booked_date`) VALUES
('Aby', 'aby123@gmail.com', 987654321, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01GG6547', 'Yamaha R15', '14:07', '2024-06-16', '13:07', '2024-06-20', 2000, ''),
('Aby', 'aby123@gmail.com', 987654321, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL02CK2056', 'Royal Enfield Hunter', '14:27', '2024-06-12', '14:27', '2024-06-14', 1100, ''),
('Aby', 'aby123@gmail.com', 987654321, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01BM125', 'Bajaj Dominar 400', '21:25', '2024-06-14', '20:25', '2024-06-17', 1800, '2024-06-13'),
('Abhay', 'abhaysbabu@gmail.com', 2147483647, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01BM1255', 'Bajaj Discover 125 S', '12:03', '2024-06-13', '13:03', '2024-06-15', 1000, '2024-06-13'),
('Abhay', 'abhaysbabu@gmail.com', 2147483647, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01CK509', 'Duke 390', '13:50', '2024-06-17', '12:50', '2024-06-20', 1800, '2024-06-13'),
('Aby', 'aby123@gmail.com', 987654321, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01CR896', 'Bajaj RS 200', '14:03', '2024-06-25', '13:03', '2024-08-08', 22000, '2024-06-13'),
('Abhay', 'abhaysbabu@gmail.com', 2147483647, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01GG6547', 'Yamaha R15', '14:06', '2024-06-19', '14:06', '2024-06-20', 500, '2024-06-16'),
('Abhay', 'abhaysbabu@gmail.com', 2147483647, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01BM1255', 'Bajaj Discover 125 ST', '13:29', '2024-06-16', '14:29', '2024-06-16', 500, '2024-06-16'),
('Abhay', 'abhaysbabu@gmail.com', 2147483647, 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', 'KL01BM125', 'Bajaj Dominar 400', '22:06', '2024-06-17', '23:07', '2024-06-17', 600, '2024-06-16'),
('Devika', 'devikasuresh5289@gma', 123456, 'kudumasreeeee', 'KL01CK509', 'Duke 390', '23:54', '2024-06-29', '23:54', '2024-06-28', 600, '2024-06-28');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL,
  `address` varchar(60) NOT NULL,
  `ph_no` varchar(15) NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` text NOT NULL,
  `zip` int(10) NOT NULL,
  `dl_no` varchar(20) NOT NULL,
  `dl_photo_path` varchar(100) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'pending',
  `rejection_reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`name`, `email`, `password`, `address`, `ph_no`, `city`, `state`, `zip`, `dl_no`, `dl_photo_path`, `approved`, `status`, `rejection_reason`) VALUES
('', 'abhay@gmail.com', '1234', 'Karyavattom', '987654321', 'Trivandrum', 'Kerala', 695002, 'KL0120220008900', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\KL0120220008900.pdf', 1, 'rejected', ''),
('Abhay', 'abhaysbabu@gmail.com', 'abhay', 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', '7907694440', 'Trivandrum', 'Kerala', 695002, 'KL0120220008900', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\KL0120220008900.pdf', 1, 'approved', ''),
('Aby', 'aby123@gmail.com', '123', 'TC 20/1492 SANTHI W-31 SASTRI NAGAR KARAMANA', '987654321', 'Trivandrum', 'Kerala', 695002, 'KL01663727344838', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\KL01663727344838.pdf', 1, 'approved', ''),
('Anto', 'anto@gmail.com', 'antobinu', 'kudumasree', '12341234', '', '', 695002, '42342342', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\42342342.pdf', 0, 'approved', ''),
('Anto1', 'antoo@gmail.com', 'asdfg', 'kudumbavilak', '2342342', 'Thiruvananthapuram', 'Kerala', 695002, '4323423423', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\4323423423.pdf', 1, 'approved', ''),
('Anto1', 'antooo@gmail.com', 'asdfg', 'Binu veed, Thachottkavu', '7907694440', 'Alappuzha', 'Kerala', 695002, 'KL0166372734483', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\KL0166372734483.pdf', 0, 'pending', ''),
('Arya Rajeshh', 'arya@gmail.com', 'aryaa', 'christ nagar', '2342342', 'Thiruvananthapuram', 'Kerala', 695002, '23423423', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\23423423.pdf', 1, 'approved', ''),
('Devika', 'devikasuresh5289@gmail.com', 'devuuu', 'kudumasreeeee', '123456', 'Thiruvananthapuram', 'Kerala', 695002, '4323423423', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\4323423423.pdf', 1, 'approved', ''),
('', 'rockabhay@gmail.com', 'rock', 'Karyavattom', '7907694440', 'Trivandrum', 'Kerala', 695002, '65465454', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\65465454.pdf', 0, 'pending', ''),
('Varun', 'varun@gmail.com', 'varunbhai', 'Ranga Swami veed, karamana', '8547132456', 'Trivandrum', 'Kerala', 695002, 'KL0120240008950', 'C:\\Users\\Abhay\\Desktop\\mini\\src\\Bike\\dl_photos\\KL0120240008950.pdf', 1, 'pending', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bikedetails`
--
ALTER TABLE `bikedetails`
  ADD PRIMARY KEY (`reg_no`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
