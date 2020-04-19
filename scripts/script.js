// -------------------------------------------
// MAIN - JS - Script
// @author: Moritz Mitterdorfer
// @date: 2019-09-23
// @version: 1.0
// -------------------------------------------

// scribt has loaded
let sessionToken = Cookies.get("sessionToken");
let username = Cookies.get("username");
let admins = ["bis19437", "mit19629"];

onload = () => {
    // check if you are logged in 
    if(username && username != "undefined" && username != "") {
        $('#username').html("<a href='/myaccount'>" + username.toUpperCase() + "</a> | <a onclick='logout()'>Logout</a>");
    } else {
        $('#username').html("<a href='/login'>Login</a>");
    }

    console.log(window.location.href);

    // list all entries in the db
    let api = "https://rackod.com/course/API/endpoints/entries.php";
    let req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', api, true);
    req.onload = () => {
        let res = req.response;
        let content = res.content;
        
        for(let i = 0; i < content.length; i++) {
            
            let prio = content[i].priority;
            let prioTranslate = {
                0 : "red   '>Test",
                1 : "red   '>Exam",
                2 : "green '>Homework",
                3 : "orange'>Revision",
                4 : "orange'>Presentation",
                5 : "red   '>Abgabe",
                6 : "red   '>Other"
            }
            /*
            let prioTranslate2 =  {
                0 : name = "Test", color = "red"
                1 : name = "Exam", color = "red",
                2 : name = "Homework", color = "green",
                3 : name = "Revision", color = "orange",
                4 : name = "Presentation", color = "orange",
                5 : name = "Abgabe", color = "red",
                6 : name = "Other", color = "red"
            }
            */
            prio = prioTranslate[prio];

          //// display them
          //$('#tablecontent').append(""+
          //    "<tr>" + 
          //        "<th>" + prio + "</th>" + 
          //        "<th>" + content[i].subject + "</th>" +
          //        "<th>" + content[i].until + "</th>" +
          //        "<th>" + content[i].title + "</th>" +
          //    "</tr>" +
          //"");

          //<div class="container m-4">
          //  <table class="table rounded-lg">
          //      <thead>
          //        <tr>
          //          <th scope="col">Prio</th>
          //          <th scope="col">Subject</th>
          //          <th scope="col">Until</th>
          //          <th scope="col">Title</th>
          //        </tr>
          //      </thead>
          //      <tbody id="tablecontent">
          //      </tbody>
          //    </table>
          //  </div>

            let edit_delete_button = "<h3 style='display:inline'>" + /*"<div class='badge badge-dark' onclick='editEntry(" + content[i].id + ")'>edit</div>" + */ "<div class='badge badge-danger' style='display:inline; float:right' onclick='deleteEntry(" + content[i].ID + ")'><i class='icon-trash'></i></div></h3><br>";
            if(username != content[i].author && !(admins.includes(username)))
                edit_delete_button = "";

            //    
            let until = new Date(content[i].until).toDateString();

            //Append date appropiately
            $('#content').append("<span id='day' display='none'></span>");
            if(i != 0){
                if(new Date(content[i].until).toDateString() != new Date(content[i-1].until).toDateString()){ //e.g. if(Tue Mar 24 2020 != Wed Mar 25 2020)
                $('#content').append("<h2 style='margin-top: 20%'><span class='badge badge-warning' id='day'>" + until + "</span></h2><hr class='my-3' style='border: 2px solid #f1f1f1'>");
                }
                
            }
            else{
                $('#content').append("<h2><span class='badge badge-warning' id='day'>" + until + "</span></h2><hr class='my-3' style='border: 2px solid #f1f1f1'>");
            }

            //Entry HTML design
            let subjectColor = prio.substr(0, 6);
            $('#content').append("" +
                "<div class='jumbotron' style='margin-left: 5%; margin-right: 5%;'>" + 
                    "<h3><span class='badge badge-light' style='color:" + subjectColor + "'>" + content[i].subject + "</span></h3>" +
                    /*"<div class='checkboxDIV' style='display:inline; float:right'><input type='checkbox' id='checkbox'>"+<label class='custom-control-label' for='entry_" + content[i].ID + "'></label>"</div>" +*/               //WORK IN PROGRESS Checkbox
                    "<h3><span class='badge badge-light' id='priority' style='color:" + prio + "</span></h3>" + 
                    "<hr class='my-2'>" + 
                    "<p class='lead'>" + 
                    "<p style='display:inline'>" + content[i].description + "</p>" + 
                    edit_delete_button +
                "</div>" +
            "");

        }

    }
    req.send(null);

    if(username && username != "undefined" && username != "") {
        $('#content').append(""+
                "<div class=\"jumbotron\"><h1 class=\"display-4\">Make Entry</h1><hr class=\"my-4\"><a class=\"btn btn-primary btn-lg\" href=\"/newentry\" role=\"button\">Start</a></div>" +
            "");
        
    } 
}

// logout is called
logout = () => {

    Cookies.set("username", undefined);
    Cookies.set("sessionToken", undefined);

    location.reload();
    $('#username').html("<a href='/login'>Login</a>");
}

// newEntry button is pressed
newEntry = () => {
    
    window.location = "/newentry";

}

// if delete is called
deleteEntry = (id) => {

    let api = "https://rackod.com/course/API/endpoints/deleteEntry.php?entryID=" + id + "&username=" + username + "&sessionToken=" + sessionToken;
    let req = new XMLHttpRequest();
    //req.responseType = 'json';
    req.open('GET', api, true);
    req.onload = () => {
        location.reload();
    }
    req.send(null);
}