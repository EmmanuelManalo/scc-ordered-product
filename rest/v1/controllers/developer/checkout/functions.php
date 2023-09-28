<?php

// Read search individual
function checkSearchIndividual($object)
{
    $query = $object->searchIndividual();
    checkQuery($query, "Empty records. (search individual)");
    return $query;
}

// Read search product
function checkSearchProduct($object)
{
    $query = $object->searchProduct();
    checkQuery($query, "Empty records. (search product)");
    return $query;
}

// Group By Transaction Product Id
function checkGroupByTransactionProdId($object)
{
    $query = $object->groupByTransactionProdId();
    checkQuery($query, "Empty records. (group by product id)");
    return $query;
}
