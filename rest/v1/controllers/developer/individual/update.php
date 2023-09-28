<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$individual = new Individual($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("individualId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $individual->individual_aid = $_GET['individualId'];
    $individual->individual_fname = (checkIndex($data, "individual_fname"));
    $individual->individual_lname = checkIndex($data, "individual_lname");
    $individual->individual_updated_at = date("Y-m-d H:i:s");
    checkId($individual->individual_aid);

    // update
    $query = checkUpdate($individual);
    returnSuccess($individual, "Individual", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
