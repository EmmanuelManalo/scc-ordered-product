<?php
// check name
function isSrpExist($object)
{
    $query = $object->srpExist();
    $count = $query->rowCount();
    checkExistence($count, "Can't edit price, already exist at Transaction.");
}
function isProductExistAtTransaction($object)
{
    $query = $object->productExistAtTransaction();
    $count = $query->rowCount();
    checkExistence($count, "Cant't Delete product, already exist at Transaction.");
}
