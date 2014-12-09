var height = window.innerHeight,
		width = window.innerWidth,
		center = [width/2, height/2],
		grid_dim = Math.floor(width/80)
		square_dim = 7 * grid_dim,
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
					x: i * (4 * grid_dim) + border,
					y: j * (4 * grid_dim) + border
				};
				grid.push(point);
			}
		}
	}

	return grid;
}


function draw_square(x, y, id) {

	// Outer square
	var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
	g.setAttribute("id", "grid_" + id);
	g.setAttribute("opacity", 0.0);
	svg.appendChild(g);

	var outer_square = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	outer_square.setAttribute("x", x);
	outer_square.setAttribute("y", y);
	outer_square.setAttribute("width", square_dim);
	outer_square.setAttribute("height", square_dim);
	outer_square.style.stroke = "none"; 
	outer_square.style.fill = "white";
	g.appendChild(outer_square);

	var inner_square = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
	inner_square.setAttribute("x", x + grid_dim);
	inner_square.setAttribute("y", y + grid_dim);
	inner_square.setAttribute("width", square_dim - grid_dim * 2);
	inner_square.setAttribute("height", square_dim - grid_dim * 2);
	inner_square.style.stroke = "none"; 
	inner_square.style.fill = "black";
	g.appendChild(inner_square);

	// start_fade_in(g);
	fade_in(g);

}

function draw_random_square(grid) {
	if (no_more_squares) {
		return;
	}

	var grid_point = grid[Math.floor(Math.random() * grid.length)];
	// var grid_point = grid[Math.floor(Math.random() * 2)];
	// grid_point = grid[0];

	if (grid_point.has_square === false) {
	
		console.log("making new square");
		grid_point.has_square = true;
		grid[grid_point.id] = grid_point;
		
		draw_square(grid_point.x, grid_point.y, grid_point.id);
	
	} else {

		console.log("removing old square");
		var child = svg.getElementById("grid_" + grid_point.id);
		fade_out(child);
		setTimeout(remove_square, 1000, child, grid_point);

	}
}

function remove_square(child, grid_point) {
	no_more_squares = false;
	svg.removeChild(child);
	grid_point.has_square = false;
	grid[grid_point.id] = grid_point;

	// draw_random_square(grid);
}

function fade_in (svg_element) {
	var level = 0.1;
	var step = function () {
		if (level < 1.0) {
			level += 0.1;
			svg_element.setAttribute("opacity", level);
			// console.log(level);
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
}

var no_more_squares = false;

function fade_out (svg_element) {
	var level = svg_element.getAttribute("opacity");
	no_more_squares = true;
	var step = function () {
		if (level > 0.0) {
			level -= 0.1;
			svg_element.setAttribute("opacity", level);
			// console.log(level);
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
}

draw_random_square(grid);

square_maker = setInterval(draw_random_square, 1500, grid);
