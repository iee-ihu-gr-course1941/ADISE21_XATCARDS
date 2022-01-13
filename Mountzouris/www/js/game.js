var me={};
var game_status={};

$(function() { 
        $('#login').click(login_to_game);
        $('#do_move').click(do_move);
        $('#reset').click(reset);
        //$('#move_div').hide();
        game_status_update;
    });
    

function draw_empty_game(){
  
        var t ='<table id="mountzouris_1" style=" position:absolute; width: 1306px; height: 132px; left: 4px; top: 384px;">';
        for (var i=1;i<2;i++){
            t+='<tr>';
            for (var j=1;j<=21;j++){
        t+='<td id="square_'+i+'_'+j+'"> </td>';
    }//+ i +','+j+'
    t+='</tr>';
        }
        
        t+='</table>';

    $('#trapoula_board').html(t);
    
        
    var t1 ='<table id="mountzouris_2" style=" position:absolute; width: 1306px; height: 143px; left: 4px; top: 100px;">';
    for (var i=2;i<=2;i++){

        t1+='<tr>';
        for (var j=1;j<=21;j++){
            
    t1+='<td id="square_'+i+'_'+j+'"></td>';
}
t1+='</tr>';
    }
    
    t1+='</table>';

$('#trapoula_board2').html(t1);



  var t3 = '<table id="mountzouris_3" style=" position:absolute; width: 213px; height: 143px; left: 511px; top: 243px;">'
  t3+='<tr>';
 t3+='<td id="fyllo1">ΦΥΛΛΟ 1</td>';
 t3+='<td id="fyllo2">ΦΥΛΛΟ 2</td>';

 $('#rixnw_fyllo').html(t3);

}

function fill_game() {  
    $.ajax({url: 'mountzouris.php/trapoula/', method:'get',headers: {"X-Token": me.token} ,success: fill_board_by_data});
   
    }

function fill_board_by_data(data){ 
    var j=1;
    var k=1;
    
    if(me.number_player == '1'){
    for (var i=0;i<=data.length;i++){
        var o = data[i];   
        
        if(o.number_player==null){  
        var id = '#square_2'+'_'+ k; 
            var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
            //var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/'+c+'.webp">':'';
            var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/back.jpg">':'';
            $(id).addClass(o.index+'_square').html(im);
            k=k+1; 
            $('#fyllo1').html(im);
        $('#fyllo2').html(im);
        }
        else{
            var id = '#square_1'+'_'+ j; 
        var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
        var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px; top: 100px; " class="fullo" src="images/'+c+'.webp">':'';
        $(id).addClass(o.index+'_square').html(im);
       
        j=j+1
        }
    }

}else{
    j=1;
    k=1;
    for (var i=0;i<=data.length;i++){
        var o = data[i];   
        
        if(o.number_player==null){  
        var id = '#square_1'+'_'+ j; 
            var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
            var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top:100px;" class="fullo" src="images/'+c+'.webp">':'';
            //var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/back.jpg">':'';
            $(id).addClass(o.index+'_square').html(im);
            j=j+1;
        }
        else{
            var id = '#square_2'+'_'+ k; 
        var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
        var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/back.jpg">':'';
        //var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px; top: 100px; " class="fullo" src="images/'+c+'.webp">':'';
        
        $(id).addClass(o.index+'_square').html(im);
        $('#fyllo1').html(im);
        $('#fyllo2').html(im);
        k=k+1
        }
    }


}



}
function login_to_game(){
             
            if($('#username').val()=='') {
            alert('You have to set a username');
            return;
            }
            var p_number = $('#number').val();
            
            $.ajax({url: "mountzouris.php/players/"+p_number,
            method: 'PUT',
            dataType: "json",
            headers: {"X-Token": me.token},
            contentType: 'application/json',
            data : JSON.stringify( {username: $('#username').val(),
            number_player: p_number}),
            success: login_result,
            error: login_error});
           
         
      
    }
function login_result(data) {
    
    me = data[0]; 
    $('#game_initializer').hide();
    draw_empty_game(); 
    fill_game();
    update_info();
    game_status_update(); 
}

function login_error(data,y,z,c) {
    var x = data.responseJSON;
       
    alert(x.errormesg);
    }

function update_info(){
    $('#game_info').html("I am Player: "+me.number_player+", my name is "
    +me.username+'<br>Token='+me.token+'<br>Game state: '+game_status.status+', '+game_status.p_turn+' must play now.');
            
    }

 function game_status_update() {  
    $.ajax({url: 'mountzouris.php/status/',headers: {"X-Token": me.token}, success: update_status });
           
    }

    function update_status(data){
        game_status=data[0];
        update_info();
        if(game_status.p_turn==me.number_player && me.number_player!=null) {
            x=0;
            //do play
            //$(#move_div).show(1000);
            setTimeout(function() { game_status_update();}, 15000);
        }else{
                //must wait for something
                // $('#move_div').hide(1000);
                setTimeout(function()  { game_status_update();}, 4000);
            }
    }



function do_move(){

    console.log(me.number_player);
    var s = $('#move_input').val();

    var a = s.trim().split(/[ ]+/);
    if(a.length!=4) {
        alert('Give Number and Suit');
        return;
    }

    if(a[0] == a[2]){
        var id = '#fyllo1'; 
        var c = a[0] +"_"+ a[1];
        //var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/back.jpg">':'';
        var im = '<img style=" position:absolute; width: 60px; height: 90px;  class="fullo" src="images/'+c+'.webp">';

        $(id).html(im);
        var id = '#fyllo2'; 
        var c = a[2] +"_"+ a[3];
        //var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/back.jpg">':'';
        var im = '<img style=" position:absolute; width: 60px; height: 90px;  class="fullo" src="images/'+c+'.webp">';
        $(id).html(im);

    }
   /* $.ajax({url: "mountzouris.php/trapoula/fyllo/"+a[0]+'/'+a[1],
    method: 'PUT',
    dataType: "json",
    headers: {"X-Token": me.token},
    contentType: 'application/json',
    data : JSON.stringify( {number_player: null}),
    success: move_result,
    error: login_error});*/
    
}

function move_result(data){

}


            

