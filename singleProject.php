<?php

include "connect.php";

$request = json_decode( file_get_contents('php://input') );
$variable = $request->id;


$sql = 'SELECT * FROM projects WHERE id="'.$variable.'"';
$stmt = $conn->prepare( $sql );
$stmt->execute();

$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
$json = json_encode( $result );

echo $json;


/*
// a query get all the records from the users table
$sql = 'SELECT id, name, email FROM users';

// use prepared statements, even if not strictly required is good practice
$stmt = $dbh->prepare( $sql );

// execute the query
$stmt->execute();

// fetch the results into an array
$result = $stmt->fetchAll( PDO::FETCH_ASSOC );

// convert to json
$json = json_encode( $result );

// echo the json string
echo $json;


$request = json_decode( file_get_contents('php://input') );
$variable = $request->id;

$stmt = $conn->query('SELECT * FROM projects WHERE id="'.$variable.'"');
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

$data =(json_encode($results));
*/




?>
