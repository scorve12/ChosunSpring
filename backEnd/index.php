	<?php
		include 'header.php';
	?>
	<!DOCTYPE html>
	<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>강연준의 웹사이트</title>
	</head>
	<body>
		<div>
		<table class="list-table">
      <thead>
          <tr>
              <th width="100"><button onclick="location.href='./inform_board.php'">공지사항</button></th>
			  <th width="100"><button onclick="location.href='./free_board.php'">자유게시판</button></th>
			  <th width="100"><button onclick="location.href='./qna_board.php'">질문게시판</button></th>
            </tr>
        </thead>
		</table>
		</div>
		<form action="main_search.php" method="get">
      <select name="search_option">
        <option value="title">제목</option>
        <option value="name">작성자</option>
        <option value="content">내용</option>
      </select>
      <input type="text" name="search" size="40" placeholder="검색어를 입력하세요" required="required" /> <button type="submit">검색</button>
    </form>
	</body>
	</html>