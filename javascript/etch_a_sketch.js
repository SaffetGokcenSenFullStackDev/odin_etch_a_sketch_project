const divSketchContainer = document.createElement('div');
divSketchContainer.classList.add('sketch-container');
document.body.appendChild(divSketchContainer);

const divGridRow = document.createElement('div');
divGridRow.classList.add('grid-row');

divGridRow.style.height = "60px";

const divGridElement = document.createElement('div');
divGridElement.classList.add('grid-element');

divGridElement.style.width = "60px";

divSketchContainer.appendChild(divGridRow);

divGridRow.appendChild(divGridElement);

for (let i = 0; i < 15; ++i) {
    divGridRow.appendChild(divGridElement.cloneNode(true));    
};

for (let i = 0; i < 15; ++i) {
    divSketchContainer.appendChild(divGridRow.cloneNode(true));
};

let toggleDraw = true;

function draw(event) {
    event.target.style.backgroundColor = "pink";
}

divSketchContainer.addEventListener('dblclick', () => {
    if (toggleDraw) {
        toggleDraw = false;
        divSketchContainer.addEventListener('mouseover', draw);
    }
    else {
        divSketchContainer.removeEventListener('mouseover', draw);
        toggleDraw = true;
    }
});

const divInfoContainer = document.createElement('div');
divInfoContainer.classList.add('info-container');
document.body.appendChild(divInfoContainer);

const divDrawingInfoContainer = document.createElement('div');
divDrawingInfoContainer.classList.add('drawing-info');
divInfoContainer.appendChild(divDrawingInfoContainer);
divDrawingInfoContainer.textContent = "Double click on a grid to start drawing and double click on a grid to finish drawing."

const divResolutionInfoContainer = document.createElement('div');
divResolutionInfoContainer.classList.add('resolution-info');
divInfoContainer.appendChild(divResolutionInfoContainer);

const button = document.createElement('button');
button.textContent = "Click to reset the resolution of the grid";
divResolutionInfoContainer.appendChild(button);

function drawGrid() {
    let numOfRowGrids, numOfRowGridsPrompt;
    let thePrompt = "Please enter the number of squares per side for the new "
    "grid. It must be less than or equal to 100.";
    numOfRowGridsPrompt = prompt(thePrompt, "16");
    if (numOfRowGridsPrompt === null) {
        numOfRowGridsPrompt = numOfRowGrids;
    }

    numOfRowGrids = numOfRowGridsPrompt;

    let elementHeight = Math.floor(960 / (+numOfRowGrids));
    divGridRow.style.height = `${elementHeight}px`;
    divGridElement.style.width = `${elementHeight}px`;

    divSketchContainer.appendChild(divGridRow);

    divGridRow.appendChild(divGridElement);
    for (let i = 0; i < (numOfRowGrids - 1); ++i) {
        divGridRow.appendChild(divGridElement.cloneNode(true));    
    };
        
    for (let i = 0; i < (numOfRowGrids - 1); ++i) {
        divSketchContainer.appendChild(divGridRow.cloneNode(true));
    };
}

function resetAndDrawGrid() {
    while (divGridRow.firstChild) {
        divGridRow.removeChild(divGridRow.firstChild);
    }
    while (divSketchContainer.firstChild) {
        divSketchContainer.removeChild(divSketchContainer.firstChild);
    }
    setTimeout(drawGrid, 0);
}

button.addEventListener('click', resetAndDrawGrid);