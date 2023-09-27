<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new Transaction($conn);
// get $_GET data  

if (array_key_exists("transactionId", $_GET)) {
    $transaction->transaction_aid = $_GET['transactionId'];

    checkId($transaction->transaction_aid);
    $query = checkReadById($transaction);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($transaction);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
