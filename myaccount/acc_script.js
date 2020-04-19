// -------------------------------------------
// MAIN - JS - Script
// @author: Moritz Mitterdorfer
// @date: 2019-09-23
// @version: 1.0
// -------------------------------------------

// scribt has loaded
onload = () => {

    // check if you are logged in 
    let username = Cookies.get("username");
    if(username && username != "undefined" && username != "") {
        $('#username').html("<a href='/myaccount'>" + username + "</a> | <a onclick='logout()'>Logout</a>");
    } else {
        $('#username').html("<a href='/login'>Login</a>");
    }


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
                0 : "<div style='color:red'>Test</div>",
                1 : "<div style='color:red'>Exam</div>",
                2 : "<div style='color:green'>Homework</div>",
                3 : "<div style='color:orange'>Revision</div>",
                4 : "<div style='color:orange'>Presentation</div>",
                5 : "<div style='color:red'>Abgabe</div>",
                6 : "->"
            }
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

            let edit_delete_button = "<h3><div class='badge badge-secondary' onclick='editEntry(" + content[i].id + ")'>edit</div> <div class='badge badge-secondary' onclick='deleteEntry(" + content[i].id + ")'>delete</div></h3><hr>";
            if(username != content[i].author)
                edit_delete_button = "";


            $('#content').append(""+
                "<div class='jumbotron'>" + 
                    edit_delete_button + 
                    "<h3>" + content[i].title + "</h3>" + 
                    "<p class='lead'>" + prio + content[i].subject + " | " + content[i].until + "</p>" +
                    "<hr class='my-4'>" + 
                    "<p>" + content[i].description + "</p>" + 
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
    //sets the username to the according one
    document.getElementById('username').innerHTML = username.toUpperCase();
    document.getElementById('username-email').innerHTML = username.toUpperCase();
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
                0 : "<div style='color:red'>Test</div>",
                1 : "<div style='color:red'>Exam</div>",
                2 : "<div style='color:green'>Homework</div>",
                3 : "<div style='color:orange'>Revision</div>",
                4 : "<div style='color:orange'>Presentation</div>",
                5 : "<div style='color:red'>Abgabe</div>",
                6 : "->"
            }
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

            let edit_delete_button = "<h3><div class='badge badge-secondary' onclick='editEntry(" + content[i].id + ")'>edit</div> <div class='badge badge-secondary' onclick='deleteEntry(" + content[i].id + ")'>delete</div></h3><hr>";
            if(username != content[i].author)
                edit_delete_button = "";


            $('#content').append(""+
                "<div class='jumbotron'>" + 
                    edit_delete_button + 
                    "<h3>" + content[i].title + "</h3>" + 
                    "<p class='lead'>" + prio + content[i].subject + " | " + content[i].until + "</p>" +
                    "<hr class='my-4'>" + 
                    "<p>" + content[i].description + "</p>" + 
                "</div>" +
            "");

        }

    }
    req.send(null);
    
}