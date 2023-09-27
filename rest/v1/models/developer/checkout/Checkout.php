<?php
class Checkout
{
    public $product_aid;
    public $product_name;
    public $product_quantity;
    public $product_is_active;
    public $product_created_at;
    public $product_updated_at;

    public $employee_aid;

    public $product_start;
    public $product_total;
    public $checkout_search;

    public $connection;
    public $lastInsertedId;
    public $tblProduct;
    public $tblIndividual;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv1_product";
        $this->tblIndividual = "sscv1_individual";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProduct} ";
            $sql .= "( product_name, ";
            $sql .= "product_quantity, ";
            $sql .= "product_is_active, ";
            $sql .= "product_created_at, ";
            $sql .= "product_updated_at ) values ( ";
            $sql .= ":product_name, ";
            $sql .= ":product_quantity, ";
            $sql .= ":product_is_active, ";
            $sql .= ":product_created_at, ";
            $sql .= ":product_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => $this->product_name,
                "product_quantity" => $this->product_quantity,
                "product_is_active" => $this->product_is_active,
                "product_created_at" => $this->product_created_at,
                "product_updated_at" => $this->product_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function searchProduct()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblProduct} ";
            $sql .= "where product_is_active = '1' ";
            $sql .= "and product_name like :search ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->checkout_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function searchIndividual()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblIndividual} ";
            $sql .= "where individual_is_active = '1' ";
            $sql .= "and (individual_fname like :individual_fname ";
            $sql .= "or individual_lname like :individual_lname) ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_fname" => "%{$this->checkout_search}%",
                "individual_lname" => "%{$this->checkout_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
