<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get $_GET data  



if (array_key_exists("clientId", $_GET)) {
    $client->client_aid = $_GET['clientId'];
    
    checkId($client->client_aid);
    $query = checkReadById($client);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($client);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
