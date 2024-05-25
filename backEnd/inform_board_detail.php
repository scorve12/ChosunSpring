<?php
	include $_SERVER['DOCUMENT_ROOT'] . "/header.php";
?>
<!doctype html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
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


		// 로그인한 경우 데이터 불러옴.
		$bno = $_GET['idx']; /* bno함수에 idx값을 받아와 넣음*/

		if (!isset($_COOKIE['hit_count_2' . $bno])) {
			setcookie('hit_count_2' . $bno, time(), time() + 3600, '/'); // 1시간 후에 쿠키 만료
			$hit = mysqli_fetch_array(mc("SELECT view FROM inform_board_table WHERE idx ='".$bno."'"));
			$new_hit = $hit['view'] + 1;
			mc("UPDATE inform_board_table SET view = '".$new_hit."' WHERE idx = '".$bno."'");
		}
		$hit = mysqli_fetch_array(mc("SELECT * from inform_board_table where idx ='".$bno."'"));
		$sql = mc("SELECT * from inform_board_table where idx='".$bno."'"); /* 받아온 idx값을 선택 */
		$board = $sql->fetch_array();

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
				if (is_user_admin()) {
					// 일반 사용자인 경우
					if ($_SESSION['userid'] == $board['name']) { ?>
						<!-- 일반유저인 경우 자신글에 대한 수정, 삭제 가능 -->
						<li><a href="inform_board_modify.php?idx=<?php echo $board['idx']; ?>">수정</a></li>
						<li><a href="inform_board_delete.php?idx=<?php echo $board['idx']; ?>">삭제</a></li>
					</ul><?php
				}
            }
			?>
	</div>
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