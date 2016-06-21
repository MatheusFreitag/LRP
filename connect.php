<?php

$conn = new PDO('mysql:host=localhost;dbname=projects;charset=utf8mb4', 'root', '');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

/*
$connect = mysql_connect($servername, $username, $password);
$dbs = mysql_select_db($DB_name, $connect);
*/

 ?>
