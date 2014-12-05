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
	g.setAttribute("id", id);
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

	start_fade_in(g);

}

function draw_random_square(grid) {

	//var grid_point = grid[Math.floor(Math.random() * grid.length)];
	grid_point = grid[0];

	if (grid_point.has_square === false) {
	
		grid_point.has_square = true;
		grid[grid_point.id] = grid_point;
		draw_square(grid_point.x, grid_point.y, grid_point.id);
	
	} else {

		var child = svg.getElementById(grid_point.id);
		start_fade_out(child);
		setTimeout(remove_square, 1000, child, grid_point);

	}
}

function remove_square(child, grid_point) {
	console.log(svg);
	console.log(child);
	svg.removeChild(child);
	grid_point.has_square = false;
	grid[grid_point.id] = grid_point;
	draw_random_square(grid);
}

function start_fade_in(svg_element) {
	var opacity = svg_element.getAttribute("opacity");
	
	var fade = setInterval(function() {
			if (svg_element.getAttribute("opacity") >= 0.9) {
				clearInterval(fade);
			}
			fade_in(svg_element);
		}, 10);
}

function fade_in(svg_element, fade) {
	console.log("opacity up!");
	var opacity = svg_element.getAttribute("opacity");
	var new_opacity = Number(opacity) + 0.1;
	svg_element.setAttribute("opacity", new_opacity);
}

function start_fade_out(svg_element) {
	var fade = setInterval(function() {
			if (svg_element.getAttribute("opacity") <= 0.1) {
				clearInterval(fade);
			}
			fade_out(svg_element);
		}, 10);
}

function fade_out(svg_element, fade) {
	console.log("opacity down!")
	var opacity = svg_element.getAttribute("opacity");	
	var new_opacity = Number(opacity) - 0.1;
	svg_element.setAttribute("opacity", new_opacity);
}

// draw_square(center[0] - square_dim/2, center[1] - square_dim/2, "MIDDLE");
// var square = svg.getElementById("MIDDLE");
// setTimeout(start_fade_out, 1000, square);

draw_random_square(grid);
setTimeout(draw_random_square, 1000, grid);
setTimeout(draw_random_square, 1000, grid);
setTimeout(draw_random_square, 1000, grid);
setTimeout(draw_random_square, 1000, grid);
setTimeout(draw_random_square, 1000, grid);
setTimeout(draw_random_square, 1000, grid);
setTimeout(draw_random_square, 1000, grid);

//square_maker = setInterval(draw_random_square, 1002, grid);
