<?php 

      include 'header.php';

      function is_user_logged_in() {
        return isset($_SESSION['userid']);
      }

      function is_user_admin() {
        return ($_SESSION['role'] == 'ADMIN');
    }
      
      // 정렬
      $sort = isset($_GET['sort']) ? $_GET['sort'] : 'idx';
      
      // sql 정렬
      function get_sort_query($sort) {
        $query = "SELECT * FROM inform_board_table";
      
        $query .= " ORDER BY ";
      
        if ($sort === 'view') {
          $query .= "view DESC";
        } else {
          $query .= "idx DESC";
        }
      
        return $query;
      }
      
      $sql = get_sort_query($sort);
      $result = mc($sql);
      ?>

<!doctype html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"></script>
</head>
<body>
<div id="board_area"> 
  <h1>공지사항</h1>
  <div id="button_area">
    <button class="sort-btn" data-sortby="idx"><span>&darr;</span> 순번순</button>
    <button class="sort-btn" data-sortby="view"><span>&darr;</span> 조회순</button>
  </div>
    <table class="list-table">
      <thead>
          <tr>
              <th width="70">번호</th>
                <th width="500">제목</th>
                <th width="120">글쓴이</th>
                <th width="100">조회수</th>
            </tr>
        </thead>
        <?php
            while ($board = $result->fetch_array()) {
              $title = $board["title"];
              if (strlen($title) > 30) {
                $title = str_replace($board["title"], mb_substr($board["title"], 0, 30, "utf-8") . "...", $board["title"]);
              }
        ?>
      <tbody>
        <tr class="list_board">
          <td width="70"><?php echo $board['idx']; ?></td> 
          <td width="500"><a href="inform_board_detail.php?idx=<?php echo $board["idx"];?>"><?php echo $title;?></a></td>
          <td width="120"><?php echo $board['name']?></td>
          <td width="100"><?php echo $board['view']; ?></td>
        </tr>
      </tbody>
      <?php } ?>
    </table>
    <div id="write_btn">
      <?php
      if (is_user_admin()) {
        ?>
      <a href="inform_board_write.php"><button>글쓰기</button></a>
      <?php } ?>
    </div>
  </div>
  <div id="search_box">
    <form action="inform_board_search.php" method="get">
      <select name="search_option">
        <option value="title">제목</option>
        <option value="name">작성자</option>
        <option value="content">내용</option>
      </select>
      <input type="text" name="search" size="40" required="required" /> <button>검색</button>
    </form>
    </div>
    <a href="index.php"><button>메인화면으로</button></a>
</body>
</html>

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

<script>
$(document).ready(function() {
  // 변수 초기화
  var currentSortBy = "idx"; // 기본 정렬 기준은 "순번순"
  var currentSortDir = "desc"; // 기본 정렬 방식은 내림차순

  $(".sort-btn").click(function() {
    var sortBy = $(this).data("sortby");

    // 정렬 기준이 변경되었을 경우, 정렬 방식을 초기화하고 오름차순으로 변경
    if (currentSortBy !== sortBy) {
      currentSortBy = sortBy;
      currentSortDir = "asc";
    } else {
      // 정렬 기준이 이미 선택된 경우, 정렬 방식을 토글
      currentSortDir = currentSortDir === "asc" ? "desc" : "asc";
    }

    // 정렬 방식에 따라 화살표 모양 변경
    $(".sort-btn").find("span").html("&darr;");
    if (currentSortDir === "asc") {
      $(this).find("span").html("&uarr;");
    } else {
      $(this).find("span").html("&darr;");
    }

    // Redirect to the sorted URL
    window.location.href = "inform_board.php?sort=" + currentSortBy + "&sortdir=" + currentSortDir;
  });
});

</script>