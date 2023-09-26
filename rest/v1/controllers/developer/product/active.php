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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("productId", $_GET)) {
    // check data
    checkPayload($data);
    $product->product_aid = $_GET['productId'];
    $product->product_is_active = trim($data["isActive"]);
    $product->product_updated_at = date("Y-m-d H:i:s");
    checkId($product->product_aid);
    $query = checkActive($product);
    http_response_code(200);
    returnSuccess($product, "Product", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
