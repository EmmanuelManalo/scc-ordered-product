<?php
require 'functions.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$individual = new Individual($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("individualId", $_GET)) {
    // get data
    $individual->individual_aid = $_GET['individualId'];
    checkId($individual->individual_aid);

    // check if individual exist at transaction table
    indivIdExist($individual);

    $query = checkDelete($individual);
    returnSuccess($individual, "Individual", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
