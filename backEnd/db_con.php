<?php
$db_host = "localhost";
$db_id = "padmin"; //padmin
$db_pw = "0914kk"; //0914kk
$db_name = "hacker_test";
$db=mysqli_connect($db_host, $db_id, $db_pw, $db_name);


function mc($sql){
    global $db;
    $result = $db->query($sql);
    if (!$result) {
        throw new Exception("데이터베이스 오류: " . $db->error);
    }
    return $result;
}
?>
