<?php
function deleteBranchStaffHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $pdo->beginTransaction();
    $stmnt = $pdo->prepare("SELECT StaffNo from employees where Location = ? and StaffNo = ? LIMIT 1;");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['staffID']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("DELETE FROM teamemployee where StaffID = ?;");
        $stmnt->execute([$_POST['staffID']]);
        $stmnt = $pdo->prepare("DELETE FROM employees where StaffNo = ?;");
        $stmnt->execute([$_POST['staffID']]);
        $pdo->commit();
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown StaffID"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}