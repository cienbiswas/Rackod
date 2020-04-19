<?php

include "../db.php";

header("Access-Control-Allow-Origin: *");

$db = new db("mysqlsvr72.world4you.com", "sql2871162", "3ps+y60", "8564849db1");
// $entry = $db->query('Select Author FROM Entry WHERE ID = ?', array($entryID)) -> fetchArray();

$ret = new stdClass;

if($_SERVER["REQUEST_METHOD"] == "GET") {

    $entryID = strip_tags($_GET["entryID"]);
    $username = strip_tags($_GET["username"]);
    $sessionToken = strip_tags($_GET["sessionToken"]);
    
    // check if user is authorized
    $user = $db->query('SELECT * FROM User WHERE username = ? AND sessionToken = ?', array($username, $sessionToken))->fetchArray();
    if($user != []) {

        // check if entry is from the user $username who is authorized
        $userID = $db->query('SELECT * FROM Entry WHERE ID = ? AND author = ? OR author = "bis19437" OR author = "mit19629"', array($entryID, $username)) -> fetchArray();
        if($userID != []) {
            $db->query('DELETE FROM Entry WHERE ID = ?', array($entryID));
            $ret->status = "200";
            $ret->message = "Entry successfully deleted!";
            echo json_encode($ret);
        }
        else {
            $ret->status = "601";
            $ret->message = "Not user's entry OR entry does not exist in db!";
            echo json_encode($ret);
        }

    }
    else {
        $ret->status = "401";
        $ret->message = "User is not authorized to post entry OR User does not exist!";
        echo json_encode($ret);
    }
}

?>