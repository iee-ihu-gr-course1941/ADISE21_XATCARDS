
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
            var im = (o.symbol!=null)?'<img style=" width: 60px; height: 90px;  top: 0px;" class="fullo" src="images/'+c+'.webp">':'';
            $(id).addClass(o.index+'_square').html(im);
            k=k+1;
        }
        else{
            var id = '#square_1'+'_'+ j; 
        var c = (o.symbol!=null)?o.index +"_"+ o.symbol:'';
        var im = (o.symbol!=null)?'<img style=" width: 60px; height: 90px; " class="fullo" src="images/'+c+'.webp">':'';
        $(id).addClass(o.index+'_square').html(im);
        j=j+1
        }
    }


}