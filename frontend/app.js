// fetch('http://localhost:5000/api/images')
//   .then(res => res.json())
//   .then(images => {
//     const gallery = document.getElementById('Board');
//     images.forEach(image => {
//       const img = document.createElement('img');
//       img.src = `http://localhost:5000/images/${image}`;
//       img.alt = image;
//       img.style.transform = 'rotate(90deg)';
//       gallery.appendChild(img);
//     });
//   })
//   .catch(error => {
//     console.error('Error loading images:', error);
//   });

  const CardSequence = [
    // Row 1
    ["sequence.png", "spades_2.svg", "spades_3.svg", "spades_4.svg", "spades_5.svg", "spades_6.svg", "spades_7.svg", "spades_8.svg", "spades_9.svg", "sequence.png"],
    // Row 2
    ["clubs_6.svg", "clubs_5.svg", "clubs_4.svg", "clubs_3.svg", "clubs_2.svg", "hearts_ace.svg","hearts_king.svg", "hearts_queen.svg", "hearts_10.svg", "spades_10.svg"],
    // Row 3
    ["clubs_7.svg", "spades_ace.svg", "diamonds_2.svg", "diamonds_3.svg", "diamonds_4.svg", "diamonds_5.svg", "diamonds_6.svg", "diamonds_7.svg", "hearts_9.svg", "spades_queen.svg"],
    // Row 4
    ["clubs_8.svg", "spades_king.svg", "clubs_6.svg", "clubs_5.svg", "clubs_4.svg", "clubs_3.svg", "clubs_2.svg", "diamonds_8.svg", "hearts_8.svg", "spades_king.svg"],
    // Row 5
    ["clubs_9.svg", "spades_queen.svg", "clubs_7.svg", "hearts_6.svg", "hearts_5.svg", "hearts_4.svg", "hearts_ace.svg", "diamonds_9.svg", "hearts_7.svg", "spades_ace.svg"],
    // Row 6
    ["clubs_10.svg", "spades_10.svg", "clubs_8.svg", "hearts_7.svg", "hearts_2.svg", "hearts_3.svg", "hearts_king.svg", "diamonds_10.svg", "hearts_6.svg", "diamonds_2.svg"],
    // Row 7
    ["clubs_queen.svg", "spades_9.svg", "clubs_9.svg", "hearts_8.svg", "hearts_9.svg", "hearts_10.svg", "hearts_queen.svg", "diamonds_queen.svg", "hearts_5.svg", "diamonds_3.svg"],
    // Row 8
    ["clubs_king.svg", "spades_8.svg", "clubs_10.svg", "clubs_queen.svg", "clubs_king.svg", "clubs_ace.svg", "diamonds_ace.svg", "diamonds_king.svg", "hearts_4.svg", "diamonds_4.svg"],
    // Row 9
    ["clubs_ace.svg", "spades_7.svg", "spades_6.svg", "spades_5.svg", "spades_4.svg", "spades_3.svg", "spades_2.svg", "hearts_2.svg", "hearts_3.svg", "diamonds_5.svg"],
    // Row 10
    ["sequence.png", "diamonds_ace.svg", "diamonds_king.svg", "diamonds_queen.svg", "diamonds_10.svg", "diamonds_9.svg", "diamonds_8.svg", "diamonds_7.svg", "diamonds_6.svg", "sequence.png"],
  ];

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

  let deck = [
  "diamonds_jack.svg",
  "diamonds_jack.svg",
  "spades_2.svg",
  "spades_3.svg",
  "spades_4.svg",
  "spades_5.svg",
  "spades_6.svg",
  "spades_7.svg",
  "spades_8.svg",
  "spades_9.svg",
  "clubs_jack.svg",
  "clubs_jack.svg",
  "clubs_6.svg",
  "clubs_5.svg",
  "clubs_4.svg",
  "clubs_3.svg",
  "clubs_2.svg",
  "hearts_ace.svg",
  "hearts_king.svg",
  "hearts_queen.svg",
  "hearts_10.svg",
  "spades_10.svg",
  "clubs_7.svg",
  "spades_ace.svg",
  "diamonds_2.svg",
  "diamonds_3.svg",
  "diamonds_4.svg",
  "diamonds_5.svg",
  "diamonds_6.svg",
  "diamonds_7.svg",
  "hearts_9.svg",
  "spades_queen.svg",
  "clubs_8.svg",
  "spades_king.svg",
  "clubs_6.svg",
  "clubs_5.svg",
  "clubs_4.svg",
  "clubs_3.svg",
  "clubs_2.svg",
  "diamonds_8.svg",
  "hearts_8.svg",
  "spades_king.svg",
  "clubs_9.svg",
  "spades_queen.svg",
  "clubs_7.svg",
  "hearts_6.svg",
  "hearts_5.svg",
  "hearts_4.svg",
  "hearts_ace.svg",
  "diamonds_9.svg",
  "hearts_7.svg",
  "spades_ace.svg",
  "clubs_10.svg",
  "spades_10.svg",
  "clubs_8.svg",
  "hearts_7.svg",
  "hearts_2.svg",
  "hearts_3.svg",
  "hearts_king.svg",
  "diamonds_10.svg",
  "hearts_6.svg",
  "diamonds_2.svg",
  "clubs_queen.svg",
  "spades_9.svg",
  "clubs_9.svg",
  "hearts_8.svg",
  "hearts_9.svg",
  "hearts_10.svg",
  "hearts_queen.svg",
  "diamonds_queen.svg",
  "hearts_5.svg",
  "diamonds_3.svg",
  "clubs_king.svg",
  "spades_8.svg",
  "clubs_10.svg",
  "clubs_queen.svg",
  "clubs_king.svg",
  "clubs_ace.svg",
  "diamonds_ace.svg",
  "diamonds_king.svg",
  "hearts_4.svg",
  "diamonds_4.svg",
  "clubs_ace.svg",
  "spades_7.svg",
  "spades_6.svg",
  "spades_5.svg",
  "spades_4.svg",
  "spades_3.svg",
  "spades_2.svg",
  "hearts_2.svg",
  "hearts_3.svg",
  "diamonds_5.svg",
  "hearts_jack.svg",
  "hearts_jack.svg",
  "diamonds_ace.svg",
  "diamonds_king.svg",
  "diamonds_queen.svg",
  "diamonds_10.svg",
  "diamonds_9.svg",
  "diamonds_8.svg",
  "diamonds_7.svg",
  "diamonds_6.svg",
  "spades_jack.svg",
  "spades_jack.svg",
];

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
  myCardElements.appendChild(img);
}

let availableSlots = [];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    availableSlots.push([i, j]);
  }
}
// let myCardElements = myCards.querySelectorAll('.my-card');
let boardCardElements = board.querySelectorAll('.cell-content');
let boardCardImageElements = board.querySelectorAll('.board-card');
let boardCardsInSequence = board.querySelectorAll('.p1-token-in-sequence');

function renderBoard() {
  for (let i = 0; i < boardCardImageElements.length; i++) {
    boardCardImageElements[i].style.border = '2px solid black';
  }

  myCardElements.innerHTML = '';
  myCards.forEach(imageName => {
        const img = document.createElement("img");
        img.src = `images/${imageName}`;
        img.alt = imageName;
        img.setAttribute("name", imageName);
        img.classList.add('my-card');

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

        if(sequencedCell[0] === rowIndex && sequencedCell[1] === columnIndex){
          boardCardInSequence.style.display = 'block';
        }
      });
    });
  });

}

let p1Slots = [];
function onCardSelection(selectedRowIndex, selectedColumnIndex) {
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
        // myCardElements[myCardIndex].remove();
        myCards.splice(myCardIndex,1);
        myCards.push(deck[deck.length-1]);
        deck.pop();

        // console.log("my card ele dele: " + JSON.stringify(myCardElements));
      }
    });
  });
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
}
