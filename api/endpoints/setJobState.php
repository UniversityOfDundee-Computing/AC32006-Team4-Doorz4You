<?php
function setJobStateHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECt JobNo from jobs where JobNo = ? and Location = ? and AllocatedTeam IN (SELECT TeamID from teamemployeelist where StaffNo = ?) LIMIT 1");
    $stmnt->execute([$_POST['jobID'], $staffDetails[0]['location'], $_POST['staffID']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE jobs set Status = ? where JobNo = ?");
        $stmnt->execute([strtoupper($_POST['status']), $_POST['jobID']]);
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Job"
        ], JSON_PRETTY_PRINT);
    }

    /*
    if jobState set to allocated 
        $stmnt = $pdo->prepare("CALL UpdateReservedStock(?,?)");
        $stmnt->execute(jobtype, location);

    if jobState set to Invalid or Collected(Stock is collected by team)
        $stmnt = $pdo->prepare("CALL UpdateReservedStock(?,?)");
        $stmnt->execute(jobtype, location);
    */

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}