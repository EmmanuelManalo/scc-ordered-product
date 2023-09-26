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
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true); 
// get $_GET data
// validate api key 
if (array_key_exists("clientId", $_GET)) {
    // check data
    checkPayload($data);
    $client->client_aid = $_GET['clientId'];
    $client->client_is_active = trim($data["isActive"]);
    $client->client_updated_at = date("Y-m-d H:i:s");
    checkId($client->client_aid);
    $query = checkActive($client);
    http_response_code(200);
    returnSuccess($client, "Client", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
