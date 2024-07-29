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


document.getElementById('phone').addEventListener('input', function() {
  this.value = this.value.replace(/\D/g, '');
});

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

  function displayText() {
    // Replace this with your dynamic text assignment logic
    var dynamicText = "Hi....\n 1.Make sure your INTERNET good connectivity and BATTERY.\n 2.Your FIRST ATTEMPT of exam marks only saved. ";
    dynamicText = dynamicText+"\n 3. Exam will be CLOSED AUTOMATICALLY once specified duration completed.";

    dynamicText = dynamicText+"\n 4. TIMER is running down once you click on login and EXAM WILL START immediatly. \n 5.Download your Exam RESPONSE sheet. \n 6.Don't Refresh or reload the page."

    alert(dynamicText);
}
  