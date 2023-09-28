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

// get task id from query string 
$query = checkGroupByTransactionProdId($check_out);
http_response_code(200);
getQueriedData($query);

// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
