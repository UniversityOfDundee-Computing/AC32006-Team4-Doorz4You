<?php
include_once "inc.php";
http_response_code(404);
if (isset($_GET['getProductList'])) {
    http_response_code(418);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getProductList.php";
    header("content-type: application/json");
    echo getProductListHandler($pdo);
}
if (isset($_GET['createOrder'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/createOrder.php";
    header("content-type: text/txt");
    echo createOrderHandler($pdo);
}
if (isset($_GET['getJobAllocationTable'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getJobAllocationTable.php";
    header("content-type: application/json");
    echo getJobAllocationTableHandler($pdo);
}
if (isset($_GET['userConnect'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/userConnect.php";
    header("content-type: application/json");
    echo userConnectHandler($pdo);
}
if (isset($_GET['getBranchStaff'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getBranchStaff.php";
    header("content-type: application/json");
    echo getBranchStaffHandler($pdo);
}
if (isset($_GET['getBranchTeams'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getBranchTeams.php";
    header("content-type: application/json");
    echo getBranchTeamsHandler($pdo);
}
if (isset($_GET['updateJobAllocationTable'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/updateJobAllocationTable.php";
    header("content-type: application/json");
    echo updateJobAllocationTableHandler($pdo);
}
if (isset($_GET['updateTeamVehicleAllocationTable'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/updateTeamVehicleAllocationTable.php";
    header("content-type: application/json");
    echo updateTeamVehicleAllocationTableHandler($pdo);
}
