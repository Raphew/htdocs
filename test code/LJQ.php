<?php
require_once 'login.php';
$conn = new mysqli($db_hostname, $db_username, $db_password);
if ($conn->connect_error) die('Error Loading Database');

mysqli_select_db($conn, $db_database) or die("Unable to select database: " . mysqli_error());

/**/
echo <<<_END
<html>
<head><title>Database with PHP and Mysql</title></head>
<body>
<form action='LJQ.php' method='post'>
<span>Enter Username: <input type='text' name='user'></span><br>
<span>Enter Password: <input type='password' name='pass'></span><br>
<input type='submit' value='Enter'><br>
</form>
</body>
</html>
_END;




if ((isset($_POST['user']) && isset($_POST['pass'])) && !($_POST['user']=='' || $_POST['pass']=='')){
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $query = "INSERT INTO users VALUES" . "('$username', '$password')";
    $result = $conn->query($query);
   if(!$result){
    echo'Error writing to database<br>';
}
   else{
      echo'succssfully updated databse<br>';
}
}else{
    echo'Enter username or/and password<br><br>';
    
}

$query2 = "SELECT * FROM users";
   $result = $conn->query($query2);
   if (!$result) die("Fatal Error<br>");

$rows = $result->num_rows;
for($i=0; $i<$rows; ++$i)
{
    $row = $result->fetch_array(MYSQLI_ASSOC);

    echo 'Username: '.htmlspecialchars($row['Username']).'<br>';
    echo 'Password: '.htmlspecialchars($row['Password']).'<br><br>';
}
if (isset($_POST['delpass'])){
$deletepassword = $_POST['delpass'];
$delete = "DELETE FROM users WHERE Password='$deletepassword'";
$result = $conn->query($delete);
if(!$result){
 echo'Error deleting User<br>';
}
else{
   echo'Successfully deleted<br>';
}
} else
echo'Enter password to delete';

echo <<<_END
<form action='LJQ.php' method='post'>
<span> Delete User from password</span><br>
<span>Password: <input type='text' name='delpass'></span>
<input type='submit' value='Delete User'>
</form>
_END;


?>