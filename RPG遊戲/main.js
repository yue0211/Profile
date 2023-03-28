//全域變數
let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 200;

//方便載入多張圖片
function loadImages(sources, callback) {  
    let images = {};
    let loadedImages = 0;
    let numImages = 0;
    // get num of sources
    for(let src in sources) {
      numImages++;
    }
    for(let src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }

}




//initial
$(function(){
    // 0:可以走, 1:山, 2:終點, 3:有敵人
    mapArray = [
        [0, 1, 1],
        [0, 0, 0],
        [3, 1, 2]
    ];
                                                
    ctx = $("#myCanvas")[0].getContext("2d");  // 只要有$字號，皆為jquery語法。
                                               // 因為getContext是javascript語法，因此jquery若要用getContext必須要打[0]。

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";

    currentImgMain = {  //物件
        x:0,    //x和y也可以省略雙引號(因為只有一個字)
        y:0
    };

    // 為了確保圖片真的有載入，才能畫圖
    imgMain.onload = function(){

        // 0,0:真實圖片的位置
        // 80,130 : 要裁切的真實圖片的寬、高。
        //currentImgMain:圖片放在canvas的位置。
        // gridLength:圖片縮放的比例
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        // ctx.drawImage(imgMain,360,0,80,130,200,currentImgMain.y,gridLength,gridLength*3);
    };
    

    let sources = {
        mountain: "images/material.png",
        enemy: "images/Enemy.png"
    };

    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
    });


    /*imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";

    imgMountain.onload = function(){       //載入圖片，效率較差的寫法

        imgEnemy.onload = function(){

            for(let x in mapArray)
                for(let y in mapArray[x])
                    if(mapArray[x][y]==1)
                        ctx.drawImage(imgMountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    else if(mapArray[x][y]==3)
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);

        };

    };*/






});


$(document).on("keydown",function(event){

    console.log(event.key);
    event.preventDefault() //避免方向鍵捲動螢幕

    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {
        x:-1,
        y:-1
    };
    targetBlock = {
        x:-1,
        y:-1
    };


    switch(event.code){
        case "ArrowLeft":  //臉朝左
            targetImg.x = currentImgMain.x - gridLength;  
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":  //臉朝上
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight": //臉朝右
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown": //臉朝下
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x <= 400 && targetImg.x >=0 && targetImg.y <= 400 && targetImg.y >=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);  //清除舊的圖片

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2: // 終點
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //敵人
                $("#talkBox").text("哈摟");
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});
