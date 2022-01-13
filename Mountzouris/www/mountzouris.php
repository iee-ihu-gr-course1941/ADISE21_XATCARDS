<?php
require_once "../lib/dbconnect.php";
require_once "../lib/trapoula.php";
require_once "../lib/game_status.php";
require_once "../lib/users.php";


$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

if(isset($_SERVER['HTTP_X_TOKEN'])){
    $input['token']=$_SERVER['HTTP_X_TOKEN'];
}else{
    $input['token']='';
}

//header('Content-Type: text/plain');
//print "method=$method"."\n";
//print "path_info=".$_SERVER['PATH_INFO']."\n";
//print_r($request);

switch($r=array_shift($request)){
    case "trapoula" :
        switch ($b=array_shift($request)){
            case '':
                
            case null: handle_trapoula($method,$input);
                            break;
            case 'fullo' : handle_fullo($method, $request[0],$request[1],$input);
                break;
            }
            break;                    
      
    case "status" :
        if(sizeof($request)==0) {
            handle_status($method);}
        else {
            header("HTTP/1.1 404 Not found");}
        break;
    case 'players': handle_player($method, $request,$input);
        break;
    default: header("HTTP/1.1 404 Not Found");
            exit;

                
}

function handle_trapoula($method,$input){
    if($method=='GET'){
        show_trapoula($input);
    }else if ($method=='POST'){
        //reset_trapoula();
        show_trapoula($input);
    }else {
        header("HTTP/1.1 405 Method Not Allowed");

    }
}

function handle_fullo($method,$x,$y,$input){
    if($method=='GET'){
        show_fyllo($x,$y);
    }else if($method=='PUT'){
       // move_fyllo($x,$y,$input['x'],$)
    }
}

    function handle_player($method, $p,$input){
        switch ($b=array_shift($p)){
           case '':
           case null: if($method=='GET') {show_users($method);} 
                        else {header("HTTP/1.1 400 Bad Request");
                        print json_encode(['errormesg'=>"Method
                        $method not allowed here."]);}
            break;
            case '1':
            case '2': handle_user($method,$b,$input);
                        break;
            default: header("HTTP/1.1 404 Not Found");
                     print json_encode(['errormesg'=>"Player $b not found."]);
                     break;                        
        }

    }

    function handle_status($method){
        if($method=='GET'){
            show_status();
        }else {
            header("HTTP/1.1 405 Method Not Allowed");
        }
    }

?>