<?php
require 'functions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("productId", $_GET)) {
    // get data
    $product->product_aid = $_GET['productId'];
    checkId($product->product_aid);

    // Check if product exist at transaction table
    isProductExistAtTransaction($product);

    $query = checkDelete($product);
    returnSuccess($product, "Product", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
