<?php
include $_SERVER['DOCUMENT_ROOT'] . "/header.php";

// 사용자가 입력한 검색어와 검색 조건을 받아옴
$keyword = $_GET['search'];
$search_option = $_GET['search_option'];

// 검색 조건에 따라 쿼리 생성
if ($search_option === 'title') {
  $sql = "SELECT * FROM inform_board_table WHERE title LIKE '%$keyword%'";
} elseif ($search_option === 'content') {
  $sql = "SELECT * FROM inform_board_table WHERE content = '$keyword'";
} elseif ($search_option === 'name') {
  $sql = "SELECT * FROM inform_board_table WHERE name LIKE '%$keyword%'";
} else {
  // 유효하지 않은 검색 조건인 경우 기본 쿼리를 실행
  $sql = "SELECT * FROM inform_board_table";
}?>

<h1>검색결과</h1>
<table class="list-table">
<thead>
    <tr>
        <th width="70">번호</th>
          <th width="500">제목</th>
          <th width="120">글쓴이</th>
          <th width="100">작성일</th>
          <th width="100">조회수</th>
      </tr>
  </thead> <?php

// 쿼리 실행
$result = mysqli_query($db, $sql);

// 검색 결과 출력
if (mysqli_num_rows($result) > 0) {
while ($board = mysqli_fetch_assoc($result)) {
    $title = $board["title"];
    if (strlen($title) > 30) {
      $title = mb_substr($title, 0, 30, "utf-8") . "...";
    } ?>
<tbody>
<tr class="list_board">
<td width="70"><?php echo $board['idx']; ?></td> 
<td width="500"><a href="inform_board_detail.php?idx=<?php echo $board["idx"];?>"><?php echo $title;?></a></td>
<td width="120"><?php echo $board['name']?></td>
<td width="100"><?php echo $board['view']; ?></td>
<td width="100"><?php echo $board['like_count']; ?></td>
</tr>
</tbody>
</table>
<?php
}
} else {
echo "검색 결과가 없습니다.";
}
?>

<style>
  .list_board{
    text-align: center;
  }

/* 버튼 스타일링 */
#button_area {
  display: flex;
  margin-bottom: 10px;
}

.sort-btn {
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 5px;
  background-color: #f1f1f1;
  border: none;
  cursor: pointer;
}

.sort-btn span {
  margin-right: 5px;
}

.sort-btn:hover {
  background-color: #ddd;
}

/* 테이블 영역과 버튼 영역을 나란히 표시 */
.list-table {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
}
</style>