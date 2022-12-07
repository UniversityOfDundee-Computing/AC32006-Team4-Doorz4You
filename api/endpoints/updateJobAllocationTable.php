<?php
function updateJobAllocationTableHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT TeamID from team where Location = ? and TeamID = ? LIMIT 1");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['team']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE job set AllocatedTeam = ?, Status = ? where JobNo = ? and Location = ?");
        $stmnt->execute([$_POST['team'], strtoupper($_POST['status']), $_POST['JobNo'], $staffDetails[0]['location']]);
    } else if ($_POST['team'] == "null") {
        $stmnt = $pdo->prepare("UPDATE job set AllocatedTeam = ?, Status = ? where JobNo = ? and Location = ?");
        $stmnt->execute([null, strtoupper($_POST['status']), $_POST['JobNo'], $staffDetails[0]['location']]);
    }
    else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Team"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}