<?php
namespace App\Model;

class Cart {
    private $db;

    public function __construct() {
        $this->db = new \App\Core\Database();
    }

    // GET /cart?user_id=1
    public function getCart($userId) {
        return $this->db->select(
            "SELECT * FROM cart WHERE user_id = $1 ORDER BY id ASC",
            [$userId]
        );
    }

    // Add/update item
    public function addItem($userId, $productId, $quantity) {
        $existing = $this->db->select(
            "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
            [$userId, $productId]
        );

        if ($existing) {
            return $this->db->select(
                "UPDATE cart SET quantity = quantity + $1 
                 WHERE user_id = $2 AND product_id = $3 
                 RETURNING *",
                [$quantity, $userId, $productId]
            );
        }

        return $this->db->select(
            "INSERT INTO cart (user_id, product_id, quantity) 
             VALUES ($1, $2, $3) 
             RETURNING *",
            [$userId, $productId, $quantity]
        );
    }

    // Update quantity
    public function setQuantity($cartId, $quantity) {
        return $this->db->select(
            "UPDATE cart SET quantity = $1 
             WHERE id = $2 
             RETURNING *",
            [$quantity, $cartId]
        );
    }

    // Delete
    public function deleteItem($id) {
        return $this->db->delete(
            "DELETE FROM cart WHERE id = $1",
            [$id]
        );
    }
}
