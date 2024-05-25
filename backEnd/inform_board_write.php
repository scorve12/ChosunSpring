<!doctype html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
</head>
<body>
    <div id="board_write">
        <h1><a href="/">공지사항</a></h1>
        <h1>글 작성</h1>
            <div id="write_area">
            <form method="post" action="inform_board_write_action.php" enctype="multipart/form-data" autocomplete="off">
                 <p><input class=textform type=text size=25 name=title placeholder="제목" required></p>
                 <p><textarea class=textform cols=35 rows=15 name=content placeholder="내용을 입력하세요."></textarea></p>
                 <p><input class=file id="input-file" type=file name=file></p>
                 <p><input class=write type="submit" value="글쓰기"></p>
             </form>
            </div>
        </div>
    </body>
</html>
