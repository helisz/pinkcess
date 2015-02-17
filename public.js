$(document).ready(function() {
    
    var $ct = $('.ke_m2pc_con')    
    var $ul = $('<ul />').appendTo($ct);

    $ct.find('img').each(function(){
        var $this = $(this);
       
        $this.attr("width","60px")
        $this.attr("height","60px")
        $this.removeAttr("onmouseover");
        $this.removeAttr("onmouseout");
           
        $this.wrap('<li />');
        $('<span class="hidden"/>').append($this.clone().removeAttr("onmouseover").removeAttr("onmouseout")).insertAfter($this);
        $this.parent().appendTo($ul);
        $this.addClass("ink_smlImg");
    })


    $(".ke_m2pc_con").find("ul").css("width", jQuery(".ke_m2pc_con").find("li").size() * 79);
    $(".ke_m2pc_btn1").click(function () {
        
        $(this).next().animate({
            scrollLeft: $(this).next().scrollLeft() - 72
        },50)
    });
    $(".ke_m2pc_btn2").click(function () {
        $(this).prev().animate({
            scrollLeft: $(this).prev().scrollLeft() + 72
        },50)
    });

    

        $('.ke_m2pc_con li').first().addClass('ke_m2pc_con_hover').addClass('tri');

        $('.ke_m2pc_con li').click(function () {
            $('.ke_m2pc_con li').removeClass('ke_m2pc_con_hover').removeClass('tri');
            $(this).addClass('ke_m2pc_con_hover').addClass('tri');
        });

        /**add
       $('.ke_m2pc_con li').first().addClass('ke_m2pc_con_hover');
       $('.ke_m2pc_con li').first().addClass('tri');

       $('.ke_m2pc_con li').click(function () {
            $('.ke_m2pc_con li').removeClass('ke_m2pc_con_hover');
            $('.ke_m2pc_con li').removeClass('tri');
            $(this).first().addClass('ke_m2pc_con_hover');
            $(this).first().addClass('tri');
        });
        **/

//    jQuery(".ke_m2pc_con li").click(function () {
//        jQuery(".small_pic img").hide();
//        jQuery(".small_pic img").attr("src", jQuery(this).find(".ink_smlImg").attr("src"));
//        jQuery(".big_pic img").attr("src", jQuery(this).find(".hidden img").attr("src"));
//        jQuery(".small_pic img").fadeIn(0)
//    });

    $('.ke_m2pc_con img').click(function(){
        $('.small_pic img').attr('src',$(this).attr('data-large'));
        $('.big_pic img').attr('src',$(this).attr('data-xl'));
    });
    $('.big_pic img').attr('src',$('.small_pic img').attr('data-xl'));
});
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aTmp = [];
    var i = 0;
    for (i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aTmp.push(aEle[i])
        }
    };
    return aTmp
};
window.onload = function () {
    var oDiv = document.getElementById('ink_showImg');
    var oMark = getByClass(oDiv, 'mark')[0];
    var oFloat = getByClass(oDiv, 'float_layer')[0];
    var oBig = getByClass(oDiv, 'big_pic')[0];
    var oSmall = getByClass(oDiv, 'small_pic')[0];
    var oImg = oBig.getElementsByTagName('img')[0];
    oMark.onmouseover = function () {
        oFloat.style.display = 'block';
        oBig.style.display = 'block'
    };
    oMark.onmouseout = function () {
        oFloat.style.display = 'none';
        oBig.style.display = 'none'
    };
    oMark.onmousemove = function (ev) {
        var zwidth = 0;
        if ($(window).width() > 1280) {
            zwidth = ( $(window).width() - 1180 ) / 2;
        } else if ($(window).width() > 1000 && $(window).width() <= 1280) {
            zwidth = ( $(window).width() - 1000 ) / 2;
        }
        var topNum = document.documentElement.scrollTop || document.body.scrollTop;
        var oEvent = ev || event;
        var l = oEvent.clientX - zwidth - oDiv.offsetLeft - oSmall.offsetLeft - oFloat.offsetWidth / 2;
        var t = (oEvent.clientY + topNum) - oDiv.offsetTop - oSmall.offsetTop - oFloat.offsetHeight / 2 - 214;
        if (l < 0) {
            l = 0
        } else if (l > oMark.offsetWidth - oFloat.offsetWidth) {
            l = oMark.offsetWidth - oFloat.offsetWidth
        };
        if (t < 0) {
            t = 0
        } else if (t > oMark.offsetHeight - oFloat.offsetHeight) {
            t = oMark.offsetHeight - oFloat.offsetHeight
        }
        oFloat.style.left = l + 'px';
        oFloat.style.top = t + 'px';
        var percentX = l / (oMark.offsetWidth - oFloat.offsetWidth);
        var percentY = t / (oMark.offsetHeight - oFloat.offsetHeight);
        oImg.style.left = -percentX * (oImg.offsetWidth - oBig.offsetWidth) + 'px';
        oImg.style.top = -percentY * (oImg.offsetHeight - oBig.offsetHeight) + 'px'
    }
};