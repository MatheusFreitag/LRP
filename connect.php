<?php
//Connection with the Database
$servername         = "127.0.0.1";
$username           = "root";
$password           = "";
$DB_name            = "Projects";

$connect = mysql_connect($servername, $username, $password);
$dbs = mysql_select_db($DB_name, $connect);

 ?>
