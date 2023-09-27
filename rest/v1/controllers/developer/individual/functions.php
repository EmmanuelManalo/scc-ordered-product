<?php
// check name
function indivIdExist($object)
{
    $query = $object->indivIdExist();
    $count = $query->rowCount();
    checkExistence($count, "Individual exists at Transaction.");
}