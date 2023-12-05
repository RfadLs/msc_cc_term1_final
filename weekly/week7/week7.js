let grid = [];
let gridSize = 150;

function setup() {
  createCanvas(450, 450);
  grid = createGrid(3, 3);
}

function draw() {
  background(255);
  noStroke();
  display();
}

function createGrid(rows, cols) {
  let grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      let diffColor;
      if ((i + j) % 2 === 0) {
        diffColor = color(200,255,100);
      } else {
        diffColor = color(200,200,80);
      }
      grid[i][j] = {
        x: i * gridSize,
        y: j * gridSize,
        color: diffColor,
        animation: pAnimation(),
      };
    }
  }
  return grid;
}

function pAnimation(x, y) {
  let posX = 0;
  let posY = 0;
  let a1 = 0;
  let a2 = 0;
  let t = 0;
  for (let c = 0; c < 20; c++) {
    let noiseValue = noise(t);
    posX += a1 * c + sin(t);
    posY += a2 * c + cos(t);
    t += 0.01;
  }
  return {
    x: posX,
    y: posY,
  };
}

function display() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      fill(grid[i][j].color);
      rect(grid[i][j].x, grid[i][j].y, gridSize, gridSize);

      let animation = grid[i][j].animation;

      /*i know inside the condition and all of this if condition itself
       is looks like a liitle bit complex, but I don't find proper way to adjust*/
       //the different formulas inside the grid
      if (i === 0 && j === 0) {
        let radius = 15 + 20*sin(frameCount*0.2);
        fill(150,50,100);
        triangle(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y-14, radius*0.5, radius*10,radius*10,radius*2);

      }


      if (i === 1 && j === 0) {
        let radius1 = 35 + 20*sin(frameCount*0.2);
        let radius2 = 35 + 20*cos(frameCount*0.2);
        fill(150,100,255);
        rect(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y, radius1/2, radius1/2);
        fill(150,50,100);
        rect(grid[i][j].x + gridSize/2 + animation.x-50, grid[i][j].y + gridSize/2 + animation.y-50, radius2*1.5,radius2*1.5);
      }

      if (i === 2 && j === 0) {
        let radius1 = 35 + 40*sin(frameCount*0.8);
        let radius2 = 35 + 20*cos(frameCount*0.05);
        fill(150,50,100);
        ellipse(grid[i][j].x + gridSize/2 + animation.x,
                grid[i][j].y + gridSize/2 + animation.y,
                radius2*3, 100 - radius1*2);
      }

      if (i === 0 && j === 1) {
        let len = 40;
        let xOffset = sin(frameCount*0.2) *len;
        fill(150,50,100);
        ellipse(grid[i][j].x + gridSize/2 + animation.x - xOffset, grid[i][j].y + gridSize/2 + animation.y,len*1.5);
        fill(150,100,255);
        ellipse(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y - xOffset,len);
      }

      if (i === 1 && j === 1) {
        let radius = 30 + 40* sin(frameCount*0.1);
        push()
        fill(150,100,255);
        rect(grid[i][j].x + gridSize/2 + animation.x-50, grid[i][j].y + gridSize / 2 + animation.y-30, radius*2, 30,30);
        pop()
        push() 

        rect(grid[i][j].x + gridSize/2 + animation.x,
             grid[i][j].y + gridSize/2 + animation.y-22,
             radius/2,10,20);
        pop()
      }

      if (i === 2 && j === 1) {
        let len = 40;
        let xOffset = cos(frameCount*0.2) * len;
        fill(150,100,255);
        ellipse(grid[i][j].x + gridSize/2 + animation.x + xOffset, grid[i][j].y + gridSize/2 + animation.y,len*1.5);
        fill(150,50,100);
        ellipse(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y + xOffset,len);
      }

      if (i === 0 && j === 2) {
        let radius = 30 + 20* sin(frameCount*0.1);
        fill(150,100,255);
        ellipse(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y, 200-radius *3, radius * 2);
      }

      if (i === 1 && j === 2) {
        let radius1 = 30 + 20 * sin(frameCount*0.1);
        let radius2 = 30 + 20 * cos(frameCount*0.1);
        fill(150,50,100);
        rect(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y, radius1*1.5, radius1*1.5);
        fill(150,100,255);
        rect(grid[i][j].x + gridSize/2 + animation.x-50, grid[i][j].y + gridSize/2 + animation.y-50, radius2,radius2);
      }

      if (i === 2 && j === 2) {
        const radius = 35 + 20 * cos(frameCount * 0.08);
        fill(150,50,100);
        ellipse(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y, 100 - radius *2, 100-radius *3);
        fill(150,100,255);
        ellipse(grid[i][j].x + gridSize/2 + animation.x, grid[i][j].y + gridSize/2 + animation.y, 50 - radius*3, 100-radius*2);
      }
    }
  }
}
