<?php
    session_start();
    if (isset($_SESSION["userid"])) {
            $userid = $_SESSION["userid"];
    }else{
        $userid = "";
    } if(isset($_SESSION["role"])){
        $role = $_SESSION["role"];
    }else{
        $role = "";
    }


?>