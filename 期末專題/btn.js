
function getNextEpisode(dictionary, currentIndex) {
    let foundCurrentIndex = false;
  
    for (var key in dictionary) {
      if (foundCurrentIndex) {
        return key;
      }
      
      if (key === currentIndex) {
        foundCurrentIndex = true;
      }
    }
  
    return null; // 找不到下一個索引
}


function getPreviousEpisode(dictionary, currentKey) {
  const keys = Object.keys(dictionary);
  const currentIndex = keys.indexOf(currentKey);
  const previousIndex = currentIndex - 1;

  if (previousIndex >= 0) {
    return keys[previousIndex];
  }

  return null;
}



$(function(){


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
    
    //---------------------------------------------------------
    // 建立回到頂部的按鈕
    let scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.textContent = '↑';
    document.body.appendChild(scrollToTopBtn);

    // 監聽視窗捲動事件
    window.addEventListener('scroll', function() {
      // 如果捲動的高度超過 500px，顯示按鈕，否則隱藏按鈕
      if (window.pageYOffset > 100) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });

    // 點擊按鈕後回到頁面頂端
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    //---------------------------------------------------------

    // 建立看下一集頁面的按鈕
    let nextEpisode = document.createElement('div');
    nextEpisode.id = 'nextEpisode';
    nextEpisode.textContent = '➝';
    document.body.appendChild(nextEpisode);

    // 監聽視窗捲動事件
    window.addEventListener('scroll', function() {
      // 如果捲動的高度超過 500px，顯示按鈕，否則隱藏按鈕
      if (window.pageYOffset > 100) {
        nextEpisode.style.display = 'block';
      } else {
        nextEpisode.style.display = 'none';
      }
    });

    // 點擊按鈕後回到頁面頂端
    nextEpisode.addEventListener('click', function() {
        console.log(episode);
        console.log(page);
        console.log(url);
        $('#imageContainer').empty();


        let nextE=getNextEpisode(jsonData.comic[index]["pages"], episode);

        if(nextE==null)
        {
          $('#titleEpisode').text("目前已無下一集");
          $('#update').text("目前已無下一集");
        }
        else
        {
            console.log(nextE);
            page=jsonData.comic[index]["pages"][nextE];
            url=jsonData.comic[index]["comicImgUrl"];
            Name=jsonData.comic[index]["name"]
            $('#titleName').text(Name);
            $('#titleEpisode').text(nextE);
            

            url = url+nextE.replace(/\D/g, "")+"/";
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
                console.log("fuck");
            }

            episode=nextE;
        }
        

    });


    //---------------------------------------------------------
    // 建立看上一集頁面按鈕的 HTML 元素
    let previousEpisode = document.createElement('div');
    previousEpisode.id = 'previousEpisode';
    previousEpisode.textContent = '←';
    document.body.appendChild(previousEpisode);

    // 監聽視窗捲動事件
    window.addEventListener('scroll', function() {
      // 如果捲動的高度超過 500px，顯示按鈕，否則隱藏按鈕
      if (window.pageYOffset > 100) {
        previousEpisode.style.display = 'block';
      } else {
        previousEpisode.style.display = 'none';
      }
    });

    // 點擊按鈕後回到頁面頂端
    previousEpisode.addEventListener('click', function() {
        console.log(episode);
        console.log(page);
        console.log(url);
        $('#imageContainer').empty();


        let previousE=getPreviousEpisode(jsonData.comic[index]["pages"], episode);
        console.log(previousE);

        if(previousE==null)
            $('#titleEpisode').text("目前已無前一集");
        else
        {
            console.log(previousE);
            page=jsonData.comic[index]["pages"][previousE];
            url=jsonData.comic[index]["comicImgUrl"];
            Name=jsonData.comic[index]["name"]
            $('#titleName').text(Name);
            $('#titleEpisode').text(previousE);


            url = url+previousE.replace(/\D/g, "")+"/";
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
                console.log("fuck");
            }

            episode=previousE;
        }
      

    });




});