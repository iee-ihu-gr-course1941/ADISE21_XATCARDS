var me={};
var game_status={};

$(function() {
        //draw_empty_game();       
        //fill_game();
        $('#login').click(login_to_game);
    });
    

function draw_empty_game(){
  
        var t ='<table id="mountzouris_1" style=" position:absolute; width: 1306px; height: 132px; left: 4px; top: 384px;">';
        for (var i=1;i<2;i++){
            t+='<tr>';
            for (var j=1;j<21;j++){
        t+='<td id="square_'+i+'_'+j+'">' + i +','+j+'</td>';
    }
    t+='</tr>';
        }
        
        t+='</table>';

    $('#trapoula_board').html(t);
    
        
    var t1 ='<table id="mountzouris_2" style=" position:absolute; width: 1306px; height: 143px; left: 4px; top: 100px;">';
    for (var i=2;i<=2;i++){

        t1+='<tr>';
        for (var j=1;j<=21;j++){
            
    t1+='<td id="square_'+i+'_'+j+'">' + i +','+j+'</td>';
}
t1+='</tr>';
    }
    
    t1+='</table>';

$('#trapoula_board2').html(t1);
}

function fill_game() {  
    $.ajax({url: 'mountzouris.php/trapoula/', method:'get' ,success: fill_board_by_data});
   
    }

function fill_board_by_data(data){ 
    var j=1;
    var k=1;
    
    for (var i=0;i<=data.length;i++){
        var o = data[i];   
        
        if(o.number_player==null){  
        var id = '#square_2'+'_'+ k; 
            var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
            var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/'+c+'.webp">':'';
            $(id).addClass(o.index+'_square').html(im);
            k=k+1;
        }
        else{
            var id = '#square_1'+'_'+ j; 
        var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
        var im = (o.symbol!=null)?'<img style=" position:absolute; width: 60px; height: 90px; top: 100px; " class="fullo" src="images/'+c+'.webp">':'';
        $(id).addClass(o.index+'_square').html(im);
        j=j+1
        }
    }

}
function login_to_game(){
            
           
        
            //if($('#username').val()=='') {
            //alert('You have to set a username');
           // return;
           // }
            var p_number = $('#number').val();
            
            $.ajax({url: "mountzouris.php/players/"+p_number,
            method: 'PUT',
            dataType: "json",
            contentType: 'application/json',
            data : JSON.stringify( {username: $('#username').val(),
            number_player: p_number}),
            success: login_result,
            error: login_error});
            draw_empty_game(); 
            fill_game();
         
      
    }
function login_result(data) {
    
    me = data[0]; 
    $('#game_initializer').hide();
    //update_info();
    //game_start();    
}

    function login_error(data,y,z,c) {
        var x = data.responseJSON;
       
        alert(x.errormesg);
        }
        