<?php
// check name
function indivIdExist($object)
{
    $query = $object->indivIdExist();
    $count = $query->rowCount();
    checkExistence($count, "Individual exists at Transaction.");
}

function isIndividualNameExist($object, $fname, $lname)
{
    $query = $object->checkIndivName();
    $count = $query->rowCount();
    checkExistence($count, "{$fname} {$lname} already exist.");
}