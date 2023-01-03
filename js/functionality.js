
const columns = ["b", "i", "n", "g", "o"];
const players = ["player1", "player2", "player3", "player4"];
let youVerified = [];
let calledPublically = [];
let upToFour = 0;/*starting at zero. each letter from the word bingo is represented*/
let calledListHTML = "";
let announcement = "";

/*DOES NOT RESET AT DEAL*/
let playerMoney = 500;
if (localStorage.getItem("balance") && Number(localStorage.getItem("balance"))) {
    playerMoney = Number(localStorage.getItem("balance"));
}
document.querySelector("#playerMoney").innerHTML = playerMoney;
let bet = 0;
function setPlayerMoney(passPlayerMoney) {
    playerMoney = passPlayerMoney;
    document.getElementById("playerMoney").innerHTML = passPlayerMoney;
    document.querySelector("#playerMoney").innerHTML = passPlayerMoney;/*SAFARI BUG NEEDS BOTH*/
    localStorage.setItem("balance", passPlayerMoney);
}



function checkForBingo() {

    for (let i = 0; i < players.length; i++) {
        let theB = [];
        let theI = [];
        let theN = [];
        let theG = [];
        let theO = [];
        let row2 = [];
        let row3 = [];
        let row4 = [];
        let row5 = [];
        let row6 = [];

        for (let j = 2; j < 7; j++) {

            //  let ckReset = [theB.length, theI.length, theN.length, theG.length, theO.length, row2.length, row3.length, row4.length, row5.length, row6.length];


            if (document.querySelector("div#" + players[i] + "  .alert-success[data-rowid='" + j + "']") !== null) {

                [].forEach.call(document.querySelectorAll("div#" + players[i] + " .alert-success[data-rowid='" + j + "']"), function (e) {
                    let theRowId = j;
                    let theColumID = document.querySelector("div#" + players[i] + "  .alert-success[data-rowid='" + j + "']").getAttribute("data-columnid");


                    switch (theColumID) {
                        case "b":
                            if (theB.indexOf(theColumID + theRowId) === -1) {
                                theB.push(theColumID + theRowId);
                            }
                            break;
                        case "i":
                            if (theI.indexOf(theColumID + theRowId) === -1) {
                                theI.push(theColumID + theRowId);
                            }
                            break;
                        case "n":
                            if (theN.indexOf(theColumID + theRowId) === -1) {
                                theN.push(theColumID + theRowId);
                            }
                            break;
                        case "g":
                            if (theG.indexOf(theColumID + theRowId) === -1) {
                                theG.push(theColumID + theRowId);
                            }
                            break;
                        case "o":
                            if (theO.indexOf(theColumID + theRowId) === -1) {
                                theO.push(theColumID + theRowId);
                            }
                            break;
                    }





                    switch (theRowId) {
                        case 2:
                            if (row2.indexOf(theColumID + theRowId) === -1) {
                                row2.push(theColumID + theRowId);
                            }
                            break;
                        case 3:
                            if (row3.indexOf(theColumID + theRowId) === -1) {
                                row3.push(theColumID + theRowId);
                            }
                            break;
                        case 4:
                            if (row5.indexOf(theColumID + theRowId) === -1) {
                                row5.push(theColumID + theRowId);
                            }
                            break;
                        case 5:
                            if (row5.indexOf(theColumID + theRowId) === -1) {
                                row5.push(theColumID + theRowId);
                            }
                            break;
                        case 6:
                            if (row6.indexOf(theColumID + theRowId) === -1) {
                                row6.push(theColumID + theRowId);
                            }
                            break;
                    }


                });

            }


        }


        console.log("[theB, theI, theN, theG, theO, row2, row3, row4, row5, row6];: " + [theB, theI, theN, theG, theO, row2, row3, row4, row5, row6]);
        let ckWinners = [theB.length, theI.length, theN.length, theG.length, theO.length, row2.length, row3.length, row4.length, row5.length, row6.length];
        console.log("WINNING PLAYER: " + players[i] + " - ckWinners: " + ckWinners);
        if (ckWinners.indexOf(5) !== -1) {









            let message = "BINGO! " + players[i] + " is the WINNER!";
            let alertLevel = "alert-danger";
            if (players[i] === "player1") {
                playerMoney = (playerMoney + bet);

                message = "BINGO! YOU FREAKIN WON!";
                alertLevel = "alert-success";
            } else {
                playerMoney = (playerMoney - bet);
            }
            setPlayerMoney(playerMoney);
            document.getElementById("announcement").innerHTML = message;
            globalAlert(alertLevel, message);
            setTimeout(() => {
                document.getElementById("startGame").classList.remove("hide");
            }, 3000);

            document.getElementById("callSquare").classList.add("hide");
            document.getElementById(players[i]).classList.remove("alert-light");
            document.getElementById(players[i]).classList.add("alert-primary");
        }


        theB = [];
        theI = [];
        theN = [];
        theG = [];
        theO = [];
        row2 = [];
        row3 = [];
        row4 = [];
        row5 = [];
        row6 = [];
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



function startGame(playerBet) {
    bet = playerBet;
    document.getElementById("betTarget").innerHTML = "Bet: $" + bet;
    document.getElementById("calledList").innerHTML = "";
    document.getElementById("startGame").classList.add("hide");
    document.getElementById("callSquare").classList.remove("hide");
    for (let i = 0; i < players.length; i++) {
        runGame(players[i]);
    }

}



