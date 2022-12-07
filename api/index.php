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
if (isset($_GET['deleteTeam'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/deleteTeam.php";
    header("content-type: application/json");
    echo deleteTeamHandler($pdo);
}
if (isset($_GET['createTeam'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/createTeam.php";
    header("content-type: application/json");
    echo createTeamHandler($pdo);
}
if (isset($_GET['getBranchVehicles'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getBranchVehicles.php";
    header("content-type: application/json");
    echo getBranchVehiclesHandler($pdo);
}
if (isset($_GET['updateBranchStaff'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/updateBranchStaff.php";
    header("content-type: application/json");
    echo updateBranchStaffHandler($pdo);
}
if (isset($_GET['deleteBranchStaff'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/deleteBranchStaff.php";
    header("content-type: application/json");
    echo deleteBranchStaffHandler($pdo);
}
if (isset($_GET['createBranchStaff'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/createBranchStaff.php";
    header("content-type: application/json");
    echo createBranchStaffHandler($pdo);
}
if (isset($_GET['getTeamJobs'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getTeamJobs.php";
    header("content-type: application/json");
    echo getTeamJobsHandler($pdo);
}
if (isset($_GET['setJobState'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/setJobState.php";
    header("content-type: application/json");
    echo setJobStateHandler($pdo);
}
if (isset($_GET['getBranchStock'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getBranchStock.php";
    header("content-type: application/json");
    echo getBranchStockHandler($pdo);
}
if (isset($_GET['getTeamStockItems'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getTeamStockItems.php";
    header("content-type: application/json");
    echo getTeamStockItemsHandler($pdo);
}
if (isset($_GET['markCollected'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/markCollected.php";
    header("content-type: application/json");
    echo markCollectedHandler($pdo);
}
if (isset($_GET['updateFitterViewStatus'])) {
    http_response_code(200);
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/updateFitterViewStatus.php";
    header("content-type: application/json");
    echo updateFitterViewStatusHandler($pdo);
}
