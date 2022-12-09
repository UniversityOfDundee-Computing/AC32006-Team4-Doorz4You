<?php
// Expected POST inputs:
// - staffNo
// - passwordHash (unsalted - sha256 of password)
function customerConnectHandler(PDO $pdo) {
    $pass = $_POST['password'];
    $salt = "DOORZ_";
    $hash = hash("sha256", $salt . $pass);
    $stmnt = $pdo->prepare("SELECT Email, FirstName, Surname, sessionToken from customerdetails where Email = ? and Password = ?");
    $stmnt->execute([$_POST['username'],$hash]);

    if ($stmnt->rowCount() > 0) {
        http_response_code(200);

        $row = $stmnt->fetch(PDO::FETCH_ASSOC);
        $Surname = $row['Surname'];
        $firstname = $row['FirstName'];

        $tok = uniqid("TOK_", true);
        if ($row['sessionToken'] != null)
            $tok = $row['sessionToken'];
        $stmnt = $pdo->prepare("UPDATE customerdetails t SET t.sessionToken = ? WHERE t.Email = ? and t.Password = ?;");
        $stmnt->execute([$tok, $_POST['username'],$hash]);
        return json_encode([
            "token"=>$tok,
            "username"=>$_POST['username'],
            "surname"=>$Surname,
            "firstname"=>$firstname
        ],JSON_PRETTY_PRINT);
    } else {
        http_response_code(403);
        return json_encode([
            "error"=>"Invalid Credentials"
        ],JSON_PRETTY_PRINT);
    }
}