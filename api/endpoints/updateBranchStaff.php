<?php
function updateBranchStaffHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECT StaffNo from employee where Location = ? and StaffNo = ? LIMIT 1");
    $stmnt->execute([$staffDetails[0]['location'], $_POST['staffID']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE employee set FirstName = ?, Surname = ?, Position = ?, Salary = ? where
                                                                             StaffNo = ? and Location = ?");
        $stmnt->execute([$_POST['fName'],$_POST['lName'],$_POST['position'],$_POST['salary'], $_POST['staffID'],
            $staffDetails[0]['location']]);
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Staff Member"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}