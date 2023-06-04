let Animejson="";

$(function(){


    // 跳轉到漫畫
    $('#comic').on('click', function() {
        window.location.href = 'index.html';
        $('#comic').css('background-color', '#6166B3');
    });


    // 跳轉到新番行事曆
    $('#anime').on('click', function() {
        $('#anime').css('background-color', '#6166B3');
        window.location.href = 'anime.html';
    });


    // 創建深色模式按鈕
    let lightbtn = document.createElement('img');
    lightbtn.id="lightbtn";
    lightbtn.src = 'dark-mode.png';
    document.body.appendChild(lightbtn);
    lightbtn.addEventListener('click', function() {
      
      if($('body').css('background-color')=="rgb(238, 227, 203)")
      {
        $('body').css('background-color', '#FFFFFFFF');
        $('.navbar').css('background-color', '#f1f1f1');
      }
      else
      {
        $('body').css('background-color', '#EEE3CB');
        $('.navbar').css('background-color', '#967E76');
      }
      
    });



    $.ajax({
        url: 'https://api.jsonstorage.net/v1/json/ed324453-ff9a-490e-b380-6b3f0bb931ae/f938fd06-ece7-4de7-b7b6-f34ebd399293',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          // console.log(response);
          Animejson = response;
          console.log(Animejson.season[2]["name"]);
          console.log($("#date").val());
          for(let i=0;i<Animejson.season.length;i++)
          {
            if(Animejson.season[i]["update"]==$("#date").val())
            {
                let newRow = document.createElement("tr");
                let cell1 = document.createElement("td");
                let cell2 = document.createElement("td");
                let cell3 = document.createElement("td");
                cell1.textContent = Animejson.season[i]["name"];
                cell2.textContent = Animejson.season[i]["first"];
                cell3.textContent = Animejson.season[i]["update"];
                newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
                $("#myTableBody")[0].appendChild(newRow);
            }

            
          }
    
        },
        error: function(error) {
          console.error(error);
          console.error("fuck");
        }
    });

    $("#date").on("change",function(){

        console.log("change");
        let table=$("#myTable");
        let oldTbody=$("#myTableBody");
        let newTbody = document.createElement("tbody");
        newTbody.id="myTableBody";
        
        for(let i=0;i<Animejson.season.length;i++)
        {
            if(Animejson.season[i]["update"]==$("#date").val())
            {
                let newRow = document.createElement("tr");
                let cell1 = document.createElement("td");
                let cell2 = document.createElement("td");
                let cell3 = document.createElement("td");
                cell1.textContent = Animejson.season[i]["name"];
                cell2.textContent = Animejson.season[i]["first"];
                cell3.textContent = Animejson.season[i]["update"];
                newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
                newTbody.appendChild(newRow);
            }
        }
        
        table[0].replaceChild(newTbody, oldTbody[0]);

    });










});