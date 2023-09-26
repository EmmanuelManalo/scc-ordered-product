<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$client = new Client($conn);
// get should not be present
if (array_key_exists("clientId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$client->client_client_id = strtoupper(checkIndex($data, "client_client_id"));
$client->client_name = checkIndex($data, "client_name");
$client->client_description = checkIndex($data, "client_description");
$client->client_is_active = 1;
$client->client_created_at = date("Y-m-d H:i:s");
$client->client_updated_at = date("Y-m-d H:i:s");
// // check name
isNameExist($client, $client->client_client_id);
isNameExist($client, $client->client_name);
// create
$query = checkCreate($client);
returnSuccess($client, "Client", $query);
