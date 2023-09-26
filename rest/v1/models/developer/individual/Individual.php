<?php
class Individual
{
    public $individual_aid;
    public $individual_fname;
    public $individual_lname;
    public $individual_is_active;
    public $individual_created_at;
    public $individual_updated_at;

    public $employee_aid;

    public $individual_start;
    public $individual_total;
    public $individual_search;

    public $connection;
    public $lastInsertedId;
    public $tblIndividual;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblIndividual = "sscv1_individual";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblIndividual} ";
            $sql .= "( individual_fname, ";
            $sql .= "individual_fname, ";
            $sql .= "individual_lname, ";
            $sql .= "individual_is_active, ";
            $sql .= "individual_created_at, ";
            $sql .= "individual_updated_at ) values ( ";
            $sql .= ":individual_fname, ";
            $sql .= ":individual_fname, ";
            $sql .= ":individual_lname, ";
            $sql .= ":individual_is_active, ";
            $sql .= ":individual_created_at, ";
            $sql .= ":individual_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_fname" => $this->individual_fname,
                "individual_fname" => $this->individual_fname,
                "individual_lname" => $this->individual_lname,
                "individual_is_active" => $this->individual_is_active,
                "individual_created_at" => $this->individual_created_at,
                "individual_updated_at" => $this->individual_updated_at,
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
            $sql .= "from {$this->tblIndividual} ";
            $sql .= "order by individual_is_active desc, ";
            $sql .= "individual_fname asc ";
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
            $sql .= "from {$this->tblIndividual} ";
            $sql .= "order by individual_is_active desc, ";
            $sql .= "individual_fname asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->individual_start - 1,
                "total" => $this->individual_total,
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
            $sql .= "from {$this->tblIndividual} ";
            $sql .= "where individual_fname like :search ";
            $sql .= "order by individual_is_active desc, ";
            $sql .= "individual_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "search" => "%{$this->individual_search}%",
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
            $sql = "select * from {$this->tblIndividual} ";
            $sql .= "where individual_aid = :individual_aid ";
            $sql .= "order by individual_fname asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_aid" => $this->individual_aid,
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
            $sql = "update {$this->tblIndividual} set ";
            $sql .= "individual_fname = :individual_fname, ";
            $sql .= "individual_fname = :individual_fname, ";
            $sql .= "individual_lname = :individual_lname, ";
            $sql .= "individual_updated_at = :individual_updated_at ";
            $sql .= "where individual_aid = :individual_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_fname" => $this->individual_fname,
                "individual_fname" => $this->individual_fname,
                "individual_lname" => $this->individual_lname,
                "individual_updated_at" => $this->individual_updated_at,
                "individual_aid" => $this->individual_aid,
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
            $sql = "update {$this->tblIndividual} set ";
            $sql .= "individual_is_active = :individual_is_active, ";
            $sql .= "individual_updated_at = :individual_updated_at ";
            $sql .= "where individual_aid = :individual_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_is_active" => $this->individual_is_active,
                "individual_updated_at" => $this->individual_updated_at,
                "individual_aid" => $this->individual_aid,
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
            $sql = "delete from {$this->tblIndividual} ";
            $sql .= "where individual_aid = :individual_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_aid" => $this->individual_aid,
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
            $sql = "select individual_fname from {$this->tblIndividual} ";
            $sql .= "where individual_fname = :individual_fname ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "individual_fname" => "{$this->individual_fname}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
