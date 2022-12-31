
const columns = ["b", "i", "n", "g", "o"];
const players = ["player1", "player2", "player3", "player4"];
let youVerified = [];
let calledPublically = [];
let upToFour = 0;/*starting at zero. each letter from the word bingo is represented*/
let calledListHTML = "";
let announcement = "";


function checkForBingo() {

    function youWin() {

        document.getElementById("announcement").innerHTML = "BINGO! " + players[i] + " is the WINNER!";
        document.getElementById("callSquare").classList.add("hide");

    }

    for (let i = 0; i < players.length; i++) {

        for (let j = 2; j < 7; j++) {
            let successNumber = [];
            if (document.querySelector("div#" + players[i] + " ul.list-unstyled.inline li.alert-success[data-rowid='" + j + "']")) {

                [].forEach.call(document.querySelector("div#" + players[i] + " ul.list-unstyled.inline li.alert-success[data-rowid='" + j + "']"), function () {
                    successNumber.push(j);
                })
                console.log("successNumber: " + successNumber)
                if (successNumber.length === 5) {
                    youWin();
                }
            }

        }

    }



}





function startCalling() {
    document.getElementById("callSquare").disabled = true;

    const targetLength = calledPublically.length + 1;

    let b = 15;
    let a = 1;
    if (upToFour === 1) {
        b = 30;
        a = 16;
    }
    if (upToFour === 2) {
        b = 45;
        a = 31;
    }
    if (upToFour === 3) {
        b = 60;
        a = 46;
    }
    if (upToFour === 4) {
        b = 75;
        a = 61;
    }

    console.log("calledPublically: " + calledPublically + " - " + targetLength);
    while (calledPublically.length < targetLength) {

        let theNumber = Math.floor(a + Math.random() * (b - a));
        theNumber = theNumber.toString();
        let offering = (columns[upToFour] + theNumber).toString();
        if (calledPublically.indexOf(offering) === -1) {
            document.getElementById("selectedItem").innerHTML = columns[upToFour] + "-" + theNumber;
            [].forEach.call(document.querySelectorAll("[data-value='" + offering + "']"), function (e) {
                e.classList.add("alert-success");
            });

            calledPublically.push(offering);
            calledListHTML = calledListHTML + "<span class='badge bg-warning text-dark mx-1 text-capitalize'>" + offering + "</span>";
            document.getElementById("calledList").innerHTML = calledListHTML;
        }


    }





    upToFour = upToFour + 1;
    if (upToFour >= 5) {
        upToFour = 0;
    }
    document.getElementById("callSquare").disabled = false;


    checkForBingo();


    return false;
}


function verifysquare(squareInfo) {
    console.log("verify: " + squareInfo);
    if (youVerified.indexOf(squareInfo) !== -1) {
        document.querySelector("li[data-value='" + squareInfo + "']").classList.add("alert-success");
        youVerified.push(squareInfo);
    } else {
        document.querySelector("li[data-value='" + squareInfo + "']").classList.add("alert-danger");
        setTimeout(() => {
            document.querySelector("li[data-value='" + squareInfo + "']").classList.remove("alert-danger");
        }, 3000)
    }

}



function runGame(target) {
    youVerified = [];
    calledPublically = [];
    upToFour = 0;
    calledListHTML = "";
    let cardHTML = "";
    document.getElementById("announcement").innerHTML = "";


    for (let j = 0; j < columns.length; j++) {

        let b = 15;
        let a = 1;
        if (j === 1) {
            b = 30;
            a = 16;
        }
        if (j === 2) {
            b = 45;
            a = 31;
        }
        if (j === 3) {
            b = 60;
            a = 46;
        }
        if (j === 4) {
            b = 75;
            a = 61;
        }

        cardHTML = cardHTML + "<ul class='list-unstyled inline'>";
        let usedNumbers = [];
        while (usedNumbers.length < 6) {
            let theNumber = Math.floor(a + Math.random() * (b - a));
            if (usedNumbers.indexOf(theNumber) === -1) {
                usedNumbers.push(theNumber);
                if (usedNumbers.length === 1) {
                    cardHTML = cardHTML + "<li><h3  class='text-capitalize text-center''>" + columns[j] + "</h3></li>";
                } else {
                    let clickFunc = "";
                    if (target === "player1") {
                        clickFunc = ` onClick="javascript:verifysquare('${columns[j] + theNumber}')" `;
                    }
                    if (columns[j] === "n" && usedNumbers.length === 4) {
                        cardHTML = cardHTML + "<li data-value='FREE' data-rowid='" + usedNumbers.length + "' data-columnid='" + columns[j] + "'  class='text-center alert-success'>FREE</li>";
                    } else {
                        cardHTML = cardHTML + "<li data-value='" + columns[j] + theNumber + "' data-rowid='" + usedNumbers.length + "' data-columnid='" + columns[j] + "' " + clickFunc + " class='text-center'>" + theNumber + "</li>";
                    }


                }
            }
        }
        cardHTML = cardHTML + "</ul>";
    }
    document.getElementById(target).innerHTML = cardHTML;


}



for (let i = 0; i < players.length; i++) {
    runGame(players[i]);
}
