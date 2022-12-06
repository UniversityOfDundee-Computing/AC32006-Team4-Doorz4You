<?php
function getTeamStockItemsHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT TeamID, DisplayName from teamslist where Location = ?");
    $stmnt->execute([$staffDetails[0]['location']]);
    $teams = $stmnt->fetchAll();
    $teamStock = [];

    $stmnt = $pdo->prepare("SELECT * FROM jobstockrequired where AllocatedTeam = ?");
    foreach ($teams as $team) {
        $stmnt->execute([$team['TeamID']]);
        $teamStock[$team['TeamID']] = [
            "teamName"=>$team['DisplayName'],
            "teamID"=>$team['TeamID'],
            "parts"=>[]
        ];
        foreach ($stmnt->fetchAll() as $stockItem) {
            if (!isset($teamStock[$team['TeamID']]['parts'][$stockItem['PartNo']])) {
                $teamStock[$team['TeamID']]['parts'][$stockItem['PartNo']] = [
                    "id" => $stockItem['PartNo'],
                    "type" => $stockItem['PartType'],
                    "quantity" => 0
                ];
            }
            $teamStock[$team['TeamID']]['parts'][$stockItem['PartNo']]['quantity'] += $stockItem['Quantity'];
        }
    }
    $rtn = [];
    foreach ($teamStock as $item) {
        $item['parts'] = array_values($item['parts']);
        usort($item['parts'], "cmp");
        $rtn[] = $item;
    }

    return json_encode($rtn, JSON_PRETTY_PRINT);
}

function cmp($a, $b) {
    return strcmp($a['type'], $b['type']);
}