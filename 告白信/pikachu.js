$(function(){


    $("#yes").on("click",function(){

        $("#question").text("要當我女朋友嗎?");
        $("#heart").show();

        console.log("yes");

    });


    $("#no").on("click",function(){

        $("#question").text("我們還是當朋友好了...");
        $("#heart").hide();
        
        console.log("no");
        
    });




});