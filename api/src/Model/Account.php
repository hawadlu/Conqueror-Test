<?php
namespace App\Model;

class Account {
    private $db;

    public function __construct() {
        $this->db = new \App\Core\Database();
    }

    public function getAll() {
        return $this->db->select("SELECT * FROM account");
    }
}
