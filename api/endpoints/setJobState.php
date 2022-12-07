<?php
function setJobStateHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECt JobNo from job where JobNo = ? and Location = ? and AllocatedTeam IN (SELECT TeamID from teamemployeelist where StaffNo = ?) LIMIT 1");
    $stmnt->execute([$_POST['jobID'], $staffDetails[0]['location'], $_POST['staffID']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE job set Status = ? where JobNo = ?");
        $stmnt->execute([strtoupper($_POST['status']), $_POST['jobID']]);
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Job"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}