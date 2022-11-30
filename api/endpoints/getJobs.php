<?php
function getJobsHandler($pdo){
    
    $query = "SELECT JobNo, Customer, description, DateFinished, DateTimeCreated, Status, JobType ,AllocatedTeam FROM job";
    $stmt = $pdo->prepare($query);
    $stmt->execute([]);
    $result = $stmt->fetchAll();
    return json_encode($result, JSON_PRETTY_PRINT);

    //foreach( $result as $row ) {
    //    echo json_encode($row['JobNo'] . $row['Customer']. "<br>" ,JSON_PRETTY_PRINT);
    //    }
} 