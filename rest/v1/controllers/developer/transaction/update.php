<?php
require 'functions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new Transaction($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("transactionId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $transaction->transaction_aid = $_GET['transactionId'];
    $transaction->transaction_product_id = checkIndex($data, "transaction_product_id");
    $transaction->transaction_individual_id = checkIndex($data, "transaction_individual_id");
    $transaction->transaction_quantity = checkIndex($data, "transaction_quantity");
    $transaction->transaction_updated_at = date("Y-m-d H:i:s");
    checkId($transaction->transaction_aid);

    $transaction_quantity_old = checkIndex($data, "transaction_quantity_old");
    $productQty = checkIndex($data, "productQty");

    $transaction->product_quantity = ((int)$productQty + (int)$transaction_quantity_old) -  (int)$transaction->transaction_quantity;

    if ($transaction->product_quantity < 0) {
        resultError("Insufficient quantity.");
    }

    // update
    $query = checkUpdate($transaction);
    checkUpdateProduct($transaction);
    returnSuccess($transaction, "Transaction", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
