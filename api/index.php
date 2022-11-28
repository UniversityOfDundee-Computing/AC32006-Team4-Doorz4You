<?php
include_once "inc.php";

if (isset($_GET['getProductList'])) {
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getProductList.php";
    header("content-type: application/json");
    echo getProductListHandler($pdo);
}

if (isset($_GET['createOrder'])) {
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/createOrder.php";
    header("content-type: text/txt");
    echo createOrderHandler($pdo);
}

if (isset($_GET['getJobAllocationTable'])) {
    $pdo = PDO_config("22ac3u04", "abc322");
    include_once "endpoints/getJobAllocationTable.php";
    header("content-type: application/json");
    echo getJobAllocationTableHandler($pdo);
}