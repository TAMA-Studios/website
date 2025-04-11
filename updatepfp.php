<?php
// Path to employeeinfo.json
$jsonFile = 'employeeinfo.json';

// Get posted JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Load current JSON
$employeeInfo = json_decode(file_get_contents($jsonFile), true);

foreach ($employeeInfo as $name => &$info) {
    if (isset($info['email'])) {
        $usernamePart = explode('@', $info['email'])[0];
        if (isset($data[$usernamePart])) {
            $info['pfp'] = $data[$usernamePart]['Profilepic'];
        }
    }
}

file_put_contents($jsonFile, json_encode($employeeInfo, JSON_PRETTY_PRINT));

echo 'Success';
?>
