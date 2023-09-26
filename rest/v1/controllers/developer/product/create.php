<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get should not be present
if (array_key_exists("productId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$product->product_name = checkIndex($data, "product_name");
$product->product_quantity = checkIndex($data, "product_quantity");
$product->product_is_active = 1;
$product->product_created_at = date("Y-m-d H:i:s");
$product->product_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($product, $product->product_name);
// create
$query = checkCreate($product);
returnSuccess($product, "Product", $query);
