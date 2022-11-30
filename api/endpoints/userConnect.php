<?php
// Expected POST inputs:
// - staffNo
// - passwordHash (unsalted - sha256 of password)
function userConnectHandler(PDO $pdo) {
    $pass = "";
    $salt = "DOORZ_";
    $hash = hash("sha256", $salt . $pass);
    $stmnt = $pdo->prepare("SELECT staffNo from employee where StaffNo = ? and passHash = ?");
    $stmnt->execute([$_POST['staffNo'],$hash]);

    if ($stmnt->rowCount() === 0) {
        http_response_code(200);
        $tok = uniqid("TOK_", true);
        $stmnt = $pdo->prepare("UPDATE `22ac3d04`.employee t SET t.sessionToken = ? WHERE t.StaffNo = ? and t.passHash = ?;");
        $stmnt->execute([$tok, $_POST['staffNo'],$hash]);
        return json_encode([
            "token"=>$tok
        ],JSON_PRETTY_PRINT);
    } else {
        http_response_code(403);
        return json_encode([
            "error"=>"Invalid Credentials"
        ],JSON_PRETTY_PRINT);
    }
}