let uname="m";
let pwrd="m";


// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get values from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if(username==uname && password==pwrd){
        window.location.href = "exam.html";
    }
    else {
      alert("Invalid User");
    }
    

  });
  