let doorImage1 = document.getElementById('door1'); // a global variable, doorImage1, that is assigned to the HTML element with ID of door1. The JavaScript DOM method .getElementById was used.
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg'; // this global variable holds the Chore Robot image
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg'; // this global variable holds the beach image
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg'; // this global variable holds the space image
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg'; // this global variable holds the closed door image


let numClosedDoors = 3; // a global variable set to the number value of the amount of doors in the game.
let openDoor1;
let openDoor2;
let openDoor3;

let startButton = document.getElementById('start');
let currentlyPlaying = true; // a variable set to help stop a user just clicking all 3 doors and overriding their loss of finding the robot earlier.

isBot = (door) => {
    if (door.src === botDoorPath) { // IF door.src has the game-ending Chore Robot
        return true;  // THEN return true,
    } else {
        return false; // ELSE return false.
    }
}

function isClicked(door) { // A function that will make each door clickable only ONCE.
    if (door.src === closedDoorPath) {
        return false; // If door.src and closedDoorPath share the same value, then the door hasn't been opened (clicked) yet.
    } else {
        return true;
    }
}

function playDoor(door) { // This function will 1. decrease the numClosedDoors variable, and 2. checks if the game-winning condition (numCloseDoors === 0) is met, and if so it calls the gameOver() function.
    numClosedDoors--; //decreases numClosedDoors by 1.
    if (numClosedDoors === 0) {
        gameOver('win'); // 'win' is passed in, to check against the parameter "status" in the gameOver() function below.
    } else if (isBot(door)) { // checks if the isBot(), with door passed in, will equate to true
        gameOver();
    }
}

randomChoreDoorGenerator = () => { // A function that will randomly generate the door that hides the ChoreBot
    let choreDoor = Math.floor(Math.random() * numClosedDoors); // variable, set to a MATH method that will randomly generate a whole number between 0 and 2 (0, 1, or 2).
    if (choreDoor === 0) { // IF/ELSE IF statement that will reassign the "openDoor" variables (to the robot, beach or space images) IF choreDoor === 0, IF choreDoor === 1, etc. This will make the doors dynamic when the user clicks on them.
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 2) {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
};


doorImage1.onclick = () => { // the doorImage1 variable is assigned currently to an empty function, using arrow function syntax. This function will execute once a user clicks on the first door, due to the .onclick DOM method.
    if (currentlyPlaying && !isClicked(doorImage1)) { // determines if the isClicked() function has NOT yet happened for doorImage1. Adding this logic will protect my game to ensure each closed door is clickable only once.
    doorImage1.src = openDoor1; // The source (.src) of variable doorImage1 will be reassigned to the botDoorPath variable value (when clicking on the first door, the closed door image will change to the ChoreBot).
    playDoor(doorImage1); // The .onclick() method for the three "doorImageX" is where a door is opened, so calling the "playDoor()" function here will decrease the numClosedDoors variable by 1 and check the IF STATEMENT condition in playDoor() function.
    }
};
doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
    }
};
doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
    }
};

startRound = () => { // this function will reset all the default values of our variables, allowing the user to start over.
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;

    randomChoreDoorGenerator(); // calling this function sets the game's variables to their original values when the game is initially loaded, and when the game is reset.
}

startButton.onclick = () => {
    if (currentlyPlaying === false) { // this IF statement will check if currentlyPlaying is false, therefore a player cannot reset a game mid-round.
        startRound();
    }
}


gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
    } else {
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false; // this value is used to make sure additional doors can't be clicked after finding the chore robot.
}


startRound(); // Calling this function sets the game's variables to their original values when the game is initially loaded.