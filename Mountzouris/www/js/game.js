
$(function() {
        draw_empty_game();
        fill_game();
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
    
        
    var t1 ='<table id="mountzouris_2" style=" position:absolute; width: 1306px; height: 143px; left: 4px; top: 0px;">';
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

/*
function fill_game() {  
    $.ajax({url: 'mountzouris.php/trapoula/', method:'get' ,success: fill_board_by_data});
    }

function fill_board_by_data(data){ 
    for (var i=0;i<=1;i++){
        console.log('mpika2');
       
        var o =data[i];   
        //if(o.number_player=1){
        var id = '#square_1'+'_'+ i; 
        var c = (o.symbol!=null)?o.index + o.symbol:'';
        $(id).addClass(o.index+'_square').html(c);
       // }else{
            var id1 = '#square_2'+'_'+ i; 
            var c1 = (o.symbol!=null)?o.index + o.symbol:'';
            $(id1).addClass(o.index+'_square').html(c1);
        //}
    }


}*/