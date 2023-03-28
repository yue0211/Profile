let topic = [
    "課程介紹",
    "環境安裝&Lab1",
    "國定假日",
    "Lab2 & Lab3",
    "Lab4"
];


let startDate = new Date();

function setMonthAndDay(startMonth,startDay)
{
    
    startDate.setMonth(startMonth-1,startDay); //一次設定好月份與日期
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

}



//程式剛開始會跑進來
$(function(){

    $("#button").click(function(){
        let date = new Date($('#time').val());
        let day = date.getDate();
        let month = date.getMonth() + 1;
        setMonthAndDay(month,day);
    });
    

})







