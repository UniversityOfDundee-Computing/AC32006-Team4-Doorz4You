<?php
function addDayOffHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT StaffNo from stafflist where StaffNo = ? and EmployeeLocation = ? LIMIT 1");
    $stmnt->execute([$_POST['staffNo'], $staffDetails[0]['location']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("INSERT into staffdaysoff (StaffNo, Date, Reason) values (?,?,?)");
        $stmnt->execute([$_POST['staffNo'], $_POST['date'], $_POST['reason']]);
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Staff Memeber"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}