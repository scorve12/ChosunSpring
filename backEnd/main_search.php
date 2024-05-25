<?php
include $_SERVER['DOCUMENT_ROOT'] . "/db_con.php";

$keyword = $_GET['search'];
$search_option = $_GET['search_option'];

if ($search_option === 'title') {
    $sql = "SELECT idx, title, name, view, 'free_board' AS board_name FROM free_board_table WHERE title LIKE '%$keyword%'"
        . " UNION SELECT idx, title, name, view, 'qna_board' AS board_name FROM qna_board_table WHERE title LIKE '%$keyword%' AND lock_post = 0"
        . " UNION SELECT idx, title, name, view, 'inform_board' AS board_name FROM inform_board_table WHERE title LIKE '%$keyword%'";
} elseif ($search_option === 'content') {
    $sql = "SELECT idx, title, name, view, 'free_board' AS board_name FROM free_board_table WHERE content LIKE '%$keyword%'"
        . " UNION SELECT idx, title, name, view, 'qna_board' AS board_name FROM qna_board_table WHERE content LIKE '%$keyword%' AND lock_post = 0"
        . " UNION SELECT idx, title, name, view, 'inform_board' AS board_name FROM inform_board_table WHERE content LIKE '%$keyword%'";
} elseif ($search_option === 'name') {
    $sql = "SELECT idx, title, name, view, 'free_board' AS board_name FROM free_board_table WHERE name LIKE '%$keyword%'"
        . " UNION SELECT idx, title, name, view, 'qna_board' AS board_name FROM qna_board_table WHERE name LIKE '%$keyword%' AND lock_post = 0"
        . " UNION SELECT idx, title, name, view, 'inform_board' AS board_name FROM inform_board_table WHERE name LIKE '%$keyword%'";
} else {
    $sql = "SELECT * FROM qna_board_table WHERE lock_post = 0";
}
// url 받아오기
function get_detail_page_url($board_type, $post_id) {
    if ($board_type === 'free_board') {
        return "free_board_detail.php?idx={$post_id}";
    } elseif ($board_type === 'qna_board') {
        return "qna_board_detail.php?idx={$post_id}";
    } elseif ($board_type === 'inform_board') {
        return "inform_board_detail.php?idx={$post_id}";
    } else {
        return '#'; 
    }
}

// 검색결과
$result = mysqli_query($db, $sql);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>검색 결과</title>
</head>
<body>
    <h1>검색 결과</h1>
    <table class="list-table">
        <thead>
            <tr>
                <th width="70">번호</th>
                <th width="100">게시판종류</th>
                <th width="500">제목</th>
                <th width="120">글쓴이</th>
                <th width="100">조회수</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <tr class="list_board">
                    <td><?php echo $row['idx']; ?></td>
                    <td><?php echo $row['board_name']; ?></td>
                    <td><a href="<?php echo get_detail_page_url($row['board_name'], $row['idx']); ?>"><?php echo $row['title']; ?></a></td>
                    <td><?php echo $row['name']; ?></td>
                    <td><?php echo $row['view']; ?></td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
    <?php
    // Check if there are any search results
    if (mysqli_num_rows($result) == 0) {
        echo "<p>검색 결과가 없습니다.</p>";
    }
    ?>
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