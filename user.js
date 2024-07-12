let pswrd="";
let usrname="";

var examDur = {
  examduration: 0
};


loadExamDetails();

function loadExamDetails(){
fetch('user.json')
  .then(response => response.json())
  .then(udata => {
    pswrd= udata[0].pwrd;
  //  usrname=udata[0].usr;
     examDur.examduration = udata[0].duration;
    //examduration=udata[0].duration;

  })
  .catch(error => console.error('Error fetching JSON:', error));
}


// script.js
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
    
    // Get values from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if(password==pswrd){
        window.location.href = "exam.html";
    }
    else {
      alert("Invalid User");
    }
    

  });
  