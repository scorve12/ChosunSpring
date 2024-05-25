<?php
	include $_SERVER['DOCUMENT_ROOT']."/db_con.php";
   
	$bno = $_GET['idx'];
	$sql = mc("SELECT * from inform_board_table where idx='$bno';");
	$board = $sql->fetch_array();
 ?>
<!doctype html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>

</head>
<body>
    <div id="board_write">
        <h1><a href="inform_board.php">공지사항</a></h1>
        <h4>글을 수정합니다.</h4>
            <div id="write_area">
                <form action="inform_board_modify_ok.php?idx=<?php echo $bno; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
                    <div id="in_title">
                        <textarea name="title" id="utitle" rows="1" cols="55" placeholder="제목" maxlength="100" required><?php echo $board['title']; ?></textarea>
                    </div>
                    <div class="wi_line"></div>
                    <div id="in_content">
                        <textarea name="content" id="ucontent" placeholder="내용" required><?php echo $board['content']; ?></textarea>
                    </div>
                    <input type="hidden" name="prev_file" value="<?php echo $prev_file; ?>">
                    <p><input class=file id="input-file" type=file name=file></p>
                    <div class="bt_se">
                        <button type="submit">수정하기</button>
                    </div>
                </form>
            </div>
        </div>
    </body>
</html>