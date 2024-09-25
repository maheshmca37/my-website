let pswrd="m";
let usrname="m";


// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get values from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if(password==pswrd){
       // alert("Valid User");
        window.location.href = "event.html";
    }
    else {
      alert("Invalid User");
    }
    

  });
  











