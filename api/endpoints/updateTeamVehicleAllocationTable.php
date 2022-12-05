<?php
function updateTeamVehicleAllocationTableHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT TeamID, Vehicle from team where Location = ? and TeamID = ? LIMIT 1; START TRANSACTION;");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['team']]);
    if ($stmnt->rowCount() === 1) {
        if ($stmnt->fetch()['Vehicle'] !== $_POST['vehicle']) {
            $stmnt = $pdo->prepare("UPDATE team set Vehicle = ? where TeamID = ? and Location = ?");
            $stmnt->execute([$_POST['vehicle'], $_POST['team'], $staffDetails[0]['location']]);
        }
        $stmnt = $pdo->prepare("SELECT StaffID from teamemployee where TeamID = ?");
        $stmnt->execute([$_POST['team']]);
        $teamMembers = $stmnt->fetchAll();
        $good = (sizeof($teamMembers) === sizeof($_POST['teamMembers']));

        foreach ($teamMembers as $teamMember) {
            if (!in_array($teamMember['StaffID'], $_POST['teamMembers'])) {
                $good = false;
            }
        }
        if (!$good) {
            $stmnt = $pdo->prepare("DELETE FROM teamemployee where TeamID = ?;");
            $stmnt->execute([$_POST['team']]);

            $stmnt = $pdo->prepare("INSERT into teamemployee values (TeamID = ?, StaffID = ?);");
            foreach ($_POST['teamMembers'] as $teamMember) {
                $stmnt->execute([$_POST['team'], $teamMember]);
            }
        }

        $stmnt = $pdo->prepare("COMMIT;");
        $stmnt->execute([]);
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