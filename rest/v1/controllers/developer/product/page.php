<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/product/Product.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// validate api key 
if (array_key_exists("start", $_GET)) {

    $product->product_start = $_GET['start'];
    $product->product_total = 10;

    //check to see if task id in query string is not empty and is number, if not return json error
    checkLimitId($product->product_start, $product->product_total);

    $query = checkReadLimit($product);
    $total_result = checkReadAll($product);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $product->product_total,
        $product->product_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
