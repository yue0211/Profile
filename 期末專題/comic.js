let jsonData="";
let index="";
let episode="";
let page="";
let url="";
let Name="";
let update="";



$(function(){

  $.ajax({
    url: 'https://api.jsonstorage.net/v1/json/6ac1356d-f534-42c8-96d0-b02a2d0b8b4c/30fadcf0-af3e-4798-bb6a-43eb9941d7db',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // console.log(response);
      jsonData = response;
      // console.log(jsonData.season[2]["name"]);
      for(let i=0;i<jsonData.comic.length;i++)
      {
        let option = $('<option></option>');
        let name=jsonData.comic[i]["name"];
        option.attr('data-value', i).text(name);
        option.val(name).text(name);
        let select = $('#comicName');
        select.append(option);
      }

    },
    error: function(error) {
      console.error(error);
      console.error("fuck");
    }
  });

  $('#colorMode').on("click",function(){
    
    $('body').css('background-color', '#EEE3CB');
    $('.navbar').css('background-color', '#967E76');
    
  });

  // 跳轉到動漫行事曆
  $('#comic').on('click', function() {
    window.location.href = 'index.html';
    $('#comic').css('background-color', '#6166B3');
  });


  // 跳轉到動漫行事曆
  $('#anime').on('click', function() {
    $('#anime').css('background-color', '#6166B3');
    window.location.href = 'anime.html';
  });

  
  $('#comicNameText').on('change', function() {

      $('#episode').empty();
      let selectedText = $(this).val(); // 获取输入框的值
      let selectedOption = $('#comicName option[value="' + selectedText + '"]');
      index = selectedOption.attr('data-value');
      let placeholderText = "已更新至"+jsonData.comic[index]["update"]+"話";
      $('#number').attr('placeholder', placeholderText);

      for(let page in jsonData.comic[index]["pages"])
      {
        // console.log(page);
        let option = $('<option></option>');
        option.val(page).text(page);
        let select = $('#episode');
        select.append(option);
      }
      

  });

  $('#btn').on('click', function() {

      $('#imageContainer').empty();
      $('#episode').empty();
      $('#titleName').text("");
      $('#titleEpisode').text("");
      
      
      episode=$('#number').val();
      page=jsonData.comic[index]["pages"][episode];
      url=jsonData.comic[index]["comicImgUrl"];
      update=jsonData.comic[index]["update"];
      Name=jsonData.comic[index]["name"];
      $('#titleName').text(Name);
      $('#titleEpisode').text(episode);
      $('#update').text("目前已更新至"+update+"話");
      

      url = url+episode.replace(/\D/g, "")+"/";

      console.log(url);
      tempUrl=url;
      for(let i=1;i<=page;i++)
      {
        if(i<10)
          url=url+"00"+i+".jpg";
        else if(i>=10&&i<100)
          url=url+"0"+i+".jpg";
        else
          url=url+i+".jpg";

        let imgElement = new Image();
        imgElement.src=url;
        imgElement.alt="漫畫圖片";
        

        // 將圖片元素加入到指定的<div>容器中
        $('#imageContainer').append(imgElement);
        console.log(url);
        url=tempUrl;
      }

      $('#comicNameText').val("");
      $('#number').val("");
      $('#number').attr('placeholder',"");
  });

    

});




