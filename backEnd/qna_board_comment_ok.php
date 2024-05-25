<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/db_con.php";
    include 'config.php';

$bno = $_GET['idx']; // 게시글 번호

if (isset($_SESSION['userid']) && $bno && $_POST['content']) {
    try {
        $sql = mc("INSERT into qna_board_comment_table(board_idx, mb_id, content) VALUES('" . $bno . "','" . $_SESSION['userid'] . "','" . $_POST['content'] . "')");
        echo "<script>alert('댓글이 작성되었습니다.'); location.href='qna_board_detail.php?idx=$bno';</script>";
    } catch (Exception $e) {
        // 예외 처리 블록: 오류 발생 시 실행되는 코드
        echo "댓글 작성에 실패했습니다: " . $e->getMessage();
    }
} else {
    echo "<script>alert('댓글 작성에 실패했습니다.'); history.back();</script>";
}
?> 