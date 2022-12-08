<?php
function registerCustomerHandler(PDO $pdo) {
    $pass = $_POST['password'];
    $salt = "DOORZ_";
    $hash = hash("sha256", $salt . $pass);
    $custNo = uniqid("CUST_", true);
    $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`customer` (`CustomerNo`, `FirstName`, `ContactNo`, `Email`, `Street`, `City`, `PostCode`, `Country`, `Surname`, `Password`, sessionToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, null);");
    $stmnt->execute([$custNo, $_POST['firstName'], $_POST['ContactNo'], $_POST['Email'], $_POST['Street'], $_POST['City'], $_POST['Post_Code'], $_POST['Country'], $_POST['Surname'], $hash]);
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}