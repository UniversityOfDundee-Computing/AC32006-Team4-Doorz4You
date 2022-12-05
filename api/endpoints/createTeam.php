<?php
function createTeamHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("INSERT INTO team values (TeamID = ?, Vehicle = '', Location = ?, DisplayName = ?)");
    $stmnt->execute([uniqid("team_", true), $staffDetails[0]['location'], $_POST['displayName']]);

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}