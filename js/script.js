
//focus first text field
$( "input#name" ).focus();
const jobRoleSelection = $("select#title");

//hide other role text field and then show when other is selected from job down menu
$("#other-title").hide();
jobRoleSelection.change( function()
{
  const jobSelected = $( "#title option:selected").text();
  if( jobSelected === "Other" )
  {
    $("#other-title").show();
  }
  else
  {
    $("#other-title").hide();
  }
});

//use a change listener for design and hide and show color of t-shirt according to chosen design
const colorOptions = $("select#color option");
$("select#color").prepend( "<option id='select-option' value='please select t-shirt' selected = 'selected'>Please select a T-shirt theme</option>" );
colorOptions.hide();
$('#colors-js-puns').hide();

const  tShirtSelection = $("select#design");
tShirtSelection.change( function()
{

  const designSelected = $( " #design option:selected" ).text();
  if( designSelected === "Theme - JS Puns")
  {
    $('#colors-js-puns').show();
    jQuery("#color option:selected").text("Please select a T-shirt color");
    for( let i = 0; i < colorOptions.length; i++)
    {
      if( colorOptions[i].textContent.indexOf("(JS Puns shirt only)") !== -1)
      {
        colorOptions[i].style.display = "";
      }
      else
      {
        colorOptions[i].style.display = "none";
      }
    }
  }
  else if( designSelected === "Theme - I ♥ JS")
  {
    $('#colors-js-puns').show();
    jQuery("#color option:selected").text("Please select a T-shirt color");
    for( let i = 0; i < colorOptions.length; i++)
    {
      if( colorOptions[i].textContent.indexOf("(I ♥ JS shirt only)") !== -1){
        colorOptions[i].style.display = "";
      }
      else
      {
        colorOptions[i].style.display = "none";
      }
    }
  }
  else{
    $('#colors-js-puns').hide();
    jQuery("#color option:selected").text("Please select a T-shirt theme");
    for( let i = 0; i < colorOptions.length; i++){
      colorOptions[i].style.display = "none";


    }
  }
});

//function that disables activities that clash with chosen activities.
function disableClash(a,b){
  if(activities[a].checked == 1){
    activities[b].disabled = true;
  }
  else{
    activities[b].disabled = false;
  }
}

//set the cost of the activities chosen and display total cost below checkboxes and disable activities that clash when chosen
const activities = document.querySelectorAll('.activities input');
let cost = 0
$("fieldset.activities").append('<p id = "cost">Total Cost: ' + cost + '</p>');
$('.activities').on('change', function () {
    cost = 0;
    for(let i = 0; i < activities.length; i++ ){
      if( activities[i].checked == 1 ){
        if(activities[i].name == "all"){
          cost += 200
        }
        else{
        cost +=100;
      }
      }
    }
    $("p#cost").text("Total Cost: $" + cost);
    disableClash(1,3);
    disableClash(3,1);
    disableClash(2,4);
    disableClash(4,2);

});

//function that hides and show payment method information depending on the payment method chosen
function showHidePaymentMethod(show, hide1, hide2){
  show.show();
  hide1.hide();
  hide2.hide();
}

//hide and show payment information
const creditCard = $('#credit-card');
const otherPaymentMethods = $('div p');
const paypal = otherPaymentMethods.eq(1);
const btc = otherPaymentMethods.eq(2);
const paymentMethod = $('#payment');

paypal.hide();
btc.hide();
$('#payment option').eq(0).hide();
$('#payment option:selected').text('Credit Card');
paymentMethod.change(   function () {

  const paymentMethodSelected = $('#payment option:selected').text();
  if(paymentMethodSelected == "PayPal"){
    showHidePaymentMethod(paypal, creditCard, btc);
  }
  else if( paymentMethodSelected == "Bitcoin" ){
    showHidePaymentMethod(btc, creditCard, paypal);
  }
  else{
    showHidePaymentMethod(creditCard, btc, paypal);
  }
});

function nameErrorTest(){
  if(regexName.test(name.val()) === false){
    nameError.show();
    return 0;
  }
  else{
    nameError.hide();
    return 1;
  }
}

//form validation for name
const name = $("#name");
let regexName = new RegExp("^([a-zA-Z ]+)$");
$("fieldset input#name").after('<p id="nameError">Please fill in your name. Name field cannot be blank.</p>');
const nameError = $('#nameError')
nameError.css("color", "red");
nameError.hide();
$('#name').on("keyup", function(){
  nameErrorTest();
});

//function for email validation error
function emailErrorTest(){
  if(regexEmail.test(email.val()) === false){
    mailError.show();
    return 0;
  }
  else{
    mailError.hide();
    return 1;
  }

}


//function for zip code validation error
function zipErrorTest(){
  if(regexZip.test(zip.val()) === false){
    zipError.show();
    return 0;
  }
  else{
    zipError.hide();
    return 1;
  }

}

//function for cvv validation error
function cvvErrorTest(){
  if(regexCvv.test(cvv.val()) === false){
    cvvError.show();
    return 0;
  }
  else{
    cvvError.hide();
    return 1;
  }
}

//function for credit card validation error
function creditErrorTest(){
  if(regexCC.test(credit.val()) === false){
    if(credit.val().length === 0){
      ccError1.show()
      ccError.hide()
      return 0;
    }
    else{
      ccError.show()
      ccError1.hide()
      return 0;
    }
  }
  else{
    ccError.hide();
    ccError1.hide();
    return 1;

  }

}

//regex validation for email
const email = $("#mail");
let regexEmail = /^\w+@\w+\.\w{1,10}$/;
$("fieldset input#mail").after('<p id="mailError">Please fill in a valid email address</p>');
const mailError = $('#mailError')
mailError.css("color", "red");
mailError.hide();
$('#mail').on("keypress", function(){
  emailErrorTest()
});

//error message for when activity is not selected
$('.activities').after('<p id="activitiesError">Please choose at least one activity</p>');
const activitiesError = $('#activitiesError');
activitiesError.css("color", "red");
activitiesError.hide();


//check if at least one activity is chosen
function activityError(){
  if($('.activities input[type=checkbox]:checked').length == 0)
  {
    activitiesError.show();
    return 0;
  }
  else
  {
    activitiesError.hide();
    return 1;
  }
}

//when user clicks on register, check for errors.
$(document).on("submit", function(){
  let error1 = emailErrorTest();
  let error2 = nameErrorTest();
  let error3 = creditErrorTest();
  let error4 = zipErrorTest();
  let error5 = cvvErrorTest();
  let error6 = activityError();
  if((error1 == 0) || (error2 == 0) || (error3 == 0) || (error4 == 0) || (error5 == 0) || (error6 == 0)){
    event.preventDefault();
  }


});

//regex for credit card validation
const credit = $("#cc-num");
let regexCC = /^[0-9]{13,16}$/;
$("fieldset input#cc-num").after('<p id="ccError">Please enter a number that is between 13 and 16 digits long.</p>');
$("fieldset input#cc-num").after('<p id="ccError1">Please enter a credit card number.</p>');
const ccError = $('#ccError');
const ccError1 = $('#ccError1');
ccError.css("color", "red");
ccError.hide();
ccError1.css("color", "red");
ccError1.hide();
$('#cc-num').on("keydown", function(){
  creditErrorTest();
});

//regex for zip code validation
const zip = $("#zip");
let regexZip = /^[0-9]{5,5}$/;
$("fieldset input#zip").after('<p id="zipError">Please enter a valid zip code.</p>');
const zipError = $('#zipError')
zipError.css("color", "red");
zipError.hide();
$('#zip').on("keyup", function(){
  zipErrorTest();
});

//regex for cvv validation
const cvv = $("#cvv");
let regexCvv = /^[0-9]{3,3}$/;
$("fieldset input#cvv").after('<p id="cvvError">Please enter a cvv</p>');
const cvvError = $('#cvvError')
cvvError.css("color", "red");
cvvError.hide();
cvv.on("keyup", function(){
  cvvErrorTest();
});
