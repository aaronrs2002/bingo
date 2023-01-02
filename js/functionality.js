
const columns = ["b", "i", "n", "g", "o"];
const players = ["player1", "player2", "player3", "player4"];
let youVerified = [];
let calledPublically = [];
let upToFour = 0;/*starting at zero. each letter from the word bingo is represented*/
let calledListHTML = "";
let announcement = "";


function checkForBingo() {

    for (let i = 0; i < players.length; i++) {
        let theB = 0;
        let theI = 0;
        let theN = 0;
        let theG = 0;
        let theO = 0;
        let row2 = 0;
        let row3 = 0;
        let row4 = 0;
        let row5 = 0;
        let row6 = 0;

        for (let j = 2; j < 7; j++) {

            let ckReset = [theB, theI, theN, theG, theO, row2, row3, row4, row5, row6];


            if (document.querySelector("div#" + players[i] + "  .alert-success[data-rowid='" + j + "']") !== null) {

                [].forEach.call(document.querySelectorAll("div#" + players[i] + " .alert-success[data-rowid='" + j + "']"), function (e) {
                    let theRowId = j;
                    let theColumID = document.querySelector("div#" + players[i] + "  .alert-success[data-rowid='" + j + "']").getAttribute("data-columnid");
                    // console.log("Player: " + players[i] + " theColumID: " + theColumID + " - theRowId: " + j);
                    switch (theRowId) {
                        case 2:
                            row2 = row2 + 1;
                            break;
                        case 3:
                            row3 = row3 + 1;
                            break;
                        case 4:
                            row4 = row4 + 1;
                            break;
                        case 5:
                            row5 = row5 + 1;
                            break;
                        case 6:
                            row6 = row6 + 1;
                            break;
                    }
                    switch (theColumID) {
                        case "b":
                            theB = theB + 1;
                            break;
                        case "i":
                            theI = theI + 1;
                            break;
                        case "n":
                            theN = theN + 1;
                            break;
                        case "g":
                            theG = theG + 1;
                            break;
                        case "o":
                            theO = theO + 1;
                            break;
                    }

                });

                let ckWinners = [theB, theI, theN, theG, theO, row2, row3, row4, row5, row6];
                console.log("WINNING PLAYER: " + players[i] + " - ckWinners: " + ckWinners);
                if (ckWinners.indexOf(5) !== -1) {
                    let message = "BINGO! " + players[i] + " is the WINNER!";
                    let alertLevel = "alert-danger";
                    if (players[i] === "player1") {
                        message = "BINGO! YOU FREAKIN WON!";
                        alertLevel = "alert-success";
                    }

                    document.getElementById("announcement").innerHTML = message;
                    globalAlert(alertLevel, message);
                    setTimeout(() => {
                        document.getElementById("startGame").classList.remove("hide");
                    }, 3000);

                    document.getElementById("callSquare").classList.add("hide");
                    document.getElementById(players[i]).classList.remove("alert-light");
                    document.getElementById(players[i]).classList.add("alert-primary");
                }


            }
            theB = 0;
            theI = 0;
            theN = 0;
            theG = 0;
            theO = 0;
            row2 = 0;
            row3 = 0;
            row4 = 0;
            row5 = 0;
            row6 = 0;

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
    for (let i = 0; i < players.length; i++) {
        document.getElementById(players[i]).classList.remove("alert-primary");
        document.getElementById(players[i]).classList.add("alert-light");
        let player = "Player: " + (i + 1);
        if (i === 0) {
            player = "You"
        }
        document.querySelector("label[data-details='" + (i + 1) + "']").innerHTML = player + " <i class='fas fa-user'></i>";
    }


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

        cardHTML = cardHTML + "<ul class='list-unstyled inlineColumns'>";


        let usedNumbers = [];

        while (usedNumbers.length < 6) {
            let theNumber = Math.floor(a + Math.random() * (b - a));
            if (usedNumbers.indexOf(theNumber) === -1) {
                usedNumbers.push(theNumber);
                if (usedNumbers.length === 1) {
                    cardHTML = cardHTML + "<li><h3  class='text-capitalize text-center pt-2'>" + columns[j] + "</h3></li>";
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



function startGame() {
    document.getElementById("calledList").innerHTML = "";
    document.getElementById("startGame").classList.add("hide");
    document.getElementById("callSquare").classList.remove("hide");
    for (let i = 0; i < players.length; i++) {
        runGame(players[i]);
    }

}



