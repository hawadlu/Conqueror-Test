<?php
namespace App\Controller;

class AccountController extends BaseController {
    private $account;

    public function __construct() {
        $this->account = new \App\Model\Account();
    }

    public function getAllAccounts() {
        $result = $this->account->getAll();
        $this->sendOutput(json_encode($result));
    }
}
