<?php
class Product
{
    public $product_aid;
    public $product_name;
    public $product_srp;
    public $product_quantity;
    public $product_is_active;
    public $product_created_at;
    public $product_updated_at;

    public $employee_aid;

    public $product_start;
    public $product_total;
    public $product_search;

    public $connection;
    public $lastInsertedId;
    public $tblProduct;
    public $tblTransaction;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblProduct = "sccv1_product";
        $this->tblTransaction = "sccv1_transaction";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblProduct} ";
            $sql .= "( product_name, ";
            $sql .= "product_srp, ";
            $sql .= "product_quantity, ";
            $sql .= "product_is_active, ";
            $sql .= "product_created_at, ";
            $sql .= "product_updated_at ) values ( ";
            $sql .= ":product_name, ";
            $sql .= ":product_srp, ";
            $sql .= ":product_quantity, ";
            $sql .= ":product_is_active, ";
            $sql .= ":product_created_at, ";
            $sql .= ":product_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => $this->product_name,
                "product_srp" => $this->product_srp,
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

    // read all
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblProduct} ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all limit
    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblProduct} ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->product_start - 1,
                "total" => $this->product_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // search
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblProduct} ";
            $sql .= "where product_name like :search ";
            $sql .= "order by product_is_active desc, ";
            $sql .= "product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->product_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid ";
            $sql .= "order by product_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_name = :product_name, ";
            $sql .= "product_srp = :product_srp, ";
            $sql .= "product_quantity = :product_quantity, ";
            $sql .= "product_updated_at = :product_updated_at ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => $this->product_name,
                "product_srp" => $this->product_srp,
                "product_quantity" => $this->product_quantity,
                "product_updated_at" => $this->product_updated_at,
                "product_aid" => $this->product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblProduct} set ";
            $sql .= "product_is_active = :product_is_active, ";
            $sql .= "product_updated_at = :product_updated_at ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_is_active" => $this->product_is_active,
                "product_updated_at" => $this->product_updated_at,
                "product_aid" => $this->product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblProduct} ";
            $sql .= "where product_aid = :product_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_aid" => $this->product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select product_name from {$this->tblProduct} ";
            $sql .= "where product_name = :product_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "product_name" => "{$this->product_name}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
    // is SRP Exist
    public function srpExist()
    {
        try {
            $sql = "select transaction_product_id from {$this->tblTransaction} ";
            $sql .= "where transaction_product_id = :transaction_product_id ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "transaction_product_id" => $this->product_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
