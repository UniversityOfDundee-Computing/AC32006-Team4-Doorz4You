<?php
function getJobAllocationTableHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }

    $selectedStatusOptions = json_decode($_REQUEST['selectedOptions']);
    if (count($selectedStatusOptions) == 0)
        return json_encode(array());
    else if (count($selectedStatusOptions) < 5) {
        $count = 5 - count($selectedStatusOptions);
        for($i = 0; $i < $count; $i++)
            $selectedStatusOptions[] = $selectedStatusOptions[0];
    }

    if($_GET['sort'] == 'Order No. (ASC)') {
        $stmnt = $pdo->prepare("SELECT * FROM joballocation where Location = ? AND Status IN (?,?,?,?,?) ORDER BY JobNo ASC");
        $stmnt->execute([$staffDetails[0]['location'], $selectedStatusOptions[0], $selectedStatusOptions[1], $selectedStatusOptions[2], $selectedStatusOptions[3], $selectedStatusOptions[4]]);
        return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
    }
    else {
        $stmnt = $pdo->prepare("SELECT * FROM joballocation where Location = ? AND Status IN (?,?,?,?,?) ORDER BY JobNo DESC");
        $stmnt->execute([$staffDetails[0]['location'], $selectedStatusOptions[0], $selectedStatusOptions[1], $selectedStatusOptions[2], $selectedStatusOptions[3], $selectedStatusOptions[4]]);
        return json_encode($stmnt->fetchAll(), JSON_PRETTY_PRINT);
    }

}