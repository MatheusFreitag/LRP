<?php
include "connect.php";

$stmt = $conn->query('SELECT * FROM projects');
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$results =(json_encode($results));

echo $results;
?>
