$.fn.extend({
    changeBubble: function(text, success){
        var $this = this;
        this.hide('slow', function(){
            $this.html('<p>' + text + '</p>');
            $this.show('slow');
            if(success){
                success();
            }
        })   
    }
})





var answer,
    reply = 'What\'s your name?',
    player,
    start = true,
    count = 0,
    cguess = 1,
    winStreak =0,
    $computerBubble = $('#bubble'),
    $playerBubble = $('#bubbleTwo'),
    $userInput = $('#field'),
    $computerAv = $('#picture img'),
    $playerAv = $('#playerav img');


function bubbleTimeout(elem, time){
        setTimeout(function(){
            elem.hide('slow')
        }, time)
}



function setPlayerAv(text){
    letter = text[0];
    $playerAv.attr('src', 'img/player/' + letter + '.jpg');
}




function round(){
    answer = $userInput.val();
    if(start){
        setPlayerAv(answer);
        start = false;
    };
    $userInput.val("");
    //reset
    if(count > 1 && answer == 'y'){ count = 0}
    else if(count > 1 && answer == 'n'){$('#main').hide('slow')}
    //step 1
    if(count == 0){
        reply = "Let's make this easy. Pick a number from 1-3";
        $userInput.attr('placeholder','1-3')
    } 
    //step 2
    else if(count == 1){
        if(answer == cguess){
            if(winStreak == 0){
                reply = 'YOU WIN, Care to play again?';
                $userInput.attr('placeholder','y/n')
                $computerAv.attr('src','img/medrage.png')
            } else if (winStreak == 1){
                reply = "IMPOSSIBLE! ONE MORE!?";
                $userInput.attr('placeholder','y/n')
                $computerAv.attr('src','img/megarage.png')
            } else if (winStreak == 2){
                reply = "I QUIT";
                $computerAv.attr('src','img/tableflip.png');
                setTimeout(function(){$('#main').hide('slow')},3000)
            }
            winStreak++;
        }else{
            reply = 'YOU LOSE, Care to play again?';
            $userInput.attr('placeholder','y/n')
            $computerAv.attr('src','img/smile.png')
        }
    } 
    if(count < 2){$computerBubble.changeBubble(reply)};
    $playerBubble.changeBubble(answer, bubbleTimeout($playerBubble, 1500));
    count++
}
$(document).ready(function(){
$computerBubble.hide();
$playerBubble.hide();
$computerBubble.changeBubble(reply);
$computerAv.attr('src','img/troll.png');
$userInput.attr('placeholder','text only, don\'t be a jerk.');

//stops enter from submitting
$(window).keydown(function(event){
    if(event.keyCode == 13) {
    event.preventDefault();
    return false;
    }
});

$('#submit').on('click',function(e){
    e.preventDefault;
    round()
});

})

