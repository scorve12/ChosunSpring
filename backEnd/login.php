<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <script src="https://www.google.com/recaptcha/api.js"></script>
</head>
<body>
    <div align='center'>
        <span>
            <p style="font-size: 25px;"><b>로그인</b></p>
        </span>

        <form method='post' action='login_action.php'>
            <p><b>I &nbsp;D &nbsp;</b><input name="id" type="text" id="id"></p>
            <p><b>PW &nbsp;</b><input name="pw" type="password" id="pw"></p>
            <br />&nbsp;
            <input type="submit" class="g-recaptcha" data-sitekey="6LfRnskpAAAAAKRUJA7W8CPmtS_FdTrH71BHTsPA" data-callback='onSubmit' value="로그인">&nbsp;&nbsp;
        </form><br />
        <button id="register" onclick="location.href='./register.php'">회원가입</button>

    </div>

    <script>
        function onSubmit(token) {
            document.forms[0].submit();
        }
    </script>
</body>

</html>