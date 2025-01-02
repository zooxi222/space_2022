$(document).ready(function(){

    var fixedNavBtn = $('.fixed-nav'); 
    var scrollDown = $('.scrollDown');
    var profile = $('.profileimg');
    if($('#fullpage').length){

      new fullpage('#fullpage', {
      autoScrolling:true,
      scrollHorizontally: true,
      responsiveWidth: 1200,
      responsiveHeight : 700,
            
      anchors:['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
        afterLoad: function(origin, destination, direction){            
            fixedNavBtn.find('a').removeClass('active');
            fixedNavBtn.find('a').eq(destination.index).addClass('active');
            
            if(destination.index == 0){
              fixedNavBtn.fadeOut();
            } else{
              fixedNavBtn.fadeIn();
            }   
            
            if(destination.index == 1){
              // console.log("1dlek")
              profile.addClass('active');
            } else{
              profile.removeClass('active');
            }

            if(destination.index == 2){
              if($('.section.third').hasClass('animate') == false){
                startProgress(thirdCss,'#ff7f00','0.95'); 
                startProgress(thirdJquery,'#b38f6b','0.9'); 
                startProgress(thirdJavascript,'#f4cbad','0.7'); 
                startProgress(thirdPs,'#69d8ff','0.95'); 
                startProgress(thirdFigma,'#ffd75d','0.95'); 
                startProgress(thirdHtml,'#b13f34','0.98'); 
              }
            }
                  
          
                  
        } 
                
                
    }); //풀페이지 
       

    var thirdP = $('.circle');

    thirdP.click(function(){
      var dataTarget = $(this).attr('data-target');
      $('.circle_dist').text(dataTarget);
    });

    $(".section.first .title").addClass("show");
        
  } //if length 풀페이지     

}); // 제쿼리 끝 


function showProject(el, sta1, sta2) {
  //홈피는 없고 상세이미지만 있음
  var srtt = el.id;
  putItem(srtt.substr(3));

  document.getElementById("goHomepage").style.display = sta1;
  document.querySelector(".detail_wrap").style.display = sta2;
  document.getElementById("pjLayer").classList.add("show");
  location.href = "#firstSection";
}

function closedProject(){
  location.href = "#fourthSection";
  document.getElementById("pjLayer").classList.remove("show");

}

function putItem(div) {
  var project = [];
  $.ajax({
    url : '../project.json',
    type : 'get',
    datatype : 'json',
    success : function(result) {
      project = result;
      var array = Object.keys(result)
      for(var i = 0; i < array.length; i++) {
        // console.log(array[i] == div)
        if(array[i] == div) {
          document.getElementById("goHomepage").setAttribute("href",project[div].link);
          document.getElementById("title").innerText = project[div].title;
          document.getElementById("date").innerText = project[div].date;
          document.getElementById("part").innerText = project[div].part;
          document.getElementById("lang").innerText = project[div].lang;
          document.getElementById("useTool").innerText = project[div].useTool;
          document.getElementById("info").innerText = project[div].description;
          document.getElementById("memo").innerText = project[div].memo;
          document.getElementById("thumb").setAttribute("src",project[div].src);
          getImg(div,project[div].count);
        }
      }
    }
  })
}

let list = $(".required");

list.each(function(idx,el){
  if($(el).val() == '' || $(el).find('option').length == 0) {
      alert($(el).attr('txt') + "값은 필수 입력값 입니다.");
      return;
  }
})


function getImg(title,num) {
  var src = [];
  var length = Number(num) + 1;
  
  for(var i = 1; i < length; i++) {
    src += "<img src='images/project/" + title + "-0" + i + ".png'/>";
    document.getElementById("projects_img").innerHTML = src;
  }
  // console.log(num, src)
  
}


var skill;
//프로그레스바 시작
function startProgress(item,color,value) {
    $('.section.third').addClass("animate");
    autoProgress(item, color);
    skill.text.style.fontFamily = 'S-Core Dream 5';
    skill.text.style.fontSize = '1.5rem';
    // skill.text.style.top = top;
    // skill.text.style.left = left;
    skill.text.style.color = color;

    skill.animate(value);  // Number from 0.0 to 1.0

}
// 프로그레스바 상세
function autoProgress(id, bg) {
    // console.log(id)
    skill = new ProgressBar.Circle(id, {
        color: bg,
        strokeWidth: 10,
        duration: 2000,
        text: { autoStyleContainer: false },
        from: { color: bg, width: 10 },
        to: { color: bg, width: 10 },

        step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + '%');
            }
        }
    });
}