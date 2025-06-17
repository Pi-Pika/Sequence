import { CardSequence } from "./card-sequence.js";

const twoEyedJacks = ["diamonds_jack.svg", "clubs_jack.svg"];
const oneEyedJacks = [];
const sequenceNamedCells = [[0,0],[0,9],[9,0],[9,9]];
let isTwoEyedJackSelected = false;
let currentTwoEyedJackIndex = -1;
const socket = io();


  const board = document.getElementById('Board');
  CardSequence.forEach((row,rowIndex) => {
    row.forEach((image,columnIndex) => {
      const cell = document.createElement('div');
      const token = document.createElement('div');
      const inSequence = document.createElement('div');
      inSequence.id = `${rowIndex}-${columnIndex}`;

      inSequence.classList.add('p1-token-in-sequence');
      token.classList.add('p1-token');
      const img = document.createElement('img');

      img.src = `images/${image}`;
      img.alt = image;
      img.id = `${rowIndex}-${columnIndex}`;
      img.setAttribute("name", image);
      img.style.transform = 'rotate(90deg)';
      img.classList.add('board-card');
      
      // img.onclick(onCardSelection(rowIndex,columnIndex));
      cell.addEventListener('click', () => onCardSelection(rowIndex, columnIndex));
      cell.appendChild(token);
      cell.appendChild(img);
      cell.appendChild(inSequence);

      cell.classList.add('cell-content');

      board.appendChild(cell);
    });
  })

  function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

import { cdeck } from "./deck.js";
let deck = cdeck;

deck = shuffleArray(deck);
let myCards = [];
const myCardElements = document.getElementById("MyCards"); 

for (let i = 0; i < 6; i++) {
  const image = deck[deck.length-1];
  myCards.push(image);
  deck.pop();
  
  const img = document.createElement("img");
  img.src = `/images/${image}`;
  img.alt = image;
  img.setAttribute("name", image);
  img.classList.add('my-card');
  if(twoEyedJacks.includes(image)){
    img.classList.add('two-eyed-card');
    img.addEventListener('click', () => onTwoEyedCardSelection(i));
  }
  myCardElements.appendChild(img);
}

function onTwoEyedCardSelection(index){
  isTwoEyedJackSelected = true;
  currentTwoEyedJackIndex = index;
  boardCardImageElements.forEach(boardCardImage => {
    const boardCardId = boardCardImage.id;
    const idParts = boardCardId.split('-');
    const rowIndex = parseInt(idParts[0]);
    const columnIndex = parseInt(idParts[1]);

    if (containsCell(availableSlots, [rowIndex, columnIndex])
        && !containsCell(sequenceNamedCells,[rowIndex, columnIndex])) {
      boardCardImage.style.border = "2px solid gold";
    }
  });
  
}

let availableSlots = [];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    availableSlots.push([i, j]);
  }
}
sequenceNamedCells.forEach(sequenceNamedCell => {
  availableSlots = availableSlots.filter(cell => (cell[0] !== sequenceNamedCell[0] ||  cell[1] !== sequenceNamedCell[1]));
});

// let myCardElements = myCards.querySelectorAll('.my-card');
let boardCardElements = board.querySelectorAll('.cell-content');
let boardCardImageElements = board.querySelectorAll('.board-card');
let boardCardsInSequence = board.querySelectorAll('.p1-token-in-sequence');

function renderBoard() {
  for (let i = 0; i < boardCardImageElements.length; i++) {
    boardCardImageElements[i].style.border = '2px solid black';
  }

  myCardElements.innerHTML = '';
  myCards.forEach((imageName, i) => {
        const img = document.createElement("img");
        img.src = `images/${imageName}`;
        img.alt = imageName;
        img.setAttribute("name", imageName);
        img.classList.add('my-card');

        if(twoEyedJacks.includes(imageName)){
          img.classList.add('two-eyed-card');
          img.addEventListener('click', () => onTwoEyedCardSelection(i));
        }

        myCardElements.appendChild(img);
    });

  // console.log("my card ele render: " + JSON.stringify(myCardElements));

  myCards.forEach(card => {
    boardCardImageElements.forEach(slot => {

      const slotId = slot.id;
      const idParts = slotId.split('-');
      const rowIndex = parseInt(idParts[0]);
      const columnIndex = parseInt(idParts[1]);
      // console.log("slotName: " + slot.getAttribute("name") + ", Card name: " + card.getAttribute("name") + ", " + rowIndex + " " + columnIndex);

      const isSlotAvailable = availableSlots.some(
        ([availableRow, availableColumn]) => 
        // console.log(availableRow + " " + rowIndex + " " + availableColumn + " " + columnIndex)
          availableRow === rowIndex && availableColumn === columnIndex 
      );

      if (isSlotAvailable && slot.getAttribute("name") === card){
        slot.style.transform = 'rotate(90deg)'; // Scale by 1.2, keep rotation
        slot.style.border = '2px solid gold';
      }

    });

  });

  boardCardElements.forEach((cell,cellIndex) => {
    let rowIndex = Math.floor(cellIndex / 10);
    let columnIndex = cellIndex%10;
    
    const isP1TokenPlaced = p1Slots.some(slot => {
      return (slot[0] === rowIndex && slot[1] === columnIndex);
    });

    // console.log("this is cell: " + cell);
    const token = cell.querySelector('.p1-token');

    if(isP1TokenPlaced) {
      token.classList.add('p1-token-visible');
      // console.log("In cell Index: " + cellIndex + "p1 token: " + token);
    }
  });
  checkSequence();
  sequences.forEach(sequence => {
    sequence.forEach(sequencedCell => {
      boardCardsInSequence.forEach(boardCardInSequence => {
        const boardCardId = boardCardInSequence.id;
        const idParts = boardCardId.split('-');
        const rowIndex = parseInt(idParts[0]);
        const columnIndex = parseInt(idParts[1]);

        if(sequencedCell[0] === rowIndex 
          && sequencedCell[1] === columnIndex
          && !containsCell(sequenceNamedCells, [rowIndex, columnIndex])){
            boardCardInSequence.style.display = 'block';
        }
      });
    });
  });

}

let p1Slots = [];
//let p1Slots = [[0,1],[0,2],[0,3] ];

function onCardSelection(selectedRowIndex, selectedColumnIndex) {
  if (!isTwoEyedJackSelected) {
    myCards.forEach((card, myCardIndex) => {
      boardCardImageElements.forEach(slot => {
        const slotId = slot.id;
        const idParts = slotId.split('-');
        const rowIndex = parseInt(idParts[0]);
        const columnIndex = parseInt(idParts[1]);
        // console.log("slotName: " + slot.getAttribute("name") + ", Card name: " + card.getAttribute("name") + ", " + rowIndex + " " + columnIndex);
        const isSlotAvailable = availableSlots.some(
          ([availableRow, availableColumn]) => 
          // console.log(availableRow + " " + rowIndex + " " + availableColumn + " " + columnIndex)
            availableRow === rowIndex && availableColumn === columnIndex 
        );
        if (isSlotAvailable && slot.getAttribute("name") === card
          && rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex){
          
            p1Slots.push([selectedRowIndex, selectedColumnIndex]);
            availableSlots = availableSlots.filter(
              cell => (cell[0] !== selectedRowIndex ||  cell[1] !== selectedColumnIndex));
            myCards.splice(myCardIndex,1);
            myCards.push(deck[deck.length-1]);
            deck.pop();
            // console.log("my card ele dele: " + JSON.stringify(myCardElements));
        }
      });
    });
  }
  else{
    if(containsCell(availableSlots, [selectedRowIndex, selectedColumnIndex])){
      p1Slots.push([selectedRowIndex, selectedColumnIndex]);
      availableSlots = availableSlots.filter(
        cell => (cell[0] !== selectedRowIndex ||  cell[1] !== selectedColumnIndex));
      myCards.splice(currentTwoEyedJackIndex,1);
      myCards.push(deck[deck.length-1]);
      deck.pop();
    }
  currentTwoEyedJackIndex = -1;
  isTwoEyedJackSelected = false;
  }
  // console.log("p1_slots: " + p1_slots);
  // console.log("avai slot: " + availableSlots);
  renderBoard();
}

document.addEventListener("DOMContentLoaded", function () {
  // console.log("Page is fully loaded (HTML parsed)");
  // Your rendering or setup code here
  renderBoard();
});

let sequences = [];

// Helper: Check if a specific cell exists in an array
function containsCell(arr, cell) {
  return arr.some(([a, b]) => a === cell[0] && b === cell[1]);
}

// Helper: Check if two sequences are exactly the same
function isSameSequence(seq1, seq2) {
  return (
    seq1.length === seq2.length &&
    seq1.every(([a, b], i) => a === seq2[i][0] && b === seq2[i][1])
  );
}

// Helper: Check if a sequence already exists in sequences
function containsSequence(arr, sequence) {
  return arr.some((seq) => isSameSequence(seq, sequence));
}

function checkSequence() {
  let x = 0, y = 0;
  let vis = Array.from({ length: 10 }, () => Array(10).fill(0));
  let direction = "right";
  p1Slots.push([0,0]);
  p1Slots.push([0,9]);
  p1Slots.push([9,0]);
  p1Slots.push([9,9]);

  while (!vis[x][y]) {
    const directions = [
      { dx: 1, dy: 0 }, // vertical down
      { dx: 0, dy: 1 }, // horizontal right
      { dx: -1, dy: 0 }, // vertical up
      { dx: 0, dy: -1 }, // horizontal left
      { dx: 1, dy: 1 }, // diagonal ↘️
      { dx: -1, dy: 1 }, // diagonal ↗️
      { dx: 1, dy: -1 }, // diagonal ↙️
      { dx: -1, dy: -1 }, // diagonal ↖️
    ];

    for (let { dx, dy } of directions) {
      let potentialSequence = [],
        isSequence = true;
      for (let k = 0; k < 5; k++) {
        let nx = x + k * dx;
        let ny = y + k * dy;
        if (
          nx < 0 ||
          ny < 0 ||
          nx >= 10 ||
          ny >= 10 ||
          !containsCell(p1Slots, [nx, ny])
        ) {
          isSequence = false;
          break;
        }
        potentialSequence.push([nx, ny]);
      }

      if (isSequence) {
        potentialSequence.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        if (!containsSequence(sequences, potentialSequence)) {
          let overlap =
            sequences[0]?.filter((seqCell) =>
              containsCell(potentialSequence, seqCell)
            ).length || 0;

          if (overlap <= 1) {
            sequences.push(potentialSequence);
            console.log("Sequence Found:", potentialSequence);
            p1Slots.splice(p1Slots.length-4, 4);
            return;
          }
        }
      }
    }

    // Spiral traversal logic
    vis[x][y] = 1;
    if (direction === "right") y++;
    else if (direction === "down") x++;
    else if (direction === "left") y--;
    else x--;

    if (y === 10 || (direction === "right" && vis[x][y])) {
      direction = "down";
      y--;
      x++;
    } else if (x === 10 || (direction === "down" && vis[x][y])) {
      direction = "left";
      x--;
      y--;
    } else if (y === -1 || (direction === "left" && vis[x][y])) {
      direction = "up";
      y++;
      x--;
    } else if (x === -1 || (direction === "up" && vis[x][y])) {
      direction = "right";
      y++;
      x++;
    }
  }
  p1Slots.splice(p1Slots.length-4, 4);
}



