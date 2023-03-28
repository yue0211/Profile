$(function(){

    
    let topicCount = topic.length;

    //一秒鐘有1000毫秒
    //每分鐘60秒、每小時60分鐘、每天24小時
    let millisecsPerDay = 24*60*60*1000;

    

    $("#button").click(function(){


        $("#courseTable tr").remove();
        
        $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

        for(let x=0;x<topicCount;x++)
        {

            $("#courseTable").append(
                //特別的寫法,類似於python的format寫法(可以放額外變數)
                "<tr>"+
                `<td>${x+1}</td>`+
                `<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().substring(5)}</td>`+
                `<td>${topic[x]}</td>`+
                "</tr>"

            );
            
            $( "tr:even" ).css( "color", "blue" );
            $( "tr:odd" ).css( "color", "red" );

            if(topic[x].toString()=="國定假日")
            {
                var col = 3;
                for(let y=1;y<=col;y++)
                    $( "tr:last td:nth-child("+y+")" ).css( "color", "gray" );
            }
            
        }

        
        

    });


    



})