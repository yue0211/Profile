$(function(){

    //儲存目前作答到第幾題
    let currentQuiz=null;

    //當按鈕按下後，要做的事情
    $("#startButton").on("click",function(){
        
        
        if(currentQuiz==null) //如果還沒開始作答就從這裡開始
        {
            currentQuiz = 0;
            $("#question").text(questions[0].question); //顯示題目
            $("#options").empty();
            questions[0].answers.forEach(function(element,index,array){

                $("#options").append(
                    
                    `<input name="options" type="radio" value="${index}"><label>${element[0]}</label><br><br>`
                );
            });

            $("#startButton").attr("value","Next");

        }
        else //已經開始作答從這邊繼續
        {
            //抓取畫面上所有的radio元件
            $.each($(":radio"),function(i,val){ 
                
                // console.log(i+" : "+ val.checked);
                
                if(val.checked)
                {
                    //是否已走到最後,要產生結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1]))
                    {
                        let finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();//將選項區域清空
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else
                    {
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;
                        $("#question").text(questions[currentQuiz].question)
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){

                            $("#options").append(
                                
                                `<input name="options" type="radio" value="${index}"><label>${element[0]}</label><br><br>`
                            );
                        });

                    }

                    return false; // 跳離jquery的迴圈(因為已找到,使用者選的選項)

                }



            });



        }


    });




});