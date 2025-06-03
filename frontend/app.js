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
      token.classList.add('p1-token');
      const img = document.createElement('img');

      img.src = `images/${image}`;
      img.alt = image;
      img.id = `${rowIndex}-${columnIndex}`;
      img.setAttribute("name", image);
      img.style.transform = 'rotate(90deg)';
      img.classList.add('board-card');
      
      // img.onclick(onCardSelection(rowIndex,columnIndex));
      img.addEventListener('click', () => onCardSelection(rowIndex, columnIndex));
      cell.appendChild(token);
      cell.appendChild(img);

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

  console.log("my card ele render: " + JSON.stringify(myCardElements));

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

    console.log("this is cell: " + cell);
    const token = cell.querySelector('.p1-token');

    if(isP1TokenPlaced) {
      token.classList.add('p1-token-visible');
      console.log("In cell Index: " + cellIndex + "p1 token: " + token);
    }
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

        console.log("my card ele dele: " + JSON.stringify(myCardElements));
      }
    });
  });
  // console.log("p1_slots: " + p1_slots);
  // console.log("avai slot: " + availableSlots);
  renderBoard();
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page is fully loaded (HTML parsed)");
  // Your rendering or setup code here
  renderBoard();
});

