<?php
function getPastJobsHandler(PDO $pdo){
    try {
        $custDetails = getCustomerDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }    $query = "SELECT * FROM customerorder where CustomerNo = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$custDetails[0]['CustomerNo']]);
    $result = $stmt->fetchAll();
    return json_encode($result, JSON_PRETTY_PRINT);
} 