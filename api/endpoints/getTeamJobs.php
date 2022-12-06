<?php
function getTeamJobsHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT TeamID from teamemployeelist where StaffNo = ?");
    $stmnt->execute([$staffDetails[0]['staffno']]);
    $teamJobs = [];
    foreach ($stmnt->fetchAll() as $team) {
        $stmnt2 = $pdo->prepare("SELECT * from teamslist where TeamID = ?");
        $stmnt2->execute([$team['TeamID']]);
        $dta = $stmnt2->fetchAll()[0];
        $stmnt2 = $pdo->prepare("SELECT staffno, firstname, surname from teamemployeelist where TeamID = ?");
        $stmnt2->execute([$team['TeamID']]);
        $staff = $stmnt2->fetchAll();
        $teamJobs[$team['TeamID']] = [
            "team"=>[
                "members"=>$staff,
                "name"=>$dta['DisplayName'],
                "vehicle"=>[
                    "id"=>$dta['Vehicle'],
                    "brand"=>$dta['Brand'],
                    "model"=>$dta['Model'],
                ]
            ],
            "jobs"=>[]
        ];
    }
    $stmnt = $pdo->prepare("SELECT * from joballocation where AllocatedTeam in (SELECT TeamID from teamemployeelist where StaffNo = ?)");
    $stmnt->execute([$staffDetails[0]['staffno']]);
    foreach ($stmnt->fetchAll() as $job) {
        $teamJobs[$job['AllocatedTeam']]['jobs'][] = $job;
    }

    return json_encode($teamJobs, JSON_PRETTY_PRINT);
}