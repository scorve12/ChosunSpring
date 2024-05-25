<?php

include $_SERVER['DOCUMENT_ROOT']."/db_con.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require ('./phpmailer/src/PHPMailer.php');
require ('./phpmailer/src/Exception.php');
require ('./phpmailer/src/SMTP.php');

function generate_verification_code() {
    return sprintf("%06d", rand(000000, 999999));
}

function send_email_gmail ($user_email, $user_name, $subject, $content) {
    $USER		='gunner07050@gmail.com'; //보내는 사람 이메일
    $PASSWORD = 'fasxpfqnokuobqgq'; //비밀번호
   
    $mail = new PHPMailer(true);
    
    //Enable SMTP debugging.
    $mail->SMTPDebug = 3; // debug 표시 레벨
    //Set PHPMailer to use SMTP.
    $mail->isSMTP();
    //Set SMTP host name
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    //Set TCP port to connect to
    $mail->Port = 465;
    
    //Set this to true if SMTP host requires authentication to send email
    $mail->SMTPAuth = true;
    //Provide username and password
    $mail->Username = $USER;
    $mail->Password = $PASSWORD;
    $mail->SMTPKeepAlive = true;
    $mail->CharSet = "utf-8"; //이거 설정해야 한글 안깨짐
    //If SMTP requires TLS encryption then set it
    
    $mail->setFrom($USER,"관리자");
    // 이름은 적용이 되는데 메일 적용이 안되는데 네이버에서 막아놓음. 네이버는 아예 다른 메일이면 send가 실패함
    // 네이버에 별칭 추가 해야함. google이랑 마찬가지.
    $mail->addAddress($user_email, $user_name); //받는 사람    
    $mail->isHTML(true);
    
    $rand_num = sprintf("%06d",rand(000000,999999));
    
    $mail->Subject = $subject;
    $mail->Body = $content;
    $mail->AltBody = "";
    
    try {
        $mail->send();
    } catch (Exception $e) {
        // $rand_num = -1;
        return false;
    }
    // return $rand_num;
    return true;
}

// 회원가입 요청 처리
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    // 사용자가 회원가입 양식을 제출한 경우
    // id와 email 중복을 체크하며 존재하는 경우 뒤로가기
        $id = $_POST['id'];
        $pw = password_hash($_POST['pw'], PASSWORD_DEFAULT);
        $nickname = $_POST['nickname'];
        $user_email = $_POST['user_email'];

        $query1 = "SELECT * FROM member_table WHERE mb_id='$id'";
        $result1 = mc($query1);
        $count = mysqli_num_rows($result1);

        // EMAIL 중복 확인
        $query2 = "SELECT * FROM member_table WHERE mb_email='$user_email'";
        $result2 = mc($query2);
        $count2 = mysqli_num_rows($result2);
        if ($count) {      //만약 중복된 id가 있다면
        ?><script>
                alert('이미 존재하는 ID입니다.');
                history.back();
            </script>
            <?php } 
        else if($count2) {
            ?><script>
                alert('이미 존재하는 E-MAIL입니다.');
                history.back();
            </script>
        <?php } 


    // 이메일 인증 코드 생성
    $verification_code = generate_verification_code();

    // 이메일 발송
    $subject = '회원가입용 인증코드';
    $content = '인증코드는: ' . $verification_code;

    if (send_email_gmail($user_email, 'ADMIN', $subject, $content)) {
        // 이메일 발송 성공한 경우
        // 이메일 주소와 인증 코드를 세션에 저장하여 다음 단계로 전달
        $_SESSION['user_email'] = $user_email;
        $_SESSION['verification_code'] = $verification_code;

        $_SESSION['id'] = $id;
        $_SESSION['pw'] = $pw;
        $_SESSION['nickname'] = $nickname;
        // 이메일 인증 페이지로 리다이렉트
        header("Location: email_verification.php");
        exit();
    } else {
        // 이메일 발송 실패 시 처리
        echo '이메일 발송에 실패하였습니다.';
    }
}
?>

<!-- 회원가입 양식 -->
<!DOCTYPE html>
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<head>
    <meta charset='utf-8'>
    <title>회원가입</title>
    <script>
        function check_input() {
        if (!$('#id').val()) {
            alert("아이디를 입력하세요.");
            $("#id").focus();
            return;
        }
        if (!$('#pw').val()) {
            alert("비밀번호를 입력하세요.");
            $("#pw").focus();
            return;
        }
        if (!$('#nickname').val()) {
            alert("닉네임을 입력하세요.");
            $("#nickname").focus();
            return;
        }
        document.join.submit();
    }
    </script>
</head>
<body>
    <div align="center">
        <span>
            <p style="font-size: 25px;"><b>회원가입</b></p>
        </span>

        <form method='post' action=''>
            <p><b>I &nbsp;D &nbsp;</b><input name="id" id="id" type="text" ></p>
            <p><b>PW &nbsp;</b><input name="pw" id="pw" type="password" ></p>
            <p><b>NICKNAME &nbsp;</b><input name="nickname" id="nickname" type="text" ></p>
            <p><b>E-MAIL &nbsp;</b><input name="user_email" id="user_email" type="email" required></p>
            <br />
            <input type="submit" value="이메일 인증하기" onclick="check_input()">
        </form>
        </div>
</body>
<?php
