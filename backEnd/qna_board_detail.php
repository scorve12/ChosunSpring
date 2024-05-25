<?php
	include $_SERVER['DOCUMENT_ROOT'] . "/header.php";
?>
<!doctype html>
<head>
<meta charset="UTF-8">
<title>자유게시판</title>
    <!-- jQuery 라이브러리 로드 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- jQuery UI 라이브러리 로드 -->
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="common.js"></script>
</head>
<body>
	<?php
		function is_user_logged_in() {
			// 로그인 상태를 체크
			return isset($_SESSION['userid']);
		}

		function is_user_admin() {
			return ($_SESSION['role'] == 'ADMIN');
		}
		
		
		// 로그인이 안 되어 있으면 경고창
		if (!is_user_logged_in()) { ?>
			<script>
            	alert("로그인이 필요한 페이지입니다.");
            	history.back(); 
        	</script>
		
        
		<?php
		}
		// 로그인한 경우 데이터 불러옴.
		$bno = $_GET['idx']; /* bno함수에 idx값을 받아와 넣음*/

		// 조회수 갱신
		if (!isset($_COOKIE['hit_count_' . $bno])) {
			setcookie('hit_count_' . $bno, time(), time() + 3600, '/'); // 1시간 후에 쿠키 만료
			$hit = mysqli_fetch_array(mc("SELECT view FROM qna_board_table WHERE idx ='".$bno."'"));
			$new_hit = $hit['view'] + 1;
			mc("UPDATE qna_board_table SET view = '".$new_hit."' WHERE idx = '".$bno."'");
		}

		$hit = mysqli_fetch_array(mc("SELECT * from qna_board_table where idx ='".$bno."'"));
		$sql = mc("SELECT * from qna_board_table where idx='".$bno."'"); /* 받아온 idx값을 선택 */
		$board = $sql->fetch_array();

		

		// 답변글 작성 여부를 확인하는 함수
		function has_reply($board_id) {
			global $db;
			
			// SQL 쿼리로 해당 게시물의 댓글 개수를 세기 위해 조인과 GROUP BY 사용
			$sql = "SELECT COUNT(*) AS comment_count
					FROM qna_board_comment_table
					WHERE board_idx = $board_id";
			
			// 쿼리 실행
			$result = mysqli_query($db, $sql);
			
			// 결과 가져오기
			$row = mysqli_fetch_assoc($result);
			$comment_count = $row['comment_count'];
			
			// 댓글 개수가 0보다 크면 true 반환, 아니면 false 반환
			return ($comment_count > 0);
		}

		$has_reply = has_reply($bno);

        if ($board['lock_post'] == 1 && !is_user_admin() && $_SESSION['userid'] != $board['name']) {
            ?>
            <script>
                alert("해당 글은 잠금 상태입니다. 관리자 또는 글 작성자만 열람할 수 있습니다.");
                history.back();
            </script>
            <?php
            exit;
        }

	?>
<!-- 글 불러오기 -->
<div id="board_read">
	<h2>제목 <?php echo $board['title']; ?></h2>
		<div id="user_info">
			<?php echo $board['title']; ?>
				<div id="bo_line"></div>
			</div>
			<div id="bo_content">
				<?php echo nl2br("$board[content]"); ?>
			</div>
			<div class=middle>
			<?php if (!empty($board['file'])): ?>
				<p class="file">첨부파일 : <a href="file/upload/<?=$board['file'];?>" download><?=$board['file'];?></a></p>
			<?php endif; ?>
			</div>
	<!-- 수정, 삭제 -->
	<div id="bo_ser">
        <ul>
            <li><a href="/">메인화면</a></li>
            <?php
                // 로그인한 사용자만 게시물을 읽을 수 있도록 체크
                if (is_user_logged_in()) {
                    // 일반 사용자인 경우
                    if (!is_user_admin() && $_SESSION['userid'] == $board['name']) {
                        // 답변글이 있는지 확인
                        $has_reply = has_reply($bno);
            ?>
                        <!-- 일반유저인 경우 자신글에 대한 수정, 삭제 가능 -->
                        <?php if (!$has_reply) : ?>
                            <li><a href="qna_board_modify.php?idx=<?php echo $board['idx']; ?>">수정</a></li>
                        <?php else : ?>
                            <li><a href="#" onclick="showModiAlert()">수정</a></li>
                        <?php endif; ?>
                        <?php if ($has_reply) : ?>
                            <li><a href="#" onclick="showDelAlert()">삭제</a></li>
                        <?php else : ?>
                            <li><a href="qna_board_delete.php?idx=<?php echo $board['idx']; ?>">삭제</a></li>
                        <?php endif; ?>
                <?php } ?>
            </ul>
        <?php } ?>
    </div>
	<!-- 댓글 기능 -->
	<div class="reply_view">
	<h3>답변 목록</h3>
		<?php
			// 댓글주인인지
			$is_comment_owner = ($reply['userid'] == $_SESSION['userid']);
		
			$sql3 = mc("SELECT * from qna_board_comment_table where board_idx='$bno' ORDER BY idx DESC");
			while($reply = $sql3->fetch_array()){ 
		?>
		<div class="dap_lo">
					<div><b><?php echo $reply['mb_id']; ?></b></div>
			<?php if ($reply['content'] !== '삭제된 댓글입니다') { ?>
				<div class="dap_to comt_edit"><?php echo nl2br($reply['content']); ?></div>
				<?php if (is_user_admin() || $is_comment_owner) { ?>
					<div class="rep_me rep_menu">
						<a class="dat_edit_bt" href="#">수정</a>
						<a class="dat_delete_bt" href="#">삭제</a>
					</div>
				<?php } ?>
			<?php } else { ?>
				<div class="dap_to comt_edit">삭제된 댓글입니다</div>
			<?php } ?>
			<!-- 댓글 수정 폼 dialog -->
			<div class="dat_edit">
				<form method="post" action="qna_board_comment_modify.php">
					<input type="hidden" name="rno" value="<?php echo $reply['idx']; ?>" /><input type="hidden" name="b_no" value="<?php echo $bno; ?>">
					<textarea name="content" class="dap_edit_t"><?php echo $reply['content']; ?></textarea>
					<input type="submit" value="수정하기" class="re_mo_bt">
				</form>
			</div>
			<!-- 댓글 삭제 비밀번호 확인 -->
			<div class='dat_delete'>
				<form action="qna_board_comment_delete.php" method="post">
					<input type="hidden" name="rno" value="<?php echo $reply['idx']; ?>" /><input type="hidden" name="b_no" value="<?php echo $bno; ?>">
			 		<p><input type="submit" value="확인"></p>
				 </form>
			</div>
		</div>
	<?php } ?>

<!-- 댓글 입력 폼 -->
	<div class="dap_ins">
		<?php if (!is_user_admin()) : ?>
			<p>답변글은 관리자만 작성할 수 있습니다.</p>
		<?php else : ?>
			<form action="qna_board_comment_ok.php?idx=<?php echo $bno; ?>" method="post">
				<div style="margin-top:10px; ">
					<textarea name="content" class="reply_content" id="re_content" ></textarea>
					<button id="rep_bt" class="re_bt">댓글</button>
				</div>
			</form>
		<?php endif; ?>
	</div>
</div><!--- 댓글 불러오기 끝 -->
</div>
</body>
</html>

<style>
	.reply_view {
	width:900px;
	margin-top:100px; 
	word-break:break-all;
}
.dap_lo {
	font-size: 14px;
	padding:10px 0 15px 0;
	border-bottom: solid 1px gray;
}
.dap_to {
	margin-top:5px;
}
.rep_me {
	font-size:12px;
}
.rep_me ul li {
	float:left;
	width: 30px;
}
.dat_delete {
	display: none;
}	
.dat_edit {
	display:none;
}
.dap_sm {
	position: absolute;
	top: 10px;
}
.dap_edit_t{
	width:520px;
	height:70px;
	position: absolute;
	top: 40px;
}
.re_mo_bt {
	position: absolute;
	top:40px;
	right: 5px;
	width: 90px;
	height: 72px;
}
#re_content {
	width:700px;
	height: 56px; 
}
.dap_ins {
	margin-top:50px;
}
.re_bt {
	position: absolute;
	width:100px;
	height:56px;
	font-size:16px;
	margin-left: 10px; 
}
#foot_box {
	height: 50px; 
}

ul {
    list-style: none; /* 기본 순서 없는 목록 스타일 제거 */
    padding: 0; /* 내부 패딩 제거 */
    margin: 0; /* 외부 마진 제거 */
    display: flex; /* 요소들을 가로로 나열 */
}

li {
	margin-right: 10px;
}
	
</style>

<script>
    function showDelAlert() {
        alert("답변글이 달린 상태이므로 삭제할 수 없습니다.");
    }
	function showModiAlert() {
        alert("답변글이 달린 상태이므로 수정할 수 없습니다.");
    }
</script>