-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Sep 2025 pada 06.26
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `community`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `comments`
--

INSERT INTO `comments` (`id`, `content`, `createdAt`, `userId`, `postId`) VALUES
(1, 'Komentar pertama saya!', '2025-09-26 08:00:38.928510', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `comment_likes`
--

CREATE TABLE `comment_likes` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `commentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `comment_likes`
--

INSERT INTO `comment_likes` (`id`, `userId`, `commentId`) VALUES
(2, 1, 1),
(3, 4, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `tags` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `tags`, `createdAt`, `userId`) VALUES
(1, 'Posting pertama', 'Halo semua, ini postingan pertama saya ?', 'intro,first', '2025-09-26 07:38:45.250556', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`) VALUES
(1, 'testuser@mail.com', '$2b$10$N2K.y3rYHzEoa2tZRZwdau9V5w52Z2SoIlJxmcLm5ZcY7y7ENyhPG', 'user', '2025-09-26 06:45:57.201536'),
(2, 'admin@mail.com', '$2b$10$po4OHFHMunc5tnB6lxwwSe0HFBr8HPdkvMgfDrgJINn.0Uw0Hxg5u', 'admin', '2025-09-26 08:28:15.845707'),
(3, 'user1@mail.com', '$2b$10$ujYNq2PyiY7ZPFpI9JNUZ./x14tz/x5nv7.A.mjjmost7uGLdxB4u', 'user', '2025-09-26 08:37:26.693500'),
(4, 'rhizky99@gmail.com', '$2b$10$37jlDHjeyVvyVojFaUlggeSSLXZgW3Op7rGOxmJ9U.pDHRpf9aGE6', 'user', '2025-09-26 09:14:38.669773');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_7e8d7c49f218ebb14314fdb3749` (`userId`),
  ADD KEY `FK_e44ddaaa6d058cb4092f83ad61f` (`postId`);

--
-- Indeks untuk tabel `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_ec6698ead14ad945033ebb2f1b` (`userId`,`commentId`),
  ADD KEY `FK_abbd506a94a424dd6a3a68d26f4` (`commentId`);

--
-- Indeks untuk tabel `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ae05faaa55c866130abef6e1fee` (`userId`);

--
-- Indeks untuk tabel `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_30ee85070afe5b92b5920957b1` (`userId`,`postId`),
  ADD KEY `FK_6999d13aca25e33515210abaf16` (`postId`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `comment_likes`
--
ALTER TABLE `comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_7e8d7c49f218ebb14314fdb3749` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e44ddaaa6d058cb4092f83ad61f` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD CONSTRAINT `FK_34d1f902a8a527dbc2502f87c88` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_abbd506a94a424dd6a3a68d26f4` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK_ae05faaa55c866130abef6e1fee` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `FK_37d337ad54b1aa6b9a44415a498` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6999d13aca25e33515210abaf16` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
