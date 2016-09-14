<?php

include "connect.php";

$request = json_decode(file_get_contents('php://input') );
$variable = $request->id;

echo $variable;
$sql = 'SELECT * FROM projects WHERE id="'.$variable.'"';
$stmt = $conn->prepare( $sql );
$stmt->execute();

$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
$json = json_encode( $result );

echo $json;






?>
