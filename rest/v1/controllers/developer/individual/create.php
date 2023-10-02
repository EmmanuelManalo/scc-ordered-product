<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$individual = new Individual($conn);
// get should not be present
if (array_key_exists("individualId", $_GET)) {
    checkEndpoint();
}
// check data
checkPayload($data);
// get data
$individual->individual_fname = checkIndex($data, "individual_fname");
$individual->individual_lname = checkIndex($data, "individual_lname");
$individual->individual_is_active = 1;
$individual->individual_created_at = date("Y-m-d H:i:s");
$individual->individual_updated_at = date("Y-m-d H:i:s");
// // check name
$name = $individual->individual_fname . " " . $individual->individual_lname;
isNameExist($individual, $name);
// create
$query = checkCreate($individual);
returnSuccess($individual, "Individual", $query);
