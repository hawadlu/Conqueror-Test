<?php
namespace App\Controller;

class CartController extends BaseController {
    private $cart;

    public function __construct() {
        $this->cart = new \App\Model\Cart();
    }

    public function getCart() {
        $userId = $_GET['user_id'] ?? null;
        if (!$userId) {
            $this->sendOutput(json_encode(['error' => 'user_id required']));
            return;
        }
        $result = $this->cart->getCart($userId);
        $this->sendOutput(json_encode($result));
    }

    public function upsertCartItem() {
        $input = json_decode(file_get_contents('php://input'), true);

        if (isset($input['cart_id'])) {
            // PUT request - set exact quantity
            $result = $this->cart->setQuantity($input['cart_id'], $input['quantity']);
        } else {
            // POST request - add quantity
            $result = $this->cart->addItem(
                $input['user_id'],
                $input['product_id'],
                $input['quantity']
            );
        }

        $this->sendOutput(json_encode($result));
    }

    public function deleteCartItem() {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            $this->sendOutput(json_encode(['error' => 'id required']));
            return;
        }
        $result = $this->cart->deleteItem($id);
        $this->sendOutput(json_encode(['success' => $result]));
    }
}
