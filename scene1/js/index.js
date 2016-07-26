/**
 * Created by dell on 2016/7/24.
 */
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640, desH = 960;
var main = document.querySelector(".main");
var oLis = document.querySelectorAll(".slider>li");
//根据长宽比大小，确定以宽度比或者以高度比缩放
if ((winW / desW) > (winH / desH)) {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}else{
    main.style.webkitTransform = "scale(" + winH / desH + ")";
}

[].forEach.call(oLis, function (cur, index) {
    cur.index = index;
    cur.addEventListener("touchstart", start, false);
    cur.addEventListener("touchmove", move, false);
    cur.addEventListener("touchend", end, false);
});
function start(e) {
    this.start = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var cur = this.index;
    var step = 1 / 2;
    var movePos = e.changedTouches[0].pageY;
    var changePos = movePos - this.start;
    [].forEach.call(oLis, function (item, index) {
        if (index != cur) {
            item.style.display = "none";
        }
        item.className = "";
        item.firstElementChild.id = "";
    });
    if (changePos > 0) {/*向下滑*/
        this.prevIndex = cur == 0 ? oLis.length - 1 : cur - 1;
        var pos = -winH + changePos;
    } else if (changePos < 0) {/*向上滑*/
        this.prevIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        var pos = winH + changePos;
    }

    oLis[this.prevIndex].className = "zIndex";
    oLis[this.prevIndex].style.display = "block";
    oLis[this.prevIndex].style.webkitTransform = "translate(0," + pos + "px)";
    this.style.webkitTransform = "translate(0," + changePos + "px) scale(" + (1 - Math.abs(changePos) / winH * step) + ")";
}
function end(e) {
    if (this.flag) {
        this.flag = false;
        oLis[this.prevIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevIndex].style.webkitTransition = "0.5s";
        oLis[this.prevIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a" + (this.index + 1);
        }, false);
    }

}