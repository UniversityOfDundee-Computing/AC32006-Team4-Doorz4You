<?php
function markCollectedHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT TeamID from teamslist where Location = ? and TeamID = ? LIMIT 1");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['team']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE jobs set Status = 'COLLECTED' where JobNo = ? and AllocatedTeam = ? and Location = ?");
        foreach (json_decode($_POST['jobs']) as $job) {
            $stmnt->execute([$job, $_POST['team'], $staffDetails[0]['location']]);
        }
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Staff Member"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}