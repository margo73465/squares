var height = window.innerHeight,
		width = window.innerWidth,
		center = [width/2, height/2],
		grid_dim = Math.floor(width/40)
		square_dim = 3 * grid_dim,
		border = grid_dim;

var square_maker;

var grid = create_grid();
console.log(grid);

// Create svg
var svg = document.getElementsByTagName('svg')[0];
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("onclick", "clearInterval(square_maker)");

function create_grid() {
	var grid = [];

	for (var i = 0; i < 19; i++) {
		for (var j = 0; j < 19; j++) {
			// Only add points where we have double evens or double odds
			if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
				var point = {
					has_square: false,
					id: grid.length,
					x: i * (2 * grid_dim) + border,
					y: j * (2 * grid_dim) + border
				};
				grid.push(point);
			}
		}
	}

	return grid;
}


function draw_square(x, y, id) {

	// Outer square
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	newElement.setAttribute("x", x);
	newElement.setAttribute("y", y);
	newElement.setAttribute("width", square_dim);
	newElement.setAttribute("height", square_dim);
	newElement.setAttribute("id", id);
	newElement.style.stroke = "none"; 
	newElement.style.fill = "white";
	svg.appendChild(newElement);

}

function draw_random_square(grid) {

	// var flip = Math.floor(Math.random() * 2);

	// if (flip === 0) {
	// 	// On double even grid
	// 	x = (Math.floor(Math.random() * 10) * 2) * (2 * grid_dim) + border;
	// 	y = (Math.floor(Math.random() * 10) * 2) * (2 * grid_dim) + border;
	// } else {
	// 	// On double odd grid
	// 	x = (Math.floor(Math.random() * 10) * 2 + 1) * (2 * grid_dim) + border;
	// 	y = (Math.floor(Math.random() * 10) * 2 + 1) * (2 * grid_dim) + border;
	// }

	var grid_point = grid[Math.floor(Math.random() * grid.length)];

	if (grid_point.has_square === false) {
		draw_square(grid_point.x, grid_point.y, grid_point.id);
		grid_point.has_square = true;
		grid[grid_point.id] = grid_point;
	} else {
		//var svg_doc = svg.contentDocument;		
		var child = svg.getElementById(grid_point.id);
		svg.removeChild(child);
		grid_point.has_square = false;
		grid[grid_point.id] = grid_point;
		draw_random_square(grid);
	}
}

// draw_square(center[0] - square_dim/2, center[1] - square_dim/2);

square_maker = setInterval(function () { draw_random_square(grid); }, 300);
