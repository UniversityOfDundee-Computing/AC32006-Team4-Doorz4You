<?php
function getBranchTeamsHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT * FROM teamslist where Location = ?");
    $stmnt->execute([$staffDetails[0]['location']]);
    $teams = [];
    $staffStmnt = $pdo->prepare("SELECT * FROM teamemployeelist where TeamID = ?");

    foreach ($stmnt->fetchAll() as $team) {
        $staffStmnt->execute([$team['TeamID']]);
        $teams[] = [
            "name"=>$team['DisplayName'],
            "vehicle"=>[
                "id"=>$team['Vehicle'],
                "brand"=>$team['Brand'],
                "model"=>$team['Model'],
            ],
            "id"=>$team['TeamID'],
            "staff"=>$staffStmnt->fetchAll()
        ];
    }
    return json_encode($teams, JSON_PRETTY_PRINT);
}