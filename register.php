<?php

include "connect.php";

$data = json_decode(file_get_contents("php://input"));
$databaseTitle = mysql_real_escape_string($data->databaseTitle);
$databaseDescription = mysql_real_escape_string($data->databaseDescription);

mysql_query("INSERT INTO $DB_name('Professor', 'Título') VALUES($databaseTitle, $databaseDescription)");


?>
