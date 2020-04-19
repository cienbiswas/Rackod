<?php

include "../db.php";

header("Access-Control-Allow-Origin: *");

$db = new db("mysqlsvr72.world4you.com", "sql2871162", "3ps+y60", "8564849db1");

if($_SERVER["REQUEST_METHOD"] == "GET") {

    $responseObj = new stdClass;

    $username = strtolower($_GET["username"]);
    $password = md5($_GET["password"]);

    $user = $db->query('SELECT * FROM User WHERE username = ? AND password = ?', array($username, ''))->fetchArray();
    if($user != []) {

        $newUser = $db->query('UPDATE User SET password = ? WHERE username = ?', array($password, $username));
        $responseObj->status = "200";
        $responeObj->username = $username;
        $responseObj->state = "Password successfully set";
        $responseObj = json_encode($responseObj);
        echo $responseObj;
        exit();      

    } else {
        $responseObj->status = "601";
        $responseObj->state = "User not found OR password has already been set";
        $responseObj = json_encode($responseObj);
        echo $responseObj;
        exit();
    }

}

?>