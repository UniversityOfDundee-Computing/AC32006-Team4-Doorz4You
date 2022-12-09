<?php /** @noinspection SpellCheckingInspection */
/** @noinspection SpellCheckingInspection */
function createTeamHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT count(TeamID) as count FROM teams where Location = ? group by Location");
    $stmnt->execute([$staffDetails[0]['location']]);
    $displayName = "#0";
    if ($stmnt->rowCount() > 0)
        $displayName = "#" . $stmnt->fetchAll()[0]['count'];
    if (isset($_POST['displayName']))
        $displayName = $_POST['displayName'];
    $team = uniqid("team_", true);
    $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.teams (TeamID, DisplayName, Vehicle, Location) VALUES (?, ?, null, ?);");
    $stmnt->execute([$team, $displayName, $staffDetails[0]['location']]);

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}