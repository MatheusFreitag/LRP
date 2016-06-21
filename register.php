<?php

include "connect.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$professor = $request->professor;
$title = $request->title;

$sql = "INSERT INTO projects(professor, title) VALUES('$professor', '$title')";

try {
    //connect as appropriate as above
    $conn->query($sql); //invalid query!
    echo "Success";
} catch(PDOException $ex) {
    echo "An Error occured!"; //user friendly message
}
?>
