<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$product = new Product($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("productId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $product->product_aid = $_GET['productId'];
    $product->product_name = checkIndex($data, "product_name");
    $product->product_quantity = checkIndex($data, "product_quantity");
    $product->product_updated_at = date("Y-m-d H:i:s");
    checkId($product->product_aid);

    $product_name_old = checkIndex($data, 'product_name_old');
    // $client_description_old = checkIndex($data, "client_description_old");

    // run if old is not equal to new name
    if (strtolower($product_name_old) !== strtolower($product->product_name)) {
        isNameExist($product, $product->product_name);
    }
    // 
    // if ($client_description_old !== $product->$client_description) {
    //     isNameExist($product, $product->client_description);
    // }


    // update
    $query = checkUpdate($product);
    returnSuccess($product, "Client", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
