/*
NTB Database js file, that connects to Ajax library;
javascript/AjaxLibrary/downloadHTML.js

Hanif Adedotun 2020
*/

//Module 1
//Display the main table Directive by requesting from the PHP table
var body = document.getElementsByTagName("body");
body.onload = getTable();

function getTable(){ //sends request to the database and waits for response
    downloadHTML('../NTB Databse/database.php?document=table', function(result){
        var table = document.getElementById('tableResult');
        table.innerHTML = result; //render result to html
        
    });

}

//Module 2
/*
function to edit the table, and validate it on the client side, 
and the server side.

var Table = document.getElementsByTagName("Table");
Table.focusout = editTable();

*/

//Module 3
//Function to Delete a field from the table (directive), edit the functions later

function delTable(){
    var con = confirm("Are you sure you want to delete this field?");
    if (con == true){
        downloadHTML('../NTB Databse/database.php?document=delete', function(result){
            var span = document.getElementById('error');
            span.innerHTML = result;
        });
    } else{
        alert("Good Descision"); 
    }
}

//Module 4
//Function to add a new record to the database


//check error here
function addRecord(){
var inputadd = document.getElementById("addF");
document.getElementById('newTable').classList.add('addoverflow');//Add srollbar to new table

const addField = document.getElementById('addField');//button for add field

var addLocation = document.querySelector(".tables");//select the table

inputadd.style.display = '';
inputadd.classList.remove('hidden');
//addLocation.innerHTML = addLocation; //add a row to it
console.log('Opened add fields.');
addField.disabled = true; //disable the button after press

//document.querySelector('.addval').onkeyup = 
}

//Validationg each input against the main validator
function alertDOM(){
    var input = document.getElementsByClassName('addval');
    var tester = false;

    console.log(input.type + ' ' + input[2]);
 
    console.log(input);
    console.log(input.lenght);
      

if (!(input.value == '')){ //check if an input is not empty
   if (input.type == 'text'){
      if (input.name == "meetingNumber" && input.length < 6){
           tester = true;
      }  else if(input.length < 9){
        tester = true;
      }
      else{
          tester = false;
        document.getElementById('error').innerHTML = '<b>Enter a valid text</b>';
      }
   }
   else if (input.type == 'number'){
     if (input.name ==' keyNumber' && input.length < '128'){
        tester = true;
     }
     else if (input.length < '9'){
        tester = true;
     }else{
         tester = false;
        document.getElementById('error').innerHTML = '<b>Enter a valid number</b>';
      }

   }
   else if (input.type == 'date'){
    if (input.length < '9'){
        tester = true;
    }else{
        tester = false;
        document.getElementById('error').innerHTML = '<b>Enter a valid date</b>';
      }
   }
}else{
    tester = false;
    document.getElementById('error').innerHTML = '<b>Do not leave any field empty</b>';
}
return tester;
}


//Upload data values
function uploadValues(){
    alertDOM();
    if (tester == true){
    console.log('Talking to the server...');
    downloadHTML('../NTB Databse/database.php?document=addvalue', function(result){
        var span = document.getElementById('error');//check display option later
        span.innerHTML = result;
    });
}else{
    document.getElementById('error').innerHTML = '<b>Enter a value</b>';
}
}


