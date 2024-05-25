<?php
include $_SERVER['DOCUMENT_ROOT']."/db_con.php";
session_start();

// 이메일 인증 처리
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 사용자가 인증 코드를 입력한 경우

    // 사용자가 입력한 인증 코드를 가져옴
    $verification_code_input = $_POST['verification_code'];

    // 세션에 저장된 이메일 주소와 인증 코드를 가져옴
    $verification_code = $_SESSION['verification_code'];

    // 세션에 저장된 회원가입 폼 
    $id = $_SESSION['id'];
    $pw = $_SESSION['pw'];
    $nickname = $_SESSION['nickname'];
    $email = $_SESSION['user_email'];

    // 사용자가 입력한 인증 코드와 세션에 저장된 인증 코드를 비교하여 인증 여부를 확인
    if ($verification_code_input === $verification_code) {
        // 인증 코드가 일치하는 경우, 이메일 인증이 성공적으로 완료됨
        // 여기에서는 인증 여부를 데이터베이스에 저장하거나, 다음 단계로 진행할 수 있도록 처리할 수 있습니다.

        $query = "INSERT INTO member_table(mb_id, mb_pw, mb_nickname, mb_email) VALUES('$id', '$pw', '$nickname', '$email')";
        $result = mc($query);
        // 인증이 완료되면 세션에서 사용자 이메일과 인증 코드를 제거
        unset($_SESSION['user_email']);
        unset($_SESSION['verification_code']);
        unset($_SESSION['id']);
        unset($_SESSION['pw']);
        unset($_SESSION['nickname']);
        mysqli_close($db);

        ?><script>
            alert('회원가입에 성공하였습니다.');
            location.replace("./login.php");
        </script> <?php
    } else {
        ?><script>
        alert('인증코드를 다시 입력해주세요');
        </script> <?php
    }
}
?>

<!-- 이메일 인증 폼 -->

<div align="center">
        <span>
            <p style="font-size: 25px;"><b>이메일 인증</b></p>
        </span>

        <form method='post' action=''>
            <p><b>인증 코드 : &nbsp;</b><input name="verification_code" type="text" required></p>
            <br />
            <input type="submit" value="인증 확인">
        </form>
</div>