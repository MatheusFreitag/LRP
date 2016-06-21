<?php
include "connect.php";

//Query to get all data from the DataBase
$sql = mysql_query("SELECT * FROM projects ORDER BY ID ASC");
//An array to store all Data
$data = array();
//While I have rows in the database, store them
while($row = mysql_fetch_row($sql)){
  $data[] = $row;
}
//Encode a Json file to send to jQuery AJAX
echo json_encode($data);


?>
