const height = window.innerHeight;
const width = window.innerWidth;
const grid_dim = Math.floor(width / 80);
const square_dim = 7 * grid_dim;
const grid_height = Math.ceil(height / (square_dim + grid_dim)) * 4;
const grid_width = Math.ceil(width / (square_dim + grid_dim)) * 4; 
const speed = 600;
let square_maker;

const svg = document.getElementById('svg');
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("onclick", "clearInterval(square_maker)");

const grid = create_grid();
let total_squares = 0;
square_maker = setInterval(draw_random_square, speed, grid);

function create_grid() {
  const grid = [];

  for (let i = 0; i <= grid_width; i++) {
    for (let j = 0; j <= grid_height; j++) {
      // Only add points where we have double evens or double odds
      if ((i % 3 === 0 && j % 3 === 0) ||
          (i % 3 === 1 && j % 3 === 1) ||
          (i % 3 === 2 && j % 3 === 2)) {
        const point = {
          has_square: false,
          id: grid.length,
          x: i * (2 * grid_dim) + grid_dim - square_dim / 2,
          y: j * (2 * grid_dim) + grid_dim - square_dim / 2
        };
        draw_square(point);
        grid.push(point);
      }
    }
  }
  return grid;
}

function show_grid() {
  for (let i = 0; i < grid.length; i++) {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", grid[i].x);
    point.setAttribute("cy", grid[i].y);
    point.setAttribute("r", 3);
    point.setAttribute("id", "grid_" + i);
    point.style.fill = "red";
    svg.appendChild(point);
  }
}

function draw_random_square(grid) {
  const id = Math.floor(Math.random() * grid.length);

  if (grid[id].has_square === false) {
    grid[id].has_square = true;
    grid[id].svg.style.opacity = 1;
    total_squares += 1;
  } else {
    grid[id].has_square = false;
    grid[id].svg.style.opacity = 0;
    total_squares -= 1;
  }
}

function draw_square(grid_point) {
  const square = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  square.setAttribute("x", grid_point.x);
  square.setAttribute("y", grid_point.y);
  square.setAttribute("width", square_dim - grid_dim);
  square.setAttribute("height", square_dim - grid_dim);
  square.setAttribute("class", "square");
  square.style.stroke = "white";
  square.style["stroke-width"] = grid_dim;
  square.style.fill = "none";
  square.style.opacity = 0;
  svg.appendChild(square);
  grid_point.svg = square;
}
