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
// validate api key 
if (array_key_exists("start", $_GET)) {

    $individual->individual_start = $_GET['start'];
    $individual->individual_total = 10;

    //check to see if task id in query string is not empty and is number, if not return json error
    checkLimitId($individual->individual_start, $individual->individual_total);

    $query = checkReadLimit($individual);
    $total_result = checkReadAll($individual);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $individual->individual_total,
        $individual->individual_start
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
