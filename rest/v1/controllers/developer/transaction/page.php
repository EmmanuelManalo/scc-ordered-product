<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/transaction/Transaction.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$transaction = new Transaction($conn);
// validate api key 
if (array_key_exists("start", $_GET)) {

    $transaction->transaction_start = $_GET['start'];
    $transaction->transaction_total = 10;

    //check to see if task id in query string is not empty and is number, if not return json error
    checkLimitId($transaction->transaction_start, $transaction->transaction_total);

    $query = checkReadLimit($transaction);
    $total_result = checkReadAll($transaction);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $transaction->transaction_total,
        $transaction->transaction_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
