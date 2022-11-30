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
    $custData = [];
    if (isset($_POST['customerNo'])) {
        $stmnt = $pdo->prepare("SELECT CustomerNo,`PostCode`, `Country` FROM customer where CustomerNo = ? limit 1");
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
        $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`customer` (`CustomerNo`, `FirstName`, `ContactNo`, `Email`, `Street`, `City`, `PostCode`, `Country`, `Surname`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
        $stmnt->execute([$custNo, $_POST['firstName'], $_POST['ContactNo'], $_POST['Email'], $_POST['Street'], $_POST['City'], $_POST['Post_Code'], $_POST['Country'], $_POST['Surname']]);
    }

    $stmnt = $pdo->prepare("SELECT `LocationID`, `PostCode` FROM branch where Country = ?");
    $stmnt->execute([$_POST['Country']]);
    $branches = $stmnt->fetchAll();
    $branchesCSV = "";
    foreach ($branches as $branch) {
        $branchesCSV .= $branch['PostCode'] . ",";
    }

    //Source : zipcodebase api docs
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);

    $data = [
        "code" => $_POST['Post_Code'],
        "compare" => substr($branchesCSV, 0, -1),
        "country" => $_POST['Country'],
    ];

    curl_setopt($ch, CURLOPT_URL, "https://app.zipcodebase.com/api/v1/distance?" . http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type: application/json",
        "apikey: cc948a00-6f3b-11ed-9189-cf34346060d0",
    ));

    $response = curl_exec($ch);
    curl_close($ch);

    $json = json_decode($response);

    // END - Source zipcodebase API Docs
    $branch = "";
    foreach ($branches as $br) {
        if ($br['PostCode'] === array_keys((array)($json->results))[0]) {
            $branch = $br['LocationID'];
        }
    }

    $stmnt = $pdo->prepare("INSERT INTO `22ac3d04`.`job` (`JobNo`, `Customer`, `Description`, `DateFinished`, `DateTimeCreated`, `Status`, `JobType`, `AllocatedTeam`, `Location`) VALUES (?, ?, ?, ?, ?, ?, ?, null, ?);");
    $stmnt->execute([uniqid("JOB_", true), $custNo, $_POST['customerNotes'], null, date("u", time()), "OPEN", $_POST['jobType'], $branch]);
    return "OK";
}
