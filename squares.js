var height = window.innerHeight;
var width = window.innerWidth;
var grid_dim = Math.floor(width / 80);
var square_dim = 7 * grid_dim;
var grid_height = Math.ceil(height / (square_dim + grid_dim)) * 4;
var grid_width = Math.ceil(width / (square_dim + grid_dim)) * 4; 
var square_maker;
var speed = 600; // Must be greater than 200 for fades to work
var fade_duration = speed - 200;

var svg = document.getElementsByTagName('svg')[0];
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("onclick", "clearInterval(square_maker)");

var grid = create_grid();
var total_squares = 0;
draw_random_square(grid);
square_maker = setInterval(draw_random_square, speed, grid);

function create_grid() {
  var grid = [];

  for (var i = 0; i <= grid_width; i++) {
    for (var j = 0; j <= grid_height; j++) {
      // Only add points where we have double evens or double odds
      if ((i % 3 === 0 && j % 3 === 0) ||
          (i % 3 === 1 && j % 3 === 1) ||
          (i % 3 === 2 && j % 3 === 2)) {
        var point = {
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
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.appendChild(g);

  for (var i = 0; i < grid.length; i++) {
    var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    point.setAttribute("cx", grid[i].x);
    point.setAttribute("cy", grid[i].y);
    point.setAttribute("r", 3);
    point.setAttribute("id", "grid_" + i);
    point.style.fill = "red";
    g.appendChild(point);
  }
}


function draw_random_square(grid) {
  var id = Math.floor(Math.random() * grid.length);

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
  var square = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
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

