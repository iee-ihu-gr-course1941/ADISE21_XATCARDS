<?php


function show_fyllo($x,$y){
    global $mysqli;

    $sql = 'select * from trapoula where index=? and number_player=?';
    $st = $mysqli->prepare($sql);
    $st->bind_param('ss',$x,$y);
    $st->execute();
    $res = $st->get_result();
    header('Content-type: application/json');
    print json_encode($res->fetch_all(MYSQLI_ASSOC), JSON_PRETTY_PRINT);
}


function show_trapoula($input){
    global $mysqli;

$b=current_number($input['token']);
if($b){
    show_trapoula_by_player($b);

}else{
    header('Content-type: application/json');
    print json_encode(read_trapoula() , JSON_PRETTY_PRINT);

}
    
}
/*
function reset(){
    global $mysqli;
    $sql = 'call delete_trapoula';
    $mysqli->query($sql);
}*/

function read_trapoula(){
    global $mysqli;

    $sql = 'select * from trapoula';
    $st = $mysqli->prepare($sql);

    $st->execute();
    $res = $st->get_result();

   return($res->fetch_all(MYSQLI_ASSOC));

}

function  show_trapoula_by_player($b){
   global $mysqli;

    $orig_board=read_trapoula();
    $trapoula=convert_trapoula($orig_board);
    $status = read_status();
    if($status['status']=='started' && $status['p_turn']==$b && $b!=null){
        $n = add_valid_moves_to_board($trapoula,$b);

    }header('Content-type: application/json');
    print json_encode($orig_board, JSON_PRETTY_PRINT);


}

function add_valid_moves_to_board(&$trapoula,$b){
    $number_of_moves=0;

    for($x=1;$x<=21;$x++){
        $number_of_moves+=add_valid_moves($trapoula,$b,$x);
    }
return($number_of_moves);
}

function add_valid_moves(&$trapoula,$b,$x){

  

}

    function convert_trapoula(&$orig_board){/*
       $trapoula=[];
        foreach($orig_trapoula as $i=>&$row) {
            $trapoula[$row['x']][$row['y']] = &$row;
        }
        return ($board);*/
    }

 function move_fyllo($x,$y,$token){

    if($token==null || $token=''){
        header("HTTP/1.1 400 Bad Request");
        print json_encode(['errormesg'=>"token is not set"]);
        exit;
    }
    $number = current_number($token);
    if($number==null){
        header("HTTP/1.1 400 Bad Request");
        print json_encode(['errormesg'=>"You are not a player of this game"]);
        exit;
    }

    $status = read_status();
    if($status['status']!='started'){
        header("HTTP/1.1 400 Bad Request");
        print json_encode(['errormesg'=>"Game is not action"]);
        exit;
    }
    if($status['p_turn']!=$number){
        header("HTTP/1.1 400 Bad Request");
        print json_encode(['errormesg'=>"It is not your turn"]);
        exit;
 }}

?>