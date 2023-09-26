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
    // check data
    checkPayload($data);
    // get data
    $client->client_aid = $_GET['clientId'];
    $client->client_client_id = strtoupper(checkIndex($data, "client_client_id"));
    $client->client_name = strtoupper(checkIndex($data, "client_name"));
    $client->client_description = checkIndex($data, "client_description");
    $client->client_updated_at = date("Y-m-d H:i:s");
    checkId($client->client_aid);

    $client_client_id_old = checkIndex($data, 'client_client_id_old');
    // $client_description_old = checkIndex($data, "client_description_old");

    // run if old is not equal to new name
    if ($client_client_id_old !== $client->client_client_id) {
        isNameExist($client, $client->client_client_id);
    }
    // 
    // if ($client_description_old !== $client->$client_description) {
    //     isNameExist($client, $client->client_description);
    // }


    // update
    $query = checkUpdate($client);
    returnSuccess($client, "Client", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
