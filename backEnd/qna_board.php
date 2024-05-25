<?php 

      include 'header.php';

      $is_user = ($_SESSION['userid'] && ($_SESSION['role'] == 'USER'));

      
      function is_user_admin() {
        return ($_SESSION['role'] == 'ADMIN');
    }
      
      // 정렬
      $sort = isset($_GET['sort']) ? $_GET['sort'] : 'idx';
      
      // sql 정렬
      function get_sort_query($sort) {
        $query = "SELECT * FROM qna_board_table";
      
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
<title>QnA</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.min.js"></script>
</head>
<body>
<div id="board_area"> 
  <h1>QnA</h1>
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
          <td width="500"><?php 
        $lockimg = "<img src='/img/lock.png' alt='lock' title='lock' with='20' height='20' />";
        if($board['lock_post']=="1")
          { ?><?php echo $lockimg;
           }?><a href="qna_board_detail.php?idx=<?php echo $board["idx"];?>"><?php echo $title; ?></a></td>
          <td width="120"><?php echo $board['name']?></td>
          <td width="100"><?php echo $board['view']; ?></td>
        </tr>
      </tbody>
      <?php } ?>
    </table>
    <?php
      if ($is_user) {
        ?>
    <div id="write_btn">
      <a href="qna_board_write.php"><button>글쓰기</button></a>
    </div> <?php } ?>
  </div>
  <div id="search_box">
    <form action="qna_board_search.php" method="get">
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

