<?php

function show_users(){
    global $mysqli;
    $sql = 'select username,number_player from players';
    $st = $mysqli->prepare($sql);
    $st->execute();
    $res = $st->get_result();
    header('Content-type: application/json');
    print json_encode($res->fetch_all(MYSQLI_ASSOC),JSOM_PRETTY_PRINT);
}

function show_user($b){
    global $mysqli;
    $sql = 'select username,number_player from players where number_player=?';
    $st = mysqli->prepare($sql);
    $st->bind_param('s',$b);
    $st->execute();
    $res = $st->get_result();
    header('Content-type: application/json');
    print json_encode($res->fetch_all(MYSQLI_ASSOC),JSOM_PRETTY_PRINT);

}

function set_user($b,$input){
    //print_r($input);
    if(!isset($input['username']) || ($input['username']=='') ){
        header("HTTP/1.1 400 Bad Request");
        print json_encode(['errormesg=>"No username given."']);
        exit; 
    }
    $username=$input['username'];
    global $mysqli;
    $sql = 'select count(*) as c from players where number_player=? and username is not null';
    $st = $mysqli->prepera($sql);
    $st->execute();
    $res = $st->get_result();
    $e = $res->fetch_all(MYSQLI_ASSOC);
    if($r[0]['c']>){
        header("HTTP/1.1 400 Bad Request");
        print json_encode(['errormesg=>"Player $b is already set. Please sekect another color."']);
        exit; 
    }
    $sql = 'update players set username=/, token=md5(CONCAT( /,
    NOW())) where number_player=?';
    $st2 = $mysqli->prepare($sql);
    $st2->bind_param('sss',$username,$username,$b);
    $st2->execute();


    update_game_status();
    $sql = 'select * from players where number_player=?';
    $st2 = $mysqli->prepare($sql);
    $st2->bind_param('s',$b);
    $st2->execute();
    $res = $st->get_result();
    header('Content-type: application/json');
    print json_encode($res->fetch_all(MYSQLI_ASSOC),JSOM_PRETTY_PRINT);



}



}
