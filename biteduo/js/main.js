/**
 * Created by zlw on 15-2-10.
 */
(function (win) {
    $(function(){
        $(win).scroll(function() {
            if ($(this).scrollTop() > 0) {
                $(".header .shadow").css("display", "block");
            } else {
                $(".header .shadow").css("display", "none");
            }

            var windowPageYOffset = window.pageYOffset,
            windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;

            $(".feature .icon").each(function (index, item) {
                var imgOffsetTop = $(item).offset().top;
                if (imgOffsetTop >= windowPageYOffset && imgOffsetTop < windowPageYOffsetAddHeight) {
                    $(item).css({
                        "transform": "translate3d(0, 0, 0)",
                        "-ms-transform": "translate3d(0, 0, 0)",
                        "-o-transform": "translate3d(0, 0, 0)",
                        "-webkit-transform": "translate3d(0, 0, 0)",
                        "-moz-transform": "translate3d(0, 0, 0)",
                        "opacity": 1
                    });
                }
            });

            if ($(this).scrollTop() > 200) {
                $(".rocket").show();
            } else {
                $(".rocket").hide();
            }
        });

        $(".service-btn").click(function () {
            $(this).stop();
            var right = $(".service").css("right");
            console.log(right);
            $(".service").animate({"right": (right == "0px" ? -213 : 0)}, 400);
        });

        $(".rocket").click(function () {
            $("html, body").animate({scrollTop: 0}, 200);
        })
    });

    var Main = function () {
        this.init();
    };

    var p = Main.prototype;

    var CNYData = [
        {
            "coinType": "比特币BTC",
            "price": "￥106",
            "num": 150,
            "money": 100,
            "upsAndDowns": "+1.41%",
            "interest": "0.032%"
        },
        {
            "coinType": "暗黑币BTC",
            "price": "￥101",
            "num": 135,
            "money": 100,
            "upsAndDowns": "-2.45%",
            "interest": "0.002%"
        },
        {
            "coinType": "莱特币BTC",
            "price": "￥104",
            "num": 141,
            "money": 100,
            "upsAndDowns": "+3.4%",
            "interest": "0.006%"
        },
        {
            "coinType": "招财币BTC",
            "price": "￥103",
            "num": 121,
            "money": 105,
            "upsAndDowns": "-6.45%",
            "interest": "0.012%"
        }
    ];

    var BTCData = [
        {
            "coinType": "比特币BTC",
            "price": "￥106",
            "num": 150,
            "money": 100,
            "upsAndDowns": "+1.41%",
            "interest": "0.032%"
        },
        {
            "coinType": "暗黑币BTC",
            "price": "￥101",
            "num": 135,
            "money": 100,
            "upsAndDowns": "-2.45%",
            "interest": "0.002%"
        }
    ];

    p.init = function () {
        //this.createCoinList(CNYData, BTCData);
        this.addCoinList();
        this.switchBtn();
        this.dataSort();
        this.contactHoverEffect();
    };

    //p.createCoinList = function (CNYData, BTCData) {
    //    var CNY = "", BTC = "";
    //    for (var i = 0, len = CNYData.length; i < len; i++) {
    //        var item = CNYData[i];
    //        CNY += '<li><dl class="inner clearfix">' +
    //            '<dt><img src="./imgs/bitcoin-icon.png" />' + item.coinType + '</dt>' +
    //            '<dd>' + item.price + '</dd>' +
    //            '<dd>' + item.num + '</dd>' +
    //            '<dd>' + item.money + '</dd>' +
    //            '<dd>' + item.upsAndDowns + '</dd>' +
    //            '<dd>' + item.interest + '</dd>' +
    //            '<dd class="trend"><img src="./imgs/trend.png" /></dd>' +
    //            '</dl></li>';
    //    }
    //
    //    for (var i = 0, len = BTCData.length; i < len; i++) {
    //        var item = BTCData[i];
    //        BTC += '<li><dl class="inner clearfix">' +
    //        '<dt><img src="./imgs/bitcoin-icon.png" />' + item.coinType + '</dt>' +
    //        '<dd>' + item.price + '</dd>' +
    //        '<dd>' + item.num + '</dd>' +
    //        '<dd>' + item.money + '</dd>' +
    //        '<dd>' + item.upsAndDowns + '</dd>' +
    //        '<dd>' + item.interest + '</dd>' +
    //        '<dd class="trend"><img src="./imgs/trend.png" /></dd>' +
    //        '</dl></li>';
    //    }
    //
    //    $(".CNY-price-today-ul").html(CNY);
    //    $(".BTC-price-today-ul").html(BTC);
    //};

    // 创建币种列表
    p.createCoinList = function (data) {
        var html = "";
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            html += '<li><dl class="inner clearfix">' +
            '<dt><img src="./imgs/bitcoin-icon.png" />' + item.coinType + '</dt>' +
            '<dd>' + item.price + '</dd>' +
            '<dd>' + item.num + '</dd>' +
            '<dd>' + item.money + '</dd>' +
            '<dd>' + item.upsAndDowns + '</dd>' +
            '<dd>' + item.interest + '</dd>' +
            '<dd class="trend"><img src="./imgs/trend.png" /></dd>' +
            '</dl></li>';
        }

        return html;
    };

    p.addCoinList = function () {
        this.addBTCList();
        this.addCNYList();
    };

    p.addBTCList = function () {
        var html = this.createCoinList(BTCData);
        $(".BTC-price-today-ul").html(html);
    };

    p.addCNYList = function () {
        var html = this.createCoinList(CNYData);
        $(".CNY-price-today-ul").html(html);
    };

    p.switchBtn = function () {
        $(".CNY").click(function () {
            $(".CNY-price-today-ul").show();
            $(".BTC-price-today-ul").hide();
            $(this).siblings().removeClass("current");
            $(this).addClass("current");
        });

        $(".BTC").click(function () {
            $(".CNY-price-today-ul").hide();
            $(".BTC-price-today-ul").show();
            $(this).siblings().removeClass("current");
            $(this).addClass("current");
        })
    };

    // 排序函数
    p.compare = function (arg, flag) {
        return function (obj1, obj2) {
            var val1 = obj1[arg];
            var val2 = obj2[arg];
            switch (arg) {
                case "price":
                    val1 = Number(val1.slice(1));
                    val2 = Number(val2.slice(1));
                    break;
                case "num":
                    val1 = Number(val1);
                    val2 = Number(val2);
                    break;
                case "money":
                    val1 = Number(val1);
                    val2 = Number(val2);
                    break;
                case "upsAndDowns":
                    val1 = Number(val1.slice(0, val1.length - 1));
                    val2 = Number(val2.slice(0, val2.length - 1));
                    break;
                case "interest":
                    val1 = Number(val1.slice(0, val1.length - 1));
                    val2 = Number(val2.slice(0, val2.length - 1));
            }

            if (flag === 1) {
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    };

    p.sortList = function (arg, flag) {
        CNYData = CNYData.sort(this.compare(arg, flag));
        BTCData = BTCData.sort(this.compare(arg, flag));
        //this.createCoinList(CNYData, BTCData);
        this.addCoinList();
    };

    p.judgeSort = function (ele) {
        var flag;
        if (ele.attr("data-sort") === "0") {
            ele.attr("data-sort", "1");
            ele.attr("data-sortFlag", "1");
            flag = 1;
        } else {
            if (ele.attr("data-sortFlag") === "1") {
                ele.attr("data-sortFlag", "2");
                flag = 2;
            } else {
                ele.attr("data-sortFlag", "1");
                flag = 1;
            }
        }

        return flag;
    };

    p.dataSort = function () {
        var that = this;
        $(".price-today ul").click(function (e) {
            switch (e.target.className) {
                case "price":
//                    var flag = that.judgeSort($(e.target));
//                    that.sortList("price", flag);
//                    that.sortTriangleColor($(e.target), flag);
                    that.dataSortFn($(e.target), "price");
                    break;
                case "num":
//                    that.sortList("num");
                    that.dataSortFn($(e.target), "num");
                    break;
                case "money":
//                    that.sortList("money");
                    that.dataSortFn($(e.target), "money");
                    break;
                case "ups-and-downs":
//                    that.sortList("upsAndDowns");
                    that.dataSortFn($(e.target), "upsAndDowns");
                    break;
                case "interest":
//                    that.sortList("interest");
//                    that.removeSort($(e.target));
                    that.dataSortFn($(e.target), "interest");
                    break;
            }
        });
    };

    p.dataSortFn = function (ele, arg) {
        var flag = this.judgeSort(ele);
        this.sortList(arg, flag);
        this.sortTriangleColor(ele, flag);
        this.removeSort(ele);
    };

    p.removeSort = function (ele) {
        ele.parent().find("li").each(function (index, item) {
            if ($(item).attr("class") !== ele.attr("class")) {
                $(item).attr("data-sort", 0);
                $(item).attr("data-sortFlag", 0);
            }
        })
    };

    p.sortTriangleColor = function (ele, flag) {
        $(".cagret-down").each(function (index, item) {
            $(item).css("border-top-color", "#ffffff");
        });
        $(".cagret-up").each(function (index, item) {
            $(item).css("border-bottom-color", "#ffffff");
        });
        if (flag == 1) {
            ele.find(".cagret-down").css("border-top-color", "red");
        } else {
            ele.find(".cagret-up").css("border-bottom-color", "red");
        }
    };

    p.contactHoverEffect = function () {
        $(".contact li").each(function (index, item) {
            var img = $(item).find("img");
            var src = img.attr("src");
            var dataHover = img.attr("data-hover");
            $(item).mouseover(function () {
                img.attr("src", dataHover);
            }).mouseout(function () {
                img.attr("src", src);
            });
        });
    };


    $(function () {
        new Main();
    })
}(window));