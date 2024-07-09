const listE1 = document.querySelector('ul');

let currentQuestionIndex = 0;
let loadedData = '';
let CorrectdCount = 0;
let Wrongount = 0;
let selectedOptions = [];
var radios = document.getElementsByName('option');
let currentQtnNo = 0;
let isSaveNextStatus = true;
let timerInterval;
let maxQuestions=15;
let duration =100;
let reviewProcess = false;

//Window.startTimer=startTimer;

startQuiz1();
function startQuiz1(){

     fetch('./loadj.json')
       .then(res => {
          return res.json();
       })
       .then(data  => {
        data.forEach(user => {
            loadedData = data;

           
            
        }); startQuiz(loadedData);
       })
        .catch(error => console.logerror());
        
};

// Assuming you have a container element in your HTML where buttons will be appended
const container = document.getElementById('allbtns');
let btnname="";
// Function to be called when a button is clicked
function buttonClickHandler(event) {
     btnname= event.target.id;
   // alert(`Button ${event.target.id} clicked!`);
    setQuestionById(btnname,selectedOptions[btnname]);
}

// Loop to create buttons
for (let i = 1; i <= maxQuestions; i++) {
    // Create a button element
    const button = document.createElement('button');
    
    // Set button attributes (optional)
    button.setAttribute('id', `${i}`);
    button.textContent = `${i}`;

    button.style.padding = '10px 20px';
    button.style.margin = '5px';
    button.style.backgroundColor = 'grey';
    button.style.color = 'black';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.width ='55px';
    
    // Assign click event handler
    button.addEventListener('click', buttonClickHandler);
    
    // Append the button to the container
    container.appendChild(button);
}






const questionElement = document.getElementById("question");
const nxtButton = document.getElementById("next-btn");

function startQuiz(loadedData){
    showQuestion();
}

function showQuestion() {

    currentQtnNo = loadedData[currentQuestionIndex].qid;
    questionElement.innerHTML = currentQtnNo + ".  " +loadedData[currentQuestionIndex].qname;
    
    const optio1 = document.getElementById("opt1");
    const optio2 = document.getElementById("opt2");
    const optio3 = document.getElementById("opt3");
    const optio4 = document.getElementById("opt4");
   
    document.getElementById("opt1").nextElementSibling.textContent="(1)"+loadedData[currentQuestionIndex].qopt1;
    document.getElementById("opt2").nextElementSibling.textContent="(2)"+loadedData[currentQuestionIndex].qopt2;
    document.getElementById("opt3").nextElementSibling.textContent="(3)"+loadedData[currentQuestionIndex].qopt3;
    document.getElementById("opt4").nextElementSibling.textContent="(4)"+loadedData[currentQuestionIndex].qopt4;

   
    const nextBtn = document.getElementById("next-btn");
    nextBtn.innerHTML = "Save and Next";
  
}

document.getElementById("next-btn").onclick = setNextQuestion;
document.getElementById("Review-btn").onclick = setReviewStatus;
document.getElementById("onxt-btn").onclick = setOnlyNextQuestion;
document.getElementById("submit-btn").onclick = setAnalysisData;
document.getElementById("anxt-btn").onclick = setAnalysisNextQuestion;

function examSummaryReport(){
  let notAttempterd="";
  notAttempterd= maxQuestions -(CorrectdCount+Wrongount);
 
 const resbtn1=document.getElementById("res-status1");
 resbtn1.style.display='inline';
 resbtn1.innerHTML="TOTAL   QUESTIONS  : "+maxQuestions+"<br>"+"<br>"+"NOT ATTEMPTED : "+notAttempterd;
 
 
 const resbtn2=document.getElementById("res-status2");
 resbtn2.style.display='inline';
 resbtn2.innerHTML="CORRECT : " +CorrectdCount+"<br>"+"<br>"+"WRONG : "+Wrongount;
 

}

function setButtonColorsAfterExam(){
  reviewProcess=true;
  const form=document.getElementById('optn-btns');
  const elements=form.elements;
   for(let i=0; i<elements.length;i++){
     elements[i].disabled = false;
   }
   let loopvar=0;
   currentQuestionIndex=0;
   for(let i=1; i<maxQuestions+1;i++){
     loopvar=i;
     const crtbtn=document.getElementById(loopvar);
    if(selectedOptions[currentQuestionIndex+1]==loadedData[currentQuestionIndex].qans)
      {
        crtbtn.style.background='green';
      }
      else if(selectedOptions[currentQuestionIndex+1]>0){
        crtbtn.style.background='red';
      }
      else
      {
        crtbtn.style.background='grey';
      }
      currentQuestionIndex=currentQuestionIndex+1;
   }


  setAnalysisData();
}

const timerElement = document.getElementById('timer');
document.getElementById('close-btn').addEventListener('click',()=> {
  if(timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
    setAnalysis();
    examSummaryReport();
    setButtonColorsAfterExam();
    
  }
});

function setAnalysisNextQuestion ()
{
  let selectdOptionVal=0;
  if(reviewProcess){

  }
  else{
  currentQuestionIndex = currentQuestionIndex + 1;
  }
  
  if(currentQuestionIndex==maxQuestions){
    currentQuestionIndex=0;
  }
  showQuestion();
  selectdOptionVal = selectedOptions[currentQuestionIndex+1];
  for(var i = 0 ; i < radios.length; i++){
    radios[i].checked=false;
  }
  if(selectdOptionVal>0){
    radios[selectdOptionVal-1].checked = true;
  }
  const hintbtn = document.getElementById("hint-btn");
  hintbtn.innerHTML= loadedData[currentQuestionIndex].qhint;

  const ansbtn = document.getElementById("ans-btn");
  ansbtn.innerHTML="ANSWER - OPTION:"+ loadedData[currentQuestionIndex].qans;
    
  if(selectedOptions[currentQuestionIndex+1]==loadedData[currentQuestionIndex].qans)
  {
    ansbtn.style.background='green';
  }
  else if(selectedOptions[currentQuestionIndex+1]>0){
    ansbtn.style.background='red';
  }
  else
  {
    ansbtn.style.background='grey';
  }

  const form=document.getElementById('radio-btns');
  const elements=form.elements;
   for(let i=0; i<elements.length;i++){
     elements[i].readonly = true;
   }


}

function setAnalysisData(){
  let selectdOptionVal = 0;
  currentQuestionIndex = 0;

  const ansbtn = document.getElementById("ans-btn");
  ansbtn.style.display = 'inline';

  
  const anxtbtn = document.getElementById("anxt-btn");
  anxtbtn.style.display = 'none';
  
  const hintbtn = document.getElementById("hint-btn");
  hintbtn.style.display = 'inline';

  const submtbtn = document.getElementById("submit-btn");
  submtbtn.style.display = 'none';

  
  const form1=document.getElementById('radio-btns');
  const elements1=form1.elements;
   for(let i=0; i<elements1.length;i++){
    elements1[i].disabled = false;
   }
  showQuestion();
  selectdOptionVal = selectedOptions[currentQuestionIndex+1];

  for(var i = 0 ; i < radios.length; i++){
    radios[i].checked=false;
  }
  if (selectdOptionVal>0){
    radios[selectdOptionVal-1].checked = true;
  }
  hintbtn.innerHTML= loadedData[currentQuestionIndex].qhint;

  ansbtn.innerHTML="ANSWER - OPTION:"+ loadedData[currentQuestionIndex].qans;
    
  if(selectedOptions[currentQuestionIndex+1]==loadedData[currentQuestionIndex].qans)
  {
    ansbtn.style.background='green';
  }
  else if(selectedOptions[currentQuestionIndex+1]>0){
    ansbtn.style.background='red';
  }
  else
  {
    ansbtn.style.background='red';
  }
  const form=document.getElementById('radio-btns');
  const elements=form.elements;
   for(let i=0; i<elements.length;i++){
     elements[i].readonly = true;
   }

}

function setAnalysis(){
  const submitbtn = document.getElementById("submit-btn");
    submitbtn.style.display = 'inline';
  const nxtbtn = document.getElementById("next-btn"); 
    nxtbtn.style.display = 'none';
  const onxbtn = document.getElementById("onxt-btn"); 
    onxbtn.style.display = 'none'; 
  const rvbtn = document.getElementById("Review-btn");
    rvbtn.style.display = 'none';
  const closebtn = document.getElementById("close-btn");
    closebtn.style.display = 'none';

  timerElement.textContent = '00:00:00';

  
  const form1=document.getElementById('radio-btns');
  const elements1=form1.elements;
   for(let i=0; i<elements1.length;i++){
    elements1[i].disabled = true;
   }
}


function setOnlyNextQuestion(){

  var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   isSaveNextStatus = false;
  setNextQuestion();

}


function setReviewStatus(){
  var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   
  if (selectedIndex != -1){
    selectedOptions[currentQtnNo] = selectedIndex;
    setNextQuestion();
    const button = document.getElementById(currentQuestionIndex);
    button.style.backgroundColor = 'yellow';


  }
  else {
    alert("Select any option");
  }
  
 
}


function setQuestionById(qid,prvSelId){

  
  if(reviewProcess){
    currentQuestionIndex = qid-1;
    setAnalysisNextQuestion();
    exit;
  }
  currentQuestionIndex = qid - 1;
  if(currentQuestionIndex==maxQuestions){
    currentQuestionIndex=0;
  }
  var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   
  if (selectedIndex != -1){
    selectedOptions[currentQtnNo] = selectedIndex;

  }

  
    showQuestion();
    
    for(var i = 0 ; i < radios.length; i++){
      radios[i].checked=false;
    }

    if(prvSelId>0){
         radios[prvSelId-1].checked=true;
    }
      

}


function setExamResultscores(){
  
  //alert("YOUR SCORE: " +CorrectdCount );
  const nextBtn = document.getElementById("next-btn");
  nextBtn.style.display = 'none';
 
  
  const rvwBtn = document.getElementById("Review-btn");
  rvwBtn.style.display = 'none';
  const onxbtn =document.getElementById("onxt-btn");
  onxbtn.style.display ='none';

}


function setNextQuestion(){

var selectedIndex = -1;
  for(var i = 0 ; i < radios.length; i++){
    if(radios[i].checked){
        selectedIndex = i+1;
        break;
    }
   }
   
  if (selectedIndex != -1){
    selectedOptions[currentQuestionIndex+1] = selectedIndex;
    
    const button = document.getElementById(currentQuestionIndex+1);
    button.style.backgroundColor = 'green';
  }
  else if(isSaveNextStatus == true) {
    alert("Select Any Option");
    exit;
  }

   if(selectedIndex==loadedData[currentQuestionIndex].qans){
     CorrectdCount = CorrectdCount + 1;     
   }
   else{
      Wrongount = Wrongount + 1;
   }

   for(var i = 0 ; i < radios.length; i++){
    radios[i].checked=false;
    }

    currentQuestionIndex = currentQuestionIndex + 1;
    if(currentQuestionIndex==maxQuestions){
      currentQuestionIndex=0;
    }
    isSaveNextStatus = true;
    showQuestion();


}

// TIMER FUNCTION
document.addEventListener('DOMContentLoaded', function() {
  
  // Set the initial time for the countdown in seconds
  let countdownTime = duration; // Example: 1 hour

  function updateTimer() {
      if (countdownTime <= 0) {
          clearInterval(timerInterval);
          timerElement.textContent = '00:00:00';
          onTimerEnd();
          return;
      }

      countdownTime--;
      const hrs = Math.floor(countdownTime / 3600);
      const mins = Math.floor((countdownTime % 3600) / 60);
      const secs = countdownTime % 60;

      timerElement.textContent = 
          `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function onTimerEnd() {
     // alert("TIME COMPLETED");
       setAnalysis();
       examSummaryReport();
       setButtonColorsAfterExam();

      // You can add more logic here, like showing a message to the user
  }

  function startTimer() {
      // Initialize the timer display
      //countdownTime = 10; // Reset the time if necessary
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
  }
  startTimer();
});




