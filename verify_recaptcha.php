<?php
// POST以外のアクセスは拒否
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

$recaptcha_secret = '6LcX4CgrAAAAAANtoVxJT_qZwRNBVN_NDmmB15rO';
$response = $_POST['g-recaptcha-response'];
$remoteip = $_SERVER['REMOTE_ADDR'];

$verify_url = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret' => $recaptcha_secret,
    'response' => $response,
    'remoteip' => $remoteip
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($verify_url, false, $context);
$response_data = json_decode($result);

header('Content-Type: application/json');
if ($response_data->success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'errors' => $response_data->{'error-codes'}]);
}
?>
