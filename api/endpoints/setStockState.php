<?php
function setStockStateHandler(PDO $pdo) {
    try {
        $staffDetails = getStaffDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }
    $stmnt = $pdo->prepare("SELECt PartNo from stocklist where PartNo = ? and Location = ? LIMIT 1");
    $stmnt->execute([$_POST['part'], $staffDetails[0]['location']]);
    if ($stmnt->rowCount() === 1) {
        $stmnt = $pdo->prepare("UPDATE stockinlocation set StockAvailable = ? where PartNo = ?");
        $stmnt->execute([intval($_POST['quantity']), $_POST['part']]);
    } else {
        http_response_code(502);
        return json_encode([
            "error"=>"Unknown Part"
        ], JSON_PRETTY_PRINT);
    }
    return json_encode([
        "status"=>"ok"
    ], JSON_PRETTY_PRINT);
}