<?php
function updateFitterViewStatusHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("UPDATE fitterview SET Status = ? WHERE JobNo = ? and EmployeeLocation = ?");
    $stmnt->execute([$_POST['status'], $_POST['JobNo'], $staffDetails[0]['location']]);

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}