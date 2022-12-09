<?php
// Expected POST inputs:
// - customerNo (Optional)
// - firstName (if no customerNo specified)
// - ContactNo (if no customerNo specified)
// - Email (if no customerNo specified)
// - Street (if no customerNo specified)
// - City (if no customerNo specified)
// - Post_Code (if no customerNo specified)
// - Country (if no customerNo specified)
// - Surname (if no customerNo specified)
// - customerNotes
// - jobType

function createOrderHandler(PDO $pdo) {
    $custNo = "";
    if (isset($_POST['customerNo'])) {
        $stmnt = $pdo->prepare("SELECT CustomerNo,`PostCode`, `Country` FROM customers where CustomerNo = ? limit 1");
        $stmnt->execute([$_POST['customerNo']]);
        $custData = $stmnt->fetchAll();
        if (sizeof($custData) === 1) {
            $custNo = $custData[0]['CustomerNo'];
            $_POST['Post_Code'] = $custData[0]['PostCode'];
            $_POST['Country'] = $custData[0]['Country'];
        }
    }

    if ($custNo === "") {
        $custNo = uniqid("CUST_", true);
        $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`customers` (`CustomerNo`, `FirstName`, `ContactNo`, `Email`, `Street`, `City`, `PostCode`, `Country`, `Surname`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
        $stmnt->execute([$custNo, $_POST['firstName'], $_POST['ContactNo'], $_POST['Email'], $_POST['Street'], $_POST['City'], $_POST['Post_Code'], $_POST['Country'], $_POST['Surname']]);
    }

    $stmnt = $pdo->prepare("SELECT `LocationID`, `PostCode` FROM branches where Country = ?");
    $stmnt->execute([$_POST['Country']]);
    $branches = $stmnt->fetchAll();

    $branch = $branches[0]['LocationID'];


    $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`jobs` (`Customer`, `Description`, `DateFinished`, `DateTimeCreated`, `Status`, `JobType`, `AllocatedTeam`, `Location`) VALUES (?, ?, ?, ?, ?, ?, null, ?);");
    $stmnt->execute([$custNo, $_POST['customerNotes'], null, date("Y-m-d H:i:s", time()), "OPEN", $_POST['jobType'], $branch]);
    return "OK";
}
