<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get $_GET data
$error = []; 
$returnData = [];
if (array_key_exists("clientId", $_GET)) {
    // get data
    $client->client_aid = $_GET['clientId'];
    checkId($client->client_aid);

    $query = checkDelete($client);
    returnSuccess($client, "Client", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
