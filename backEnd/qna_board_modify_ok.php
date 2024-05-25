<?php
include $_SERVER['DOCUMENT_ROOT'] . "/db_con.php";

$bno = $_GET['idx'];
$username = $_POST['name'];
$title = $_POST['title'];
$content = $_POST['content'];

// 기존 파일명을 담을 변수
$prev_file = $_POST['prev_file'];

// Check if a new image file was uploaded
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $error = $_FILES['file']['error'];
    $tmpfile = $_FILES['file']['tmp_name'];
    $filename = $_FILES['file']['name'];
    $folder = "./file/upload/" . $filename;
  
    // 파일 최대 용량을 초과시 에러 
    if ($error != UPLOAD_ERR_OK) {
      switch ($error) {
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
          echo "<script>alert('파일이 너무 큽니다.');";
          echo "window.history.back()</script>";
          exit;
      }
    }
  
    // 새로운 이미지 파일 업로드
    move_uploaded_file($tmpfile, $folder);
  
    // 기존 이미지 파일 삭제
    if ($prev_file !== "") {
      unlink("./file/upload/" . $prev_file); // 기존 파일 삭제
    }
} else {
  // 새로운 이미지 파일이 업로드되지 않았을 경우, 기존 이미지 파일을 유지
  $filename = $prev_file; // 이전 파일명을 변수에 저장
}

if ($title && $content){
    $sql = mc("UPDATE qna_board_table SET title='$title', content='$content', file='$filename' WHERE idx='$bno'");
    if ($sql) {
        echo "<script>alert('글 수정이 완료되었습니다.'); location.href='qna_board_detail.php?idx=$bno';</script>";
    } else {
        echo "<script>alert('글 수정에 실패했습니다.');</script>";
    }
} else {
    echo "<script>alert('제목과 내용을 확인해주세요.'); history.back();</script>";
}
?>