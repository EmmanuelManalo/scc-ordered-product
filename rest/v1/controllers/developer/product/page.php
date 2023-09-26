<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/client/Client.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// validate api key 
if (array_key_exists("start", $_GET)) {

    $client->client_start = $_GET['start'];
    $client->client_total = 3;

    //check to see if task id in query string is not empty and is number, if not return json error
    checkLimitId($client->client_start, $client->client_total);

    $query = checkReadLimit($client);
    $total_result = checkReadAll($client);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $client->client_total,
        $client->client_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
