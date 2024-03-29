<?php
function createBranchStaffHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $pass = $_POST['password'];
    $salt = "DOORZ_";
    $hash = hash("sha256", $salt . $pass);
    $stmnt = $pdo->prepare("INSERT INTO employees (StaffNo, Location, Salary, Position, FirstName, Surname, passHash, sessionToken) values (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmnt->execute([uniqid("staff_", true), $staffDetails[0]['location'], $_POST['salary'], strtoupper($_POST['position']), $_POST['fName'], $_POST['lName'], $hash, uniqid("TOK_", true)]);

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}