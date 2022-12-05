<?php
// Expected POST inputs:
// - staffNo
// - passwordHash (unsalted - sha256 of password)
function userConnectHandler(PDO $pdo) {
    $pass = $_POST['password'];
    $salt = "DOORZ_";
    $hash = hash("sha256", $salt . $pass);
    $stmnt = $pdo->prepare("SELECT staffNo, Position, FirstName from employee where StaffNo = ? and passHash = ?");
    $stmnt->execute([$_POST['username'],$hash]);

    if ($stmnt->rowCount() > 0) {
        http_response_code(200);

        $row = $stmnt->fetch(PDO::FETCH_ASSOC);
        $position = $row['Position'];
        $firstname = $row['FirstName'];

        $tok = uniqid("TOK_", true);
        $stmnt = $pdo->prepare("UPDATE `22ac3d04`.employee t SET t.sessionToken = ? WHERE t.StaffNo = ? and t.passHash = ?;");
        $stmnt->execute([$tok, $_POST['username'],$hash]);
        return json_encode([
            "token"=>$tok,
            "username"=>$_POST['username'],
            "position"=>$position,
            "firstname"=>$firstname
        ],JSON_PRETTY_PRINT);
    } else {
        http_response_code(403);
        return json_encode([
            "error"=>"Invalid Credentials"
        ],JSON_PRETTY_PRINT);
    }
}