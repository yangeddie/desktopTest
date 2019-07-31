$(document).ready(() => {
    perducePlaceCard();
    Licensing();
    
})

var cardList = new Array();
var dropping;
var parents;

function perducePlaceCard() {
    cardList.length = 8;
    for (var i = 0; i < 8; i++) {
        var t = new Array();
        cardList[i] = t;
        var tempElement = document.createElement("div");
        $(".placeCard").append(tempElement);
        $(tempElement).css("left", i * 135 + "px");
        $(tempElement).attr('id', "00" + i);
        $(tempElement).droppable({
            drop: function (event, ui) {
                dropping = $(this).attr("id");
                var OAO = $(this).attr("id");
                console.log("you have drop at " + OAO);
            }
        });
        if (i < 4)
            $(tempElement).addClass("blankCard");
        else
            $(tempElement).addClass("ACard");
    }
    for (var i = 0; i < 8; i++) {
        var t = new Array();
        cardList[i] = t;
        var tempElement = document.createElement("div");
        $(".placeCard").append(tempElement);
        $(tempElement).css("left", i * 135 + "px");
        $(tempElement).attr('id', "01" + i);
        $(tempElement).addClass("cardOrigin");
    }
    console.log("perducePlaceCard");
}

function getRandom(x) {
    return Math.floor(Math.random() * x);
};

function Licensing() {
    var randomCard = new Array(52);
    //產生卡牌
    for (var i = 1, k = 0; i <= 4; i++)
        for (var j = 1; j <= 13; j++, k++) {
            randomCard[k] = i * 100 + j;
        }
    //    洗牌
    //            for(var i=0;i<100;i++){
    //                var rd1 = getRandom(52);
    //                var rd2 = getRandom(52);
    //                var temp = randomCard[rd1];
    //                randomCard[rd1] = randomCard[rd2];
    //                randomCard[rd2] = temp;
    //            }
    //    發牌+顯示
    var k = 0;
    var lastloc;
    for (var i = 0; i < 4; i++) {
        lastloc = "01" + i;
        for (var j = 0; j < 7; j++, k++) {
            //            cardList[i][j] = randomCard[k];
            var tempElement = document.createElement("div");
            var str = "url(image/cards/" + randomCard[k] + ".svg)";
            $(tempElement).css({
                "background-image": str
            });
            $(tempElement).addClass("card");
            $(tempElement).attr('id', randomCard[k]);
            drop(tempElement);
            $("#" + lastloc).append(tempElement);
            lastloc = randomCard[k];
            
        }
    }

    for (var i = 0; i < 4; i++) {
        lastloc = "01" + (i + 4);
        for (var j = 0; j < 6; j++, k++) {
            //            cardList[i][j] = randomCard[k];
            var tempElement = document.createElement("div");
            var str = "url(image/cards/" + randomCard[k] + ".svg)";
            $(tempElement).css({
                "background-image": str
            });
            $(tempElement).addClass("card");
            $(tempElement).attr('id', randomCard[k]);
            drop(tempElement);
            $("#" + lastloc).append(tempElement);
            lastloc = randomCard[k];
        }
    }



}

function drop(tempElement) {
    $(tempElement).draggable({
        start: function () {
            var parent = $(this).parent("*");
            console.log(parent.attr("id"));
            parent.droppable({ 
                drop: function () {
                    dropping = $(this).attr("id");
//                    $(this).droppable('disable');
//                     $("#" + dropping).droppable("option", "enable", true);
                }
            });
            parent.droppable('enable');

        },
        stop: function () {
            console.log("dropping to = " + dropping);
            if (dropping != null) {
                //                $("#" + dropping).droppable('disable');
                $("#" + dropping).droppable("option", "disabled", true);

                var temp = $(this).clone().appendTo($("#" + dropping));
                temp.css({
                    "top": "50px",
                    "left": "0px"
                })
                $(this).remove();
                judge(tempElement);
                drop(temp.get(0));
            }
            dropping = null;
        }
    });
    var child = $(tempElement).children("*");
    if (child.length == 1) {
        drop(child.get(0));
    } else {
        $(tempElement).droppable({
            drop: function () {
                dropping = $(this).attr("id");
            }
        });
        $(tempElement).droppable('enable');
    }
}

function judge(nowElement) {
    //尋找 刪除
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < cardList[i].length; j++) {
            if (cardList[i][j] == $(nowElement).attr("id")) {
                var ln = cardList[i].length - j;
                while (ln-- > 0)
                    cardList[i].pop();
                break;
            }
        }
    }

    //添加
    dropping = dropping % 10;
    //    console.log("dropping = " + dropping);
    //    console.log("佇列長度=" + $(nowElement).find("*").length);
    var ln = $(nowElement).find("*").length;
    cardList[dropping].push($(nowElement).attr("id"));
    while (ln > 0) {
        cardList[dropping].push($(nowElement).children("*").attr("id"));
        nowElement = $(nowElement).children("*").get(0);
        ln--;
    }

}
