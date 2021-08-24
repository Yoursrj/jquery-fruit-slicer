var playing = false;
var fruits = ['12993', '12995', '20001', '131485', '172302', '196028', '214676', '244870', '293547', '308905'];
var action;//used for setinterval
var trialsleft;
var step;
var score;
$ (document).ready(function () {
    $("#startreset").click(function () {
        if (playing == true) {
            location.reload();
        }
        else {
            playing = true;
            score = 0;
            $("#scorevalue").html(score);

            $("#trialsleft").show();
            trialsleft = 3;
            addhearts();

            //hide gameover box kyuki game has started
            $("#gameover").hide();

            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });
    //We will play animation which will take 500 milliseconds and we will wait during those 500 seconds 
    //and then once the animation is done after 500 then we can play or execute this function.

    //slice a fruit

    $("#fruit1").mouseover(function () {
        score++;
        $("#scorevalue").html(score); //update score
        // document.getElementById("slicesound").play();

        $("#slicesound")[0].play();//play sound

        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode"); //slice fruit

        //send new fruit
        setTimeout(startAction, 1000);
    });

    function addhearts() {
        $("#trialsleft").empty();//jab khali hoga tbahi to bharega
        for (i = 0; i < trialsleft; i++) {
            $("#trialsleft").append('<img src="images/LogoMakr-5qGQhM.png" class="life">');
        }
    }



    //start sending fruits


    function startAction() {
        //generate a fruit
        $("#fruit1").show();
        choosefruit();
        $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });
        //random position

        //generate a random position
        step = 1 + Math.round(5 * Math.random());// generate a step between 1 and 6 

        //move step by every 10ms 
        action = setInterval(function () {
           
            $("#fruit1").css('top', $("#fruit1").position().top + step);
              //check if the fruit is too low
             if ($("#fruit1").position().top > $("#fruitcontainer").height()) {
                //the position of the image is very low as compared to the position of the main container of fruits
                //now if the fruit is low and we have less trials left 
                if (trialsleft > 1) {
                    //generate a fruit

                    $("#fruit1").show();
                    choosefruit();
                    $("#fruit1").css({ 'left': Math.round(550 * Math.random()), 'top': -50 });
                    //random position

                    //generate a random position
                    step = 1 + Math.round(5 * Math.random());// generate a step between 1 and 6

                    //reduce trials by 1
                    trialsleft--;
                    //populate trialsleft box again
                    addhearts();
                }
                else {//gameover
                    playing = false; //we are not playig anymore
                    $("#startreset").html("StartGame");//bujtton firse start game ka ho jayega
                    $("#gameover").show(); //gameover box show ho jayega
                    $("#gameover").html('<p>GAME OVER</p> <p>Your Score Is '+  score  +' </p>');
                    $("#trialsleft").hide();//hearts ka box nahi dikhega once all hearts are finished
                    stopAction();

                }
            }
        }, 10);
    }
    //generate a random fruit
    function choosefruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(9 * Math.random())] + '.png');
    }
    //stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }


}); 