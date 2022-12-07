<?php
function deleteBranchStaffHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT StaffNo from employee where Location = ? and StaffNo = ? LIMIT 1; START TRANSACTION;");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['staffID']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("DELETE FROM teamemployee where StaffID = ?;");
        $stmnt->execute([$_POST['staffID']]);
        $stmnt = $pdo->prepare("DELETE FROM employee where StaffNo = ?;");
        $stmnt->execute([$_POST['staffID']]);
        $stmnt = $pdo->prepare("COMMIT;");
        $stmnt->execute([]);
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