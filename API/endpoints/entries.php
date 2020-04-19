<?php

include "../db.php";

header("Access-Control-Allow-Origin: *");

$db = new db("mysqlsvr72.world4you.com", "sql2871162", "3ps+y60", "8564849db1");

$responseObj = new stdClass;

if($_SERVER["REQUEST_METHOD"] == "GET") {

  $time = time() * 1000;
  $delete = $db->query('DELETE FROM Entry WHERE until < ?', array($time));


    $entries = $db->query('SELECT * FROM Entry ORDER BY until')->fetchAll();

    $responseObj->content = $entries;
    $responseObj->status = "200";
    $responseObj->state = "You have received alle entries. Syntax: course.rackod.com/API";
    $responseObj = json_encode($responseObj);
    echo $responseObj;
    exit();
    
}

if($_SERVER["REQUEST_METHOD"] == "DELETE") {

  echo file_get_contents('php://input');  

}

?>