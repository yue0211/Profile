// js原生語法
// window.onload=function(){
//      alert("hi");
// };


// let noodles="https://storage.googleapis.com/www-cw-com-tw/article/202109/article-613031bda0783.jpg";
// let dumplings="https://thumb.photo-ac.com/91/91d11bb2c87436f94a03ed3f631893ac_t.jpeg";
// let rice="https://www.shutterstock.com/image-photo/close-fresh-boiled-dumplings-traditional-260nw-1846392346.jpg";   
let imgurl = [ 
    "https://storage.googleapis.com/www-cw-com-tw/article/202109/article-613031bda0783.jpg",
    "https://thumb.photo-ac.com/91/91d11bb2c87436f94a03ed3f631893ac_t.jpeg",
    "https://www.shutterstock.com/image-photo/close-fresh-boiled-dumplings-traditional-260nw-1846392346.jpg"
];



//jquery語法
$(function(){

    
    //input元件，綁定click事件
    $("input").on("click",function(){
        // alert("hi");
        // $("h1").text("Hello");
        // $("h1").text($("li:first").text());
        let numberOfListItem = $("li").length;  //li有三個
        let randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        console.log(randomChildNumber);
        $("h1").text($("li").eq(randomChildNumber).text());

        
        //設定圖片
        $("img:hidden").show();
        $("img").attr("src",imgurl[randomChildNumber]);
        

    })

})




