<?php
include 'recordError.php';//function that cointains error file 

  $db_hostname = 'localhost';
  $db_database = 'ntb directive register';
  $db_username = 'raphew';
  $db_password = 'raphew.sql';
  
  $conn = new mysqli($db_hostname, $db_username, $db_password);
  
  mysqli_select_db($conn, $db_database) or die('<b class = "derror"> Unable to load Databse</b>');
    
  if($conn->connect_error){
    echo 'Cannot connect to Server, check connection' . mysqli_error();
    recordError(mysqli_error());//record error to error.log file
  }

?>
