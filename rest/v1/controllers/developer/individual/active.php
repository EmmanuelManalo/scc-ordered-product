<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/individual/Individual.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$individual = new Individual($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true); 
// get $_GET data
// validate api key 
if (array_key_exists("individualId", $_GET)) {
    // check data
    checkPayload($data);
    $individual->individual_aid = $_GET['individualId'];
    $individual->individual_is_active = trim($data["isActive"]);
    $individual->individual_updated_at = date("Y-m-d H:i:s");
    checkId($individual->individual_aid);
    $query = checkActive($individual);
    http_response_code(200);
    returnSuccess($individual, "Client", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
