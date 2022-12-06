<?php
function createTeamHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT count(TeamID) as count FROM team where Location = ? group by Location");
    $stmnt->execute([$staffDetails[0]['location']]);
    $displayName = "#0";
    if ($stmnt->rowCount() > 0)
        $displayName = "#" . $stmnt->fetchAll()[0]['count'];
    if (isset($_POST['displayName']))
        $displayName = $_POST['displayName'];
    $stmnt = $pdo->prepare("INSERT INTO team values (TeamID = ?, Vehicle = '', Location = ?, DisplayName = ?)");
    $stmnt->execute([uniqid("team_", true), $staffDetails[0]['location'], $displayName]);

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}