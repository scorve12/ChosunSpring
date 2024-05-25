<?php
include $_SERVER['DOCUMENT_ROOT']."/db_con.php";
include 'config.php';
$rno = $_POST['rno']; //댓글 번호 
$sql = mc("SELECT * from qna_board_comment_table where idx='".$rno."'");//reply테이블에서 idx가 rno변수에 저장된 값을 찾음
$reply = $sql->fetch_array();

$bno = $_POST['b_no']; // 게시글 번호
$sql2 = mc("SELECT * from qna_board_table where idx='".$bno."'");//board테이블에서 idx가 bno변수에 저장된 값을 찾음
$board = $sql2->fetch_array();

$user_role = $_SESSION['role'];
// 게시글의 주인인지 확인
$is_comment_owner = ($reply['userid'] == $_SESSION['userid']);

// 관리자인지 확인
$is_admin = ($user_role == 'ADMIN');

if ($is_admin || $is_comment_owner) {
    mc("DELETE FROM qna_board_comment_table WHERE idx='$rno'");
    ?>
    <script type="text/javascript">alert('댓글이 삭제되었습니다.'); location.replace("qna_board_detail.php?idx=<?php echo $board["idx"]; ?>");</script>
    <?php
} else {
    ?>
    <script type="text/javascript">alert('삭제 권한이 없습니다.'); history.back();</script>
    <?php
}
?>






