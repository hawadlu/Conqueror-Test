<?php
namespace App\Core;

class Database
{
    protected $connection = null;

    public function __construct()
    {
        try {
            $connectionString = "host='" . \DB_HOST . "' " .
                "port='" . \DB_PORT . "' " .
                "dbname='" . \DB_DATABASE_NAME . "' " .
                "user='" . \DB_USERNAME . "' " .
                "password='" . \DB_PASSWORD . "'";

            $this->connection = pg_connect($connectionString);

            if (!$this->connection) {
                throw new \Exception("Could not connect to database.");
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function select($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = [];

            while ($row = pg_fetch_assoc($stmt)) {
                $result[] = $row;
            }

            pg_free_result($stmt);
            return $result;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function insert($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = pg_affected_rows($stmt);
            pg_free_result($stmt);
            return $result > 0;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function update($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = pg_affected_rows($stmt);
            pg_free_result($stmt);
            return $result > 0;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function delete($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = pg_affected_rows($stmt);
            pg_free_result($stmt);
            return $result > 0;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    private function executeStatement($query = "", $params = [])
    {
        try {
            $stmt = pg_query_params($this->connection, $query, $params);

            if ($stmt === false) {
                throw new \Exception("Unable to execute statement: " . pg_last_error($this->connection));
            }

            return $stmt;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
