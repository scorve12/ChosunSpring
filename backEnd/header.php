<?php
	include $_SERVER['DOCUMENT_ROOT']."/db_con.php";
	include 'config.php';
	
    if (isset($_SESSION['userid'])) {
    ?><b><?php echo $_SESSION['userid']; echo $role; ?></b>님 반갑습니다.
        <button onclick="location.href='./logout_action.php'" style="float:right; font-size:15.5px;">로그아웃</button>
        <br />
    <?php
    } else {
    ?>
        <button onclick="location.href='./login.php'" style="float:right; font-size:15.5px;">로그인</button>
        <br />
    <?php
    }
    ?>