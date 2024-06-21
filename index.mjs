import { profiles } from "./constants.mjs";

let players = {
    QB: null,
    WR: null,
    CB: null
}

let ids = [];
let ratings = [];

let homeScore = 0;
let awayScore = 0;

function startGame() {
    ids.push(prompt(`Enter the ID of the QB you would like to use`));
    ids.push(prompt(`Enter the ID of the WR you would like to use`));
    ids.push(prompt(`Enter the ID of the CB you would like to use`));

    for (let i = 0; i < profiles.length; i++) {
        if (ids[0] == profiles[i].id) {
            players.QB = profiles[i];
        }
        else if (ids[1] == profiles[i].id) {
            players.WR = profiles[i];
        }
        else if (ids[2] == profiles[i].id) {
            players.CB = profiles[i];
        }
        else {
            continue;
        }
    }
    updateGame();
}

function decider() {
    makeRatings();
    if (((players.QB.rating + players.WR.rating) / 2) > players.CB.rating) {
        console.log(`Touchdown! ${players.QB.name}'s pass was caught by ${players.WR.name}!`);
        homeScore+= 7;
        console.log(`The score is now ${homeScore} - ${awayScore}.`);
    }
    else if (((players.QB.rating + players.WR.rating) / 2) < players.CB.rating) {
        console.log(`Interception! ${players.QB.name}'s pass was picked off by ${players.CB.name} and returned for a touchdown!`);
        awayScore+= 7;
        console.log(`The score is now ${homeScore} - ${awayScore}.`);
    }
    else {
        console.log(`Broken up! ${players.QB.name}'s pass was tipped by ${players.CB.name} and ${players.WR.name} was unable to catch it. Try again!`);
        console.log(`The score is still ${homeScore} - ${awayScore}.`);
    }
    updateGame();
}

function makeRatings() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i] = Math.floor(ratings[i] * Math.random() * (1.1 - 0.7) + 0.7);
    }
}

function updateGame() {
    for (let i = 0; i < ids.length; i++) {
        ratings[i] = profiles[ids[i]].rating;
    }

    if (homeScore >= 35) {
        console.log(`The home team wins! Quitting game...`);
    }
    else if (awayScore >= 35) {
        console.log(`The away team wins! Quitting game...`);
    }
    else {
        decider();
    }
}

startGame();
