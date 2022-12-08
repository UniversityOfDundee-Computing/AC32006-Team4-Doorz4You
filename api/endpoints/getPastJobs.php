<?php
function getPastJobsHandler(PDO $pdo){
    try {
        $custDetails = getCustomerDetail($pdo);
    } catch (Exception $exception) {
        return json_encode([
            "error"=>$exception->getMessage()
        ], JSON_PRETTY_PRINT);
    }    $query = "SELECT * FROM customerorder where CustomerNo = ?";
    $stmt = $pdo->prepare($custDetails['CustomerNo']);
    $stmt->execute([]);
    $result = $stmt->fetchAll();
    return json_encode($result, JSON_PRETTY_PRINT);
} 