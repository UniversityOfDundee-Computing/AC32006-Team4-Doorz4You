<?php
function createOrderHandler(PDO $pdo) {
    $custNo = "";
    if (isset($_POST['customerNo'])) {
        $stmnt = $pdo->prepare("SELECT CustomerNo FROM customer where CustomerNo = ? limit 1");
        $stmnt->execute([$_POST['customerNo']]);
        if ($stmnt->rowCount() === 1)
            $custNo = $_POST['customerNo'];
    }

    if ($custNo === "") {
        $custNo = uniqid("CUST_", true);
        $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`customer` (`CustomerNo`, `FirstName`, `ContactNo`, `Email`, `Street`, `City`, `Post Code`, `Country`, `Surname`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
        $stmnt->execute([$custNo, $_POST['firstName'], $_POST['ContactNo'], $_POST['Email'], $_POST['Street'], $_POST['City'], $_POST['Post_Code'], $_POST['Country'], $_POST['Surname']]);
    }

    $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`job` (`JobNo`, `Customer`, `Description`, `DateFinished`, `DateTimeCreated`, `Status`, `JobType`, `AllocatedTeam`) VALUES (?, ?, ?, ?, ?, ?, ?, '');");
    $stmnt->execute([uniqid("JOB_", true), $custNo, $_POST['customerNotes'], 0, date("u", time()), "OPEN", $_POST['jobType']]);
    return "OK";
}
