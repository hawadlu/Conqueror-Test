<?php
namespace App\Controller;

class BaseController {
    protected function sendOutput($data, $headers = []) {
        if (!empty($headers)) {
            foreach ($headers as $header) {
                header($header);
            }
        } else {
            header('Content-Type: application/json');
            header('HTTP/1.1 200 OK');
        }
        echo $data;
        exit;
    }
}
