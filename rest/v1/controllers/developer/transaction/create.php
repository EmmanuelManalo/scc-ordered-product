<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new Transaction($conn);
// get should not be present
if (array_key_exists("transactionId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data

$transaction->transaction_product_id = checkIndex($data, "transaction_product_id");
$transaction->transaction_individual_id = checkIndex($data, "transaction_individual_id");
$transaction->transaction_quantity = checkIndex($data, "transaction_quantity");
$transaction->transaction_is_active = 1;
$transaction->transaction_created_at = date("Y-m-d H:i:s");
$transaction->transaction_updated_at = date("Y-m-d H:i:s");

// create
$query = checkCreate($transaction);
returnSuccess($transaction, "Transaction", $query);
