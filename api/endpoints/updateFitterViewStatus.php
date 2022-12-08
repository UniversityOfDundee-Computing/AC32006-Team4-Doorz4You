<?php
function updateFitterViewStatusHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("UPDATE fitterview SET Status = ? WHERE JobNo = ?");
    $stmnt->execute([$_POST['status'], $_POST['JobNo']]);

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}