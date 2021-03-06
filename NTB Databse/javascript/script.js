/*
NTB Database js file, that connects to Ajax library;
javascript/AjaxLibrary/downloadHTML.js

Hanif Adedotun 2020
*/


// This loads all the functions after the DOM loads
window.onload = getTable(), showTime(), localget();



//Module to show current time //check for error in the Totaltime;
function showTime() {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var meridian;


    if (currentHour >= 12 && currentHour < 24) { //if its betweeen 12pm and 12am, the meridian changes
        currentHour = currentHour - 12;
        if (currentHour == '0') { //if it is noon the hour changes to 12pm
            currentHour = '12';
        }
        meridian = 'pm';
    } else {
        meridian = 'am';
    }

    //console.log(currentMinute);

    if (currentMinute < 10) { //if the seconds is less than 10, it adds 0 at the begining of the minute value
        currentMinute = '0' + currentMinute; //addition of 0, check for error later 

    }
    var Totaltime = currentHour + ':' + currentMinute + ' ' + meridian;
    toString(Totaltime);

    console.log(Totaltime);
    document.querySelector('#showtime').innerHTML = '<b>' + Totaltime + '</b>';

    setTimeout(function() {
        showTime();
    }, 15000); //update after every 15 seconds

}



//Module 1
//Display All the tables by requesting from MySQL using PHP server

function getTable() { //sends request to the database and waits for response
    for (let index = 1; index < 5; index++) { //Assumed number of tables is 4
        downloadHTML('../NTB Databse/database.php?document=table' + index, function(result) { //Directive Table
            var table = document.getElementById('tableResult' + index);
            table.innerHTML = result; //render result to html

        });

    }

}



//Module 2
/*
function to edit the table, and validate it on the client side, 
and the server side.

var Table = document.getElementsByTagName("Table");
Table.focusout = editTable();

*/


//Module 3
//Function to add a new record to the database


//check error here
function addRecord(tableIDV, divTable, buttonID) {

    tableID = document.getElementById(tableIDV);
    divTable.classList.add('addoverflow'); //Add srollbar to new table

    tableID.style.display = '';
    tableID.classList.remove('hidden'); //show table

    //addLocation.innerHTML = addLocation; //add a row to it
    console.log('Opened table ' + tableIDV + ' fields.');

    document.getElementById(buttonID).disabled = true; //disable the button after press


    //To render the SBU/CSU options to the upload values, from the values in the database table SBU/CSU

    if (tableIDV == 'addF') { //If it is the first table
        downloadHTML('../NTB Databse/database.php?document=SBUoptions', function(result) { //Directive Table
            var table = document.getElementById('sbuOptions');
            table.innerHTML = result; //render result to html

        });
    } else if (tableIDV == 'addF2') { //If it is the second table
        downloadHTML('../NTB Databse/database.php?document=SBUoptions', function(result) { //SBU/CSU Table
            var table = document.getElementById('sbuOptions2');
            table.innerHTML = result; //render result to html

        });
    }
}

//Validating each input against the main validator
var tester; //global test value 

function alertDOM(error, inputClassName) {
    var input = document.getElementsByClassName(inputClassName);


    Array.from(input).forEach(function(element, index, array) {
        tester = false;

        console.log(element.value); //name of value of element
        // console.log(element.name);//name of element
        console.log(element.type); //type of element
        //console.log(element.className);  


        //check if an input checks the length validation
        if (element.type == 'text') { //if input is a text
            if (element.value.length < 120) {
                tester = true;
                error.innerHTML = '';


            } else {
                tester = false;
                error.innerHTML = '<b>Enter a valid text</b>';
            }
        } else if (element.type == 'number') { //if input is a number
            if (element.value.length < 9) {
                tester = true;
                error.innerHTML = '';

            } else {
                tester = false;
                error.innerHTML = '<b>Enter a valid number</b>';
            }

        } else if (element.type == 'date') { //if input is a date
            toString(element.value);
            console.log(element.value);
            if (element.value.length < 11) {
                tester = true;
                error.innerHTML = '';

            } else {
                tester = false;
                error.innerHTML = '<b>Enter a valid date</b>';

            }
        } else if (element.type == 'select-one') {
            if (element.value != '') {
                tester = true;
                error.innerHTML = '';
                console.log(element.value + ' is selected.');
            } else {
                tester = false;
                error.innerHTML = '<b>Enter a valid option</b>';
            }
        } else {
            tester = false;
        }

        return tester;
    });
}


//Upload data values to the server
function uploadValues(formElem, databasename) {
    if (tester == true) {
        console.log('Talking to the server...');

        var newdbname = document.getElementById(databasename).firstElementChild.id; //get form element id then returns the id of the child element which is H2 id

        var dataF = new FormData(formElem); //create a form array list to send to the server
        dataF.append('DatabaseName', newdbname); //appends the name of the database and sends it to the validor to check for the database to add to
        console.log(newdbname);


        downloadHTMLPost('../NTB Databse/uploadData.php', dataF, function(result) {

            //spanresult.innerHTML = result; //if an error occur from the database or any reply from the database

            if (result.includes('Added')) {
                alert(result); //Displays the result in an alert form
                location.reload();
            } else {
                //if an error occur from the database or any reply from the database

                var error_span = document.createElement('p'); //create element for error
                error_span.classList.add('derror'); //adds the error class
                var span_error = document.getElementById(databasename).parentElement.appendChild(error_span); //parent element to add error element
                console.log(result);
                span_error.append(result); //append result from database

            }

        });
    } else {
        var error_span = document.createElement('p'); //create element for error
        error_span.classList.add('derror'); //adds the error class
        var span_error = document.getElementById(databasename).parentElement.appendChild(error_span); //parent element to add error element
        span_error.append('One or more fields are without values. Input values!'); //append result from database
    }


}

//Module 3
//Function to Delete a field from the table (directive)


function delTable(value, databasename) {

    var con = confirm("Are you sure you want to delete this field?");
    if (con == true) {
        console.log('Deleting value...');

        downloadHTML('../NTB Databse/database.php?document=delete&database=' + databasename + '&deletekey=' + value + '', function(result) {

            if (result.includes('Succesfully Deleted!')) {
                alert(result);
                location.reload();
            } else {
                var error_span = document.createElement('p'); //create element for error
                error_span.classList.add('derror'); //adds the error class
                var span_error = document.getElementById(databasename).parentElement.appendChild(error_span); //parent element to add error element
                span_error.append(result); //append result from database
            }

        });

    } else {
        alert("Okay");
    }
}

//**Note Module is not more avbailable */

//Extra Module for localstorage
// function localstore(nameID) { //To set the Value
//     var elem = document.getElementById(nameID).value;
//     //alert(elem);
//     console.log(elem);

//     if (window.localStorage) {
//         window.localStorage.setItem('name', elem);
//         console.log('The value has been set');
//     }

// }

// function localget() { //To get value after it has been set 
//     if (window.localStorage) {
//         var valueGet = window.localStorage.getItem('name');
//         var location = document.getElementById('location');

//         if (valueGet == null) {
//             location.value = location.firstElementChild.value;
//             console.log('options are empty');
//         } else {
//             location.value = valueGet;
//             console.log(valueGet);
//             // window.localStorage.clear('name');
//         }
//     }
// }