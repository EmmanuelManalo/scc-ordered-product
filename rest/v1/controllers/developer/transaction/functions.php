<?php
// Update
function checkUpdateProduct($object)
{
    $query = $object->updateProduct();
    checkQuery($query, "There's a problem processing your request. (update product)");
    return $query;
}
