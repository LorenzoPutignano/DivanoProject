var ws_client = null;
var string_connection = "ws://192.168.1.126:81";


$(document).ready(function() {
	addButton("#surface", "SchienaleUP_on", 110, 150, 100, "green", "SchienaleUP_on");
	addButton("#surface", "SchienaleUP_off", 350, 150, 100, "red", "SchienaleUP_off");

	addButton("#surface", "SchienaleDOWN_on", 110, 370, 100, "blue", "SchienaleDOWN_on");
	addButton("#surface", "SchienaleDOWN_off", 350, 370, 100, "yellow", "SchienaleDOWN_off");

	addButton("#surface2", "PoggiapiediUP_on", 110, 150, 100, "purple", "PoggiapiediUP_on");
	addButton("#surface2", "PoggiapiediUP_off", 350, 150, 100, "brown", "PoggiapiediUP_off");

	addButton("#surface2", "PoggiapiediDOWN_on", 110, 370, 100, "black", "PoggiapiediDOWN_on");
	addButton("#surface2", "PoggiapiediDOWN_off", 350, 370, 100, "orange", "PoggiapiediDOWN_off");

});

function addButton(canvasElement, name, x, y, size, color, function_name) {
	$(canvasElement).drawArc({
		draggable: true,
		name: name,
		layer: true,
		fillStyle: color,
		bringToFront: false,
		x: x, y: y, radius: size,
		click: function() {
			eval(function_name)();
		}
	});
}

function SchienaleUP_on() {
	startWsConn("command|SchienaleUP_on#");
}

function SchienaleUP_off() {
	startWsConn("command|SchienaleUP_off#");
}
function SchienaleDOWN_on() {
	startWsConn("command|SchienaleDOWN_on#");
}

function SchienaleDOWN_off() {
	startWsConn("command|SchienaleDOWN_off#");
}
function PoggiapiediUP_on() {
	startWsConn("command|PoggiapiediUP_on#");
}

function PoggiapiediUP_off() {
	startWsConn("command|PoggiapiediUP_off#");
}
function PoggiapiediDOWN_on() {
	startWsConn("command|PoggiapiediDOWN_on#");
}

function PoggiapiediDOWN_off() {
	startWsConn("command|PoggiapiediDOWN_off#");
}

function startWsConn(command) {

	ws_client = new WebSocket(string_connection);
	append("[INFO] Start ws-client");
	ws_client.onopen = function(event) {
		append("[INFO] Connected to server!");
		ws_client.send(command);
	}

	ws_client.onmessage = function (event) {
		var msg = event.data;
		append("[INFO] Msg from server!");

		// var counter_start = msg.indexOf("(");
		// var counter_end = msg.lastIndexOf(")");
		// counter = msg.substring(counter_start+1, counter_end);
	}

	ws_client.onclose = function(event) {
		append("[WARNING] Close connection!");
	}

	ws_client.onerror = function(event) {
		append("[ERROR] Connection Error!")
	}
}

function reset_log () {
	$("#log_value").empty();
}

function addText(canvasElement, textName, text, x, y, color, size) {
	$(canvasElement).drawText({
		name: textName,
		draggable: true,
		fillStyle: color, 
		strokeStyle: color,
		strokeWidth: 2,
		x: x,
		y: y,
		fontSize: size,
		fontFamily: 'sans-serif',
		text: text
	});
}

function append(text) {
	$("#log_value").append("<li>" + text + "</li>");
}
