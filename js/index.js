$(function(){
    var $liPro=$("li.pro"),$navPro=$("li.pro>a"),$proList=$(".product-list"),$top=$(".top"),$log=$(".logo>img");
    var flag=-1;
    //导航产品点击事件
    $navPro.click(function(){
        flag*=-1;
        if(flag>0){
            $liPro.css({"background":"url(images/arrow_up.png) no-repeat 90% 50%"});
            $top.addClass("top-bg");
           /* $top.animate({"background":"rgba(255,255,255,1)"},400);*/
            $log.attr("src","images/logo1.png");
           /* $proList.addClass("pro-show");*/
            $proList.delay(300).animate({"top":"80","bottom":"auto","opacity":"1"},400);
        }else{
            if($(window).scrollTop()<=80){
                changeOrange();
            }else{
                changeWhite();
            }
           /* $proList.removeClass("pro-show");*/
            $proList.delay(0).animate({"bottom":"80","top":"-183"},400);
        }
    });
    //滚动条滚动，导航状态
    var showC=false,timer3=200;
    $(window).scroll(function(){
        if($proList.hasClass("pro-show")){
            flag=-1;
            $proList.removeClass("pro-show");
        }
        if($(this).scrollTop()>80){
            $top.addClass("top-bg");
            changeWhite();
        }else{
            changeOrange();
        }
        //一切为你
        var showTop=$("#for-you").offset().top-window.innerHeight/2;
        if($(this).scrollTop()>=showTop){
            if(!showC){
                showForYou();
                showC=true;
            }
        }
    });
    function changeOrange(){
        $top.removeClass("top-bg");
        $liPro.css({"background":"url('images/arrow_down.png') no-repeat 90% 55%"});
        $log.attr("src","images/logo2.png");
    }
    function changeWhite(){
        $liPro.css({"background":"url('images/arrow_up2.png') no-repeat 90% 50%"});
        $log.attr("src","images/logo1.png");
    }
    //banner轮播
   /* var $banner=$(".banner"),$banLis=$(".banner>ul>li"),index= 0,$span=$("#tip>span");
    function changeTip(index){
        $span.removeClass("select");
        //$("#tip>span:eq("+index+")").addClass("select");
        $span.eq(index).addClass("select");

    }
    $span.click(function(){
        index=$(this).index()-1;
        clearInterval($banner.timer);
        autoPlay();
    });
    function autoPlay(){
        index++;
        if(index>=$banLis.length){
            index=0;
        }
        //var cur=$(".banner>ul>li:eq("+index+")");
        var cur=$banLis.eq(index);
        cur.animate({"opacity":1},400);
        cur.siblings().animate({"opacity":0},400);
        changeTip(index);
    }
    $banner.timer=window.setInterval(function(){
        autoPlay();
    },3000);
    $banner.mouseenter(function(){
        clearInterval($banner.timer);
    });
    $banner.mouseleave(function(){
        $banner.timer=window.setInterval(function(){
            autoPlay();
        },3000);
    });*/
    //面向对象的方法，轮播图
    function BannerLoop(ban,lis,spa){
        this.banner=ban;
        this.banList=lis;
        this.span=spa;
        this.index=0;
        var _this=this;

        this.span.click(function(){
            _this.index=$(this).index()-1;
            clearInterval( _this.banner.timer);
            _this.autoPlay();
        });

        this.banner.timer=window.setInterval(function(){
            _this.autoPlay();
        },3000);

        this.banner.mouseenter(function(){
            clearInterval(_this.banner.timer);
        });
        this.banner.mouseleave(function(){
            _this.banner.timer=window.setInterval(function(){
                _this.autoPlay();
            },3000);
        });
    }
    BannerLoop.prototype.changeTip=function(index){
        this.span.removeClass("select");
        this.span.eq(index).addClass("select");
    };
    BannerLoop.prototype.autoPlay=function(){
        this.index++;
        if(this.index>=this.banList.length){
            this.index=0;
        }
        //var cur=$(".banner>ul>li:eq("+index+")");
        var cur=this.banList.eq(this.index);
        cur.animate({"opacity":1},400);
        cur.siblings().animate({"opacity":0},400);
        this.changeTip(this.index);
    };

    var $banner=$(".banner"),$banLis=$(".banner>ul>li"),$span=$("#tip>span");
    var $banner2=$(".banner2"),$banLis2=$(".banner2>ul>li"),$span2=$("#tip2>span");
    new BannerLoop($banner,$banLis,$span);
    new BannerLoop($banner2,$banLis2,$span2);

    //一切为你
    var $forLis=$(".for-you>li"),timer1=null,timer2=null;
    //1、当在可视区域，动态展现
    $forLis.each(function(i,cur){
        if(i%2==0){
            cur.left=parseFloat($forLis.eq(i).css("left"));
            $forLis.eq(i).css({"left":cur.left+50});
            return;
        }
        cur.left2=parseFloat($forLis.eq(i).css("left"));
        $forLis.eq(i).css({"left":cur.left2-50});
    });
    function showForYou(){
        $forLis.each(function(i,cur){
            timer3+=70;
            timer3*=0.97;
            window.setTimeout(function(){
                if(i%2==0){
                    $forLis.eq(i).animate({"left":cur.left,"opacity":1},400);
                    return;
                }
                $forLis.eq(i).animate({"left":cur.left2,"opacity":1},400);
            },timer3);
        });
    }
    if($(window).scrollTop()>=$("#for-you").offset().top-window.innerHeight/2){
        showForYou();
    }
    //2、点击出现光晕
    function removeSelect(aryList,index,cName){
        aryList.eq(index).removeClass(cName);
    }
    $forLis.click(function(){
        clearTimeout(timer1);
         clearTimeout(timer2);
        var forIndex=$(this).index();
        $(this).addClass("select");
        timer2=window.setTimeout(function(){
            removeSelect($forLis,forIndex,"select");
        },200+450);
        var timer=200,totTimer=timer;
        $forLis.each(function(i){
            timer+=200;
            timer*=0.9;
            totTimer+=timer;
           if(i==forIndex) {
               return;
           }
            timer1=window.setTimeout(function(){
                $forLis.eq(i).addClass("select");
            },timer);
            timer2=window.setTimeout(function(){
                removeSelect($forLis,i,"select");
            },timer+450);
        });

    });
    //页脚的二维码弹出
    var $ewmSpan=$(".footer-sm>span");
    var $ewmDiv=$(".footer-sm>span>div");
    var timer1=null;
    $ewmSpan.on("mouseenter",function(){
        clearTimeout(timer1);
        $(this).siblings("span").find("div").hide();
        $(this).find("div").show();
    });
    $ewmDiv.on("mouseenter",function(){
        $(this).show();
    });
    $ewmSpan.on("mouseleave",function(){
        var $_this=$(this);
        timer1=window.setTimeout(function(){
            $_this.find("div").hide();
        },300);
    });
    //小于560px时的操作
    var winW=document.documentElement.clientWidth||document.body.clientWidth;
    if(winW<=560){
        //导航隐藏，点击右侧按钮，显示导航
        $(".top>.after").on("click",function(){
            $(".nav").slideToggle();
        });
        //页脚信息，点击主标题，显示内容
        var $dt=$(".footer>.main>dl>dt");
        $dt.on("click",function(){
            $(this).siblings("dd").toggle();
            $(this).toggleClass("show");
            $(this).parent().siblings("dl").find("dd").hide();
            $(this).parent().siblings("dl").find("dt").removeClass("show");
        })
    }
    //判断浏览器的IE版本
    var navi=(function(){
        //如果为true,则浏览器版本为IE6、7、8
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0")
        {
            return true;
        }
        else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0")
        {
            return true;
        }
        else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")
        {
            console.log("8");
            return true;
        }
        return false;
    })();
    if(navi){
       $(".for-you").addClass("for-you-bg");
    }

});