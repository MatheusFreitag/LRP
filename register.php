<?php

include "connect.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$title = $request->title;
$description = $request->description;
$email = $request->email;
$externalLink = $request->externalLink;
$areaOfStudy = $request->areaOfStudy;
$students = $request->students;
$faculty = $request->faculty;
$status = $request->status;
$prerequisites = $request->prerequisites;
$howToApply = $request->howToApply;

$sql = "INSERT INTO projects(title, description, email, externalLink, area, students, faculty, status, prerequisites, howToApply) VALUES('$title', '$description', '$email', '$externalLink', '$areaOfStudy', '$students', '$faculty', '$status', '$prerequisites', '$howToApply')";

try {
    //connect as appropriate as above
    $conn->query($sql); //invalid query!
    echo "Success";
} catch(PDOException $ex) {
    echo "An Error occured!"; //user friendly message
}
?>
