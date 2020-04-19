<?php

include "../db.php";

header("Access-Control-Allow-Origin: *");

$db = new db("mysqlsvr72.world4you.com", "sql2871162", "3ps+y60", "8564849db1");

if($_SERVER["REQUEST_METHOD"] == "GET") {

    $username = strtolower($_GET["username"]);
    $password = md5($_GET["password"]);

    if(empty($username) || empty($password)) {
        $responseObj->user = $username;
        if(empty($username)) {
            $responseObj->status = "401";
            $responseObj->state = "User not logged in > Parameter username is null";
        }
        if(empty($password)) {
            $responseObj->status = "402";
            $responseObj->state = "User not logged in > Parameter password is null";
        }
        $creds->sessionToken = null;
        $responseObj->credentials = null;
        $responseObj = json_encode($responseObj);
        echo $responseObj;
        exit();
    }




    $user = $db->query('SELECT Username FROM User WHERE username = ? AND password = ?', array($username, $password))->fetchArray();

    if($user == []) {
        $responseObj->user = $username;
        $responseObj->status = "403";
        $responseObj->state = "User not logged in > Incorrect Password OR username";
        $creds->sessionToken = null;
        $responseObj->credentials = null;
        $responseObj = json_encode($responseObj);
        echo $responseObj;
        exit();
    }

    $responseObj->user = $user;
    $responseObj->status = "200";
    $responseObj->state = "User logged in";

    // generate a session token
    $bytes = random_bytes(50);
    $creds->sessionToken = bin2hex($bytes);
    // update db 
    $newUser = $db->query('UPDATE User SET sessionToken = ? WHERE username = ? AND password = ?', array($creds->sessionToken, $username, $password));

    $responseObj->credentials = $creds;

    $responseObj = json_encode($responseObj);
    echo $responseObj;
    exit();

}

$db->close();

?>