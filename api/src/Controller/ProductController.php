<?php
namespace App\Controller;

class ProductController extends BaseController {
    private $product;

    public function __construct() {
        $this->product = new \App\Model\Product();
    }

    public function getAllProducts() {
        $result = $this->product->getAll();
        $this->sendOutput(json_encode($result));
    }
}
