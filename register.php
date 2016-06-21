<?php

include "connect.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$title = $request->title;
$description = $request->description;

$sql = "INSERT INTO projects(title, description) VALUES('$title', '$description')";

try {
    //connect as appropriate as above
    $conn->query($sql); //invalid query!
    echo "Success";
} catch(PDOException $ex) {
    echo "An Error occured!"; //user friendly message
}
?>
