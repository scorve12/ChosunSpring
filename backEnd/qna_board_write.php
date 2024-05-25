<!doctype html>
<head>
<meta charset="UTF-8">
<title>QnA게시판</title>
</head>
<body>
    <div id="board_write">
        <h1><a href="/">QnA게시판</a></h1>
        <h1>글 작성</h1>
            <div id="write_area">
            <form method="post" action="qna_board_write_action.php" enctype="multipart/form-data" autocomplete="off">
                 <p><input class=textform type=text size=25 name=title placeholder="제목" required></p>
                 <p><textarea class=textform cols=35 rows=15 name=content placeholder="내용을 입력하세요."></textarea></p>
                 <p><input class=file id="input-file" type=file name=file></p>
                 <input type="checkbox" value="1" name="lockpost" />해당 게시글을 비밀글로 작성합니다.
                 <p><input class=write type="submit" value="글쓰기"></p>
             </form>
            </div>
        </div>
    </body>
</html>
