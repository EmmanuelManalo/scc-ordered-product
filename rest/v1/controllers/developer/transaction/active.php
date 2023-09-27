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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("transactionId", $_GET)) {
    // check data
    checkPayload($data);
    $transaction->transaction_aid = $_GET['transactionId'];
    $transaction->transaction_is_active = trim($data["isActive"]);
    $transaction->transaction_updated_at = date("Y-m-d H:i:s");
    checkId($transaction->transaction_aid);
    $query = checkActive($transaction);
    http_response_code(200);
    returnSuccess($transaction, "Transaction", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
