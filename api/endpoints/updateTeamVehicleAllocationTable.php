<?php
function updateTeamVehicleAllocationTableHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $pdo->beginTransaction();
    $stmnt = $pdo->prepare("SELECT TeamID, Vehicle from teams where Location = ? and TeamID = ? LIMIT 1;");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['team']]);
    if ($stmnt->rowCount() === 1) {
        if ($stmnt->fetch()['Vehicle'] !== $_POST['vehicle']) {
            $stmnt = $pdo->prepare("UPDATE teams set Vehicle = ? where TeamID = ? and Location = ?");
            $stmnt->execute([$_POST['vehicle'], $_POST['team'], $staffDetails[0]['location']]);
        }
        $stmnt = $pdo->prepare("DELETE FROM teamemployee where TeamID = ?;");
        $stmnt->execute([$_POST['team']]);

        $stmnt = $pdo->prepare("INSERT into teamemployee (TeamID, StaffID) values (?, ?);");
        foreach (json_decode($_POST['teamMembers']) as $teamMember) {
            $stmnt->execute([$_POST['team'], $teamMember]);
        }

        $pdo->commit();
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Team"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}