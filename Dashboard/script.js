function menuToggle() {

    var x = document.getElementById("nav-wrapper");

  if (x.style.display == "none") {

    document.getElementById("nav-mobile").style.position = "absolute";

    x.style.float = "none";

    x.style.display = "block";

    x.style.animation = "navMove 1.5s ease"

    x.style.textAlign = "center";

} 

else {

    x.style.display = "none";

  }

}



window.addEventListener('resize', change);



function change() {

    var x = document.getElementById("nav-wrapper");

    x.style.display = "block";

    x.style.float = "left";

}