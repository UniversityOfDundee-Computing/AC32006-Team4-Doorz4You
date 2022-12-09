<?php
function deleteTeamHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $pdo->beginTransaction();
    $stmnt = $pdo->prepare("SELECT TeamID from teams where Location = ? and TeamID = ? LIMIT 1;");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['team']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("Update job set AllocatedTeam = '' where AllocatedTeam = ?;");
        $stmnt->execute([$_POST['team']]);
        $stmnt = $pdo->prepare("DELETE FROM teamemployee where TeamID = ?;");
        $stmnt->execute([$_POST['team']]);
        $stmnt = $pdo->prepare("DELETE FROM teams where TeamID = ?;");
        $stmnt->execute([$_POST['team']]);
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