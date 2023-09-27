<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new Transaction($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("transactionId", $_GET)) {
    // get data
    $transaction->transaction_aid = $_GET['transactionId'];
    checkId($transaction->transaction_aid);

    $query = checkDelete($transaction);
    returnSuccess($transaction, "Transaction", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
