<?php
class Checkout
{
    public $transaction_aid;
    public $transaction_product_id;
    public $transaction_individual_id;
    public $transaction_quantity;
    public $transaction_total;
    public $transaction_is_paid;
    public $transaction_created_at;
    public $transaction_updated_at;

    public $checkout_search;

    public $connection;
    public $lastInsertedId;
    public $tblProduct;
    public $tblIndividual;
    public $tblTransaction;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv1_product";
        $this->tblIndividual = "sccv1_individual";
        $this->tblTransaction = "sccv1_transaction";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblTransaction} ";
            $sql .= "( transaction_product_id, ";
            $sql .= "transaction_individual_id, ";
            $sql .= "transaction_quantity, ";
            $sql .= "transaction_total, ";
            $sql .= "transaction_is_paid, ";
            $sql .= "transaction_created_at, ";
            $sql .= "transaction_updated_at ) values ( ";
            $sql .= ":transaction_product_id, ";
            $sql .= ":transaction_individual_id, ";
            $sql .= ":transaction_quantity, ";
            $sql .= ":transaction_total, ";
            $sql .= ":transaction_is_paid, ";
            $sql .= ":transaction_created_at, ";
            $sql .= ":transaction_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_product_id" => $this->transaction_product_id,
                "transaction_individual_id" => $this->transaction_individual_id,
                "transaction_quantity" => $this->transaction_quantity,
                "transaction_total" => $this->transaction_total,
                "transaction_is_paid" => $this->transaction_is_paid,
                "transaction_created_at" => $this->transaction_created_at,
                "transaction_updated_at" => $this->transaction_updated_at,
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
            $sql .= "product_aid, ";
            $sql .= "product_quantity, ";
            $sql .= "product_srp, ";
            $sql .= "product_is_active, ";
            $sql .= "product_aid as id, ";
            $sql .= "product_name as name ";
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
            $sql .= "individual_is_active, ";
            $sql .= "individual_aid as id, ";
            $sql .= "concat(individual_lname, ', ' , individual_fname) as name ";
            $sql .= "from {$this->tblIndividual} ";
            $sql .= "where individual_is_active = '1' ";
            $sql .= "and (individual_lname like :individual_lname ";
            $sql .= "or individual_fname like :individual_fname) ";
            $sql .= "order by individual_is_active desc, ";
            $sql .= "individual_lname asc,";
            $sql .= "individual_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_lname" => "%{$this->checkout_search}%",
                "individual_fname" => "%{$this->checkout_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all product
    public function readQuantityTransaction()
    {
        try {
            $sql = "select ";
            $sql .= "transaction_product_id, ";
            $sql .= "SUM(transaction_quantity) as qty, ";
            $sql .= "transaction_is_paid ";
            $sql .= "from {$this->tblTransaction} ";
            $sql .= "where transaction_product_id = :transaction_product_id ";
            $sql .= "group by transaction_product_id ";
            $sql .= "order by transaction_is_paid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_product_id" => $this->transaction_product_id,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
