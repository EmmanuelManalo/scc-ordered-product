<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
require 'functions.php';
// use needed classes
require '../../../models/developer/checkout/Checkout.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$check_out = new Checkout($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// get should not be present
if (array_key_exists("individualId", $_GET)) {
    checkEndpoint();
}

// check data
checkPayload($data);
// get data 

$check_out->transaction_product_id = checkIndex($data, "transaction_product_id");
$check_out->transaction_individual_id = checkIndex($data, "transaction_individual_id");
$check_out->transaction_quantity = checkIndex($data, "transaction_quantity");
$check_out->transaction_total = checkIndex($data, "transaction_total");
$check_out->transaction_is_paid = 0;
$check_out->transaction_created_at = date("Y-m-d H:i:s");
$check_out->transaction_updated_at = date("Y-m-d H:i:s");
// create

// 
$qtyTransaction = $check_out->readQuantityTransaction();
$product = $data["product"];

$transactionQty = 0;
$productQty = 0;

// update if first load
if ($qtyTransaction->rowCount() > 0) {
    $row = $qtyTransaction->fetch(PDO::FETCH_ASSOC);
    extract($row);
    $transactionQty = $qty;
}

// update if first load
if ($product != []) {
    $productQty = checkIndex($product, "qty");
}

$totalQuantity = (int)$productQty - ((int)$transactionQty + (int)$check_out->transaction_quantity);

if ($totalQuantity < 0) {
    resultError("Insufficient quantity.");
}

$query = checkCreate($check_out);
returnSuccess($check_out, "checkout", $query);
