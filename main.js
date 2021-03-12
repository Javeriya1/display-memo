//listen for form submit

document.getElementById("memoForm").addEventListener("submit", submitForm);

gen_captcha();


function submitForm(e) {


  e.preventDefault();
  // var error=document.getElementById("error");
  x=(document.getElementById('check').checked)
  y=(document.getElementById('checks').checked)

  if(x==true && y==true){
    // error.innerHTML=""

  //get values
  var Name = getInputVal("fname");
  var LastName = getInputVal("lname");
  var Email = getInputVal("email");
  var Phone = getInputVal("phone");
  var Address = getInputVal("address");
  // var Age=getInputVal("age");
  // ageValidation();
 check_captcha(Name, LastName, Email, Phone, Address);
  }
  else{
    // alert("please accept the options")
    // error.innerHTML="please accept the options"
  }  
}

//function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

//   Add the data to firebase

function storeData(Name, LastName, Email, Phone, Address) {
  db.collection("users")
    .doc()
    .set({
      Name: Name,
      LastName: LastName,
      Email: Email,
      Phone: Phone,
      Address: Address,
      // Age:Age,
      // text: text
    })
    .then(() => {
      console.log("document written successfully");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
function getData() {
  const msgs = document.querySelector("#msgs");

  db.collection("users").onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        msgs.innerHTML +=
          "<div class='list'><h3>" +
          change.doc.data().Name +
          "</h3><p>" +
          change.doc.data().LastName +
          "</p><p>" +
          change.doc.data().Email +
          "</p><p>" +
          change.doc.data().Phone +
          "</p><p>" +
          change.doc.data().Address +
          "</p></div>";
          // change.doc.data().Age +
          // "</p></div>";
      }
    });
  });
}
var sum;
function gen_captcha() {
  let data1 = Math.round(10 * Math.random());
  let data2 = Math.round(10 * Math.random());
  let str = ` ${data1}+${data2}=?`;
  document.querySelector("#captcha").innerHTML = str;
  sum = data1 + data2;
}

function check_captcha(Name, LastName, Email, Phone, Address) {
  let rec = document.querySelector("#text").value;

  if (rec == sum)  {
    //store data
    storeData(Name, LastName, Email, Phone, Address);
    //show alert
    document.querySelector(".alert").style.display = "block";
    //hide alert after 5 seconds
    setTimeout(function () {
      document.querySelector(".alert").style.display = "none";
    }, 5000);

    //clear data
      document.getElementById("memoForm").reset();

     
  } else {
    alert("please enter the correct value");
  }
}

function EmailValidation(){
  var form=document.getElementById("memoForm");
  var email=document.getElementById("email").value;
  var text=document.getElementById("texts");
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if(email.match(pattern)){
    form.classList.add("valid");
    form.classList.remove("Invalid");
    text.innerHTML="";
    
   }
 
  else{
    form.classList.remove("valid");
    form.classList.add("Invalid");
    text.innerHTML="Please Enter Valid Email Address";
    text.style.color="#ff0000";
  }
    if(email=="")
   {
     form.classList.remove("valid");
     form.classList.remove("Invalid");
     text.innerHTML="Please Enter Email Address";
     text.style.color="#ff0000";
   }
}



//(xxx) xxx-xxxx format code

$(document).ready(function () {
  $('#phone').usPhoneFormat({
      format: '(xxx) xxx-xxxx',
  });   
});

// window.onload = function(){
// for(let i=15;i<30;i++){
//   let x =document.createElement("OPTION")
//   x.setAttribute("value",i)
//   x.innerHTML=i
//   document.getElementById("age").appendChild(x)
//  }
   
// }

// function ageValidation(){
//   var age=document.getElementById("age").value;
//   var AgeMsg=document.getElementById("AgeMsg")
//   if(age<18){
//     AgeMsg.innerHTML="Age must be above 18";
//     return false;
//   }
//   else{ 
//     return true;
//   }
// }



window.onload=function(){
  memoForm.addEventListener('input',()=>{
    if(fname.value.length>0 && email.value.length>0 && phone.value.length>0 && address.value.length>0&&text.value.length>0){
      mybtn.removeAttribute('disabled');
    }
    else{
      mybtn.setAttribute('disabled','disabled');
    }
  })
}

// function myFunction() {
//   var fname = document.getElementById("fname");
//   var lname = document.getElementById("lname");
//   var email = document.getElementById("email");
//   var phone = document.getElementById("phone");
//   var address = document.getElementById("address");

//   fname.value=
//   x.value = x.value.toUpperCase();
// }


//focus and blur event
//create focus event
var form=document.getElementById("memoForm")

// form.addEventListener(
//   "focus",
//   function(event){

//     if(event.target.value='')
//     {

//     }
//   },
//   true
// );

// create blur event

form.addEventListener(
  "blur",
  function(event){
    if(event.target.value.length==0){
    event.target.style.borderColor="red"
    }
    else{
      event.target.style.borderColor="lightgrey"
    }
  },
  true
);

