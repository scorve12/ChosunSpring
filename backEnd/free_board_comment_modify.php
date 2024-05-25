<?php
    include $_SERVER['DOCUMENT_ROOT']."/db_con.php";
    $rno = $_POST['rno'];//댓글번호
    $sql = mc("SELECT * from free_board_comment_table where idx='".$rno."'"); //reply테이블에서 idx가 rno변수에 저장된 값을 찾음
    $reply = $sql->fetch_array();

    $bno = $_POST['b_no']; //게시글 번호
    $sql2 = mc("SELECT * from free_board_table where idx='".$bno."'");//board테이블에서 idx가 bno변수에 저장된 값을 찾음
    $board = $sql2->fetch_array();

    $sql3 = mc("UPDATE free_board_comment_table set content= '".$_POST['content']."' WHERE idx = '".$rno."'");//reply테이블의 idx가 rno변수에 저장된 값의 content를 선택해서 값 저장
    ?> 
<script type="text/javascript">alert('수정되었습니다.'); location.replace("free_board_detail.php?idx=<?php echo $bno; ?>");</script>