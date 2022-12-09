<?php
function setJobStateHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECt JobNo, JobType from jobs where JobNo = ? and Location = ? and AllocatedTeam IN (SELECT TeamID from teamemployeelist where StaffNo = ?) LIMIT 1");
    $stmnt->execute([$_POST['jobID'], $staffDetails[0]['location'], $_POST['staffID']]);
    $jobtype = $stmnt->fetch()['JobType'];
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE jobs set Status = ? where JobNo = ?");
        $stmnt->execute([strtoupper($_POST['status']), $_POST['jobID']]);
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Job"
        ], JSON_PRETTY_PRINT);
    }

    
    if (['status'] === "ALLOCATED"){ 
        $stmnt = $pdo->prepare("CALL UpdateReservedStock(?,?)");
        $stmnt->execute([$jobtype, $staffDetails[0]['location']]);
    }

    if (['status'] === "INVALID"){ 
        $stmnt = $pdo->prepare("CALL InvalidateReservedStock(?,?)");
        $stmnt->execute([$jobtype, $staffDetails[0]['location']]);
    }
    

    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}