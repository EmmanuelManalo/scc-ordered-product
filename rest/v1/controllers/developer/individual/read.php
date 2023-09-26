<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$individual = new Individual($conn);
// get $_GET data  



if (array_key_exists("individualId", $_GET)) {
    $individual->individual_aid = $_GET['individualId'];
    
    checkId($individual->individual_aid);
    $query = checkReadById($individual);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($individual);
    http_response_code(200);
    getQueriedData($query);
}

// return 404 error if endpoint not available
checkEndpoint();
