<?php
if (isset($_GET['getProductList'])) {
    // Insert SQL code here (this is just example code that will be updated later)

    $products = [
        [
            "name"=>"Door Replacing",
            "price"=>10.99,
            "time"=>120
        ],
        [
            "name"=>"Door Replacing",
            "price"=>10.99,
            "time"=>120
        ],
        [
            "name"=>"Door Replacing",
            "price"=>10.99,
            "time"=>120
        ],
        [
            "name"=>"Door Replacing",
            "price"=>10.99,
            "time"=>120
        ],
        [
            "name"=>"Door Replacing",
            "price"=>10.99,
            "time"=>120
        ]
    ];

    header("content-type: application/json");
    echo json_encode($products, JSON_PRETTY_PRINT);
}