<?php
// check name
function isSrpExist($object)
{
    $query = $object->srpExist();
    $count = $query->rowCount();
    checkExistence($count, "Product already exist at Transaction.");
}
