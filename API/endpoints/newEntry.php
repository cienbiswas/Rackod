<?php



include "../db.php";



header("Access-Control-Allow-Origin: *");



$db = new db("mysqlsvr72.world4you.com", "sql2871162", "3ps+y60", "8564849db1");

$displayVar = 0;

if($_SERVER["REQUEST_METHOD"] == "GET") {


    $prio = strip_tags($_GET["prio"]);

    $subject = strip_tags($_GET["subject"]);
    
    $displayUntil12 = strip_tags($_GET["displayUntil12"]);
    if($displayUntil12 == "true")
        $displayVar = 10;   //UTC+2 --> Until is set to 12:00 --> will get deleted at 12:00
    else
        $displayVar = 22;   //UTC+2 --> Until is set to 24:00 --> will get deleted at 24:00
    
    $until = strip_tags($_GET["until"]) + $displayVar*60*60*1000 - 1000;    //12*60*60*1000 --> 12h 0mins 0secs 0millisecs - 1000millisecs --> 11h 59mins 59secs 0millisecs

    $description = strip_tags($_GET["description"]);

    $username = strtolower(strip_tags($_GET["username"]));

    $sessionToken = strip_tags($_GET["sessionToken"]);



    $ret = new stdClass;



    if(!empty($subject) && !empty($until) && !empty($description)) {

        if($prio == 0 || $prio == 1 || $prio == 2 || $prio == 3 || $prio == 4 || $prio == 5 || $prio == 6) {

            if(strlen($subject) < 100 && strlen($description) < 500) {



                // check if user is authorized

                $user = $db->query('SELECT * FROM User WHERE username = ? AND sessionToken = ?', array($username, $sessionToken))->fetchArray();


                if($user != []) {



                    // PRIMARY KEY of User (not-implemented)

                    $user_id = $username;



                    // user is authorized

                    $insert = $db->query('INSERT INTO Entry (priority,subject,until,description,author) VALUES (?,?,?,?,?)', array($prio,$subject,$until,$description,$user_id));

                    $ret->status = "200";

                    $ret->message = "Entry successfully posted";

                    echo json_encode($ret);



                } else {

                    $ret->status = "401";

                    $ret->message = "User is not authorized to post entry OR User does not exist!";

                    echo json_encode($ret);

                }



            } else {

                $ret->status = "603";

                $ret->message = "One requested parameter is too long! (course/API)";

                echo json_encode($ret);

            }

        } else {

            $ret->status = "602";

            $ret->message = "Priority must be in range 0-6";

            echo json_encode($ret);

        }

    } else {

        $ret->status = "601";

        $ret->message = "One or more requestet parameter(s) is null";

        echo json_encode($ret);

    }



}



?>