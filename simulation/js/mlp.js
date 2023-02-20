	var ctx = null;
	var canvas;
	var x1, x2;
	var x,y;
	var pointSize = 5;
	var transX,transY;
	var counter=0;
	var red_counter = 0;
	var blue_counter = 0;
	var blue_array = new Array();
	var red_array = new Array();
    var arr = new Array();
    var color1,cord;
	var arr1= [];
	var arr2= [];
	var counter=0;
    var iteration =0;
    var tot_iteration=0;
	
    $(document).ready(function(){
	$("#mycanvas").click(function(e){
	getPosition(e);
	});
	});
	
		
	
	window.onload = function () {
	canvas = document.getElementById("mycanvas"),
	ctx = canvas.getContext('2d'),
	transX = canvas.width * 0.05, //21
	transY = canvas.height * 0.95; //399
	ctx.translate(transX, transY);
	ctx.fillRect(0,-transY, 1, canvas.height); //vertical Axis
	ctx.fillRect( - transX, 0, canvas.width, 1); //Horizantal Axis
	canvas.onmousemove = function(e) {
	var pos = getMousePos(canvas, e);
	out.innerHTML = 'X:' + pos.x + ' Y:' + pos.y;
	}
	drawVerticalAxisTicks();
	drawHorizontalAxisTicks();
	label();
	x_arrow();
	y_arrow();
	};
    <!-----------------------end of axis translation--------------------->
	function getPosition(event){
	var rect = canvas.getBoundingClientRect();
	x = event.clientX - rect.left- transX;
	y = event.clientY - rect.top- transY;
	
	drawCoordinates(x,y);
	}
	function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	x: evt.clientX - rect.left  - transX,
	y: evt.clientY - (rect.top+0.5) - transY
	
	   };
	}
   <!------------------------end of mousepos---------------------------->
	function drawCoordinates(x,y){    
	// alert("X = "+x+"     "+"Y = "+y);
	ctx = document.getElementById("mycanvas").getContext("2d");
	color1 = $("select#color").val();
	ctx.fillStyle = color1;
	cord = x+"|"+y;
	if(color1 == "red"){
	red_counter=red_counter+1;
	red_array.push(cord);
	}else if(color1 == "blue"){ 
	blue_counter=blue_counter+1;
	blue_array.push(cord);
	//drawGrid("blue", 10, 10);
	}
	ctx.beginPath();
	ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
	ctx.fill();
	arr1[counter] = x;
	arr2[counter] = y;
	counter++;
	
	}
    <!------------------------end of drawcordinates---------------------------->
	function drawGrid(color, stepx, stepy) {
	//ctx.fillStyle = "White";
	ctx.fill();
	ctx.lineWidth = 1;
	for (var i = 3; i < 335; i= i+stepx) {
	ctx.beginPath();
	ctx.moveTo(i, 0);
	ctx.lineTo(i, -330);
	ctx.stroke();
	ctx.strokeStyle = color;
	}
	for (var i = -330; i <1; i= i+stepy) {
	ctx.beginPath();
	ctx.moveTo(334, i);
	ctx.lineTo(  0, i);
	ctx.strokeStyle = color;
	ctx.stroke();
	}
	} 
   <!-------------------------------end of drawgrid ---------------------------------->
	function learn(){
    if(red_counter>blue_counter){
	drawGrid('red', 10, 10);
	}
	else if(red_counter<blue_counter){
	drawGrid('blue', 10, 10);
	}
	else if(red_counter==blue_counter){
	drawGrid('#8C0073', 10, 10);
	}
	iteration = parseInt($("#txtIterations").val());
	tot_iteration = ($("#totalIterations").val() != '' ? parseInt($("#totalIterations").val()) : 0);
	tot_iteration += iteration;
	$("#totalIterations").val(tot_iteration);
	//totalIterations=txtIterations++;
	//alert(blue_counter);
	//alert(red_counter);
	}
   <!-------------------------------end of learn ---------------------------------->
	   
	function drawVerticalAxisTicks() {
	var deltaX;
	for (var i = 1; i < 2; ++i) {
	ctx.beginPath();
	ctx.strokeStyle = "black";
	if (i % 5 === 0)
	deltaX = 10 / 2;
	else
	deltaX = 10 / 2;
	ctx.moveTo(-5, -350 + i * 25);
	ctx.lineTo(0 + deltaX , -350 + i * 25);
	
	ctx.stroke();
	 }
	}
	function drawHorizontalAxisTicks() {
	var deltaY;
	for (var i = 1; i < 2; ++i) {
	ctx.beginPath();
	if (i % 5 === 0)
	deltaY = 10 / 2;
	else
	deltaY = 10 / 2;
	ctx.moveTo( 300 + i * 25, -5);
	ctx.lineTo(300 + i * 25, deltaY);
	ctx.strokeStyle = "black";
	ctx.stroke();
	 }
	}
   <!------------------------------end of draw Axis Ticks------------------------------>
	function label()
	{
	var num = [ ' 1 '],
	x, w, i = 0;
	var z = 0;
	ctx.fillStyle = "black";
	ctx.font = "12px Verdana";
	for (i = 0; i < num.length; i++){
	ctx.fillText(num[i], z + 320, 15);
			   
	}
	var num= ['1'],
	y,w,j= 0;
	ctx.fillStyle="black";
	ctx.font="12px Verdana";
	for(j=0;j<num.length;j++){
	ctx.fillText(num[j], -15, -320);
	}
	}
  <!-------------------------------end of labeling axis----------------------------------->
	function x_arrow()
	{ 
	ctx.beginPath();
	ctx.moveTo(398,0);
	ctx.lineTo(392,-8);
	ctx.moveTo(398,0);
	ctx.lineTo(392,8);
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.fillText("X1",378,15);
	}
	function y_arrow()
	{ 
	ctx.beginPath();
	ctx.moveTo(0,-398);
	ctx.lineTo(-8,-392);
	ctx.moveTo(0,-398);	
	ctx.lineTo(8,-392);
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.fillText("X2",-20,-378);
	}
    <!------------------------end of x and y arrow------------------------>
	function redraw(){
		canvas = document.getElementById("mycanvas");
		ctx = canvas.getContext('2d');
		counter=(red_counter+blue_counter);
		var i=0;
		for(i=0; i<red_array.length; i++) {
			var xy_co = red_array[i].split("|");
			ctx.beginPath();
			ctx.arc(parseFloat(xy_co[0]),parseFloat(xy_co[1]),pointSize, 0, Math.PI * 2, true);
			ctx.fillStyle = "red";
			ctx.fill();
		}
		for(i=0; i<blue_array.length; i++) {
			var xy_co = blue_array[i].split("|");
			ctx.beginPath();
			ctx.arc(parseFloat(xy_co[0]),parseFloat(xy_co[1]),pointSize, 0, Math.PI * 2, true);
			ctx.fillStyle = "blue";
			ctx.fill();
		}
	}
	
	function init(){
	ctx.fillStyle = "black";
	var bttn = document.getElementById('init-btn').value;
    document.getElementById("init-btn").value = "Off";
	ctx.clearRect(-21,-400, canvas.width, canvas.height);
	ctx.fillRect(0,-transY, 1, canvas.height); //vertical Axis
	ctx.fillRect( - transX, 0, canvas.width, 1); //Horizantal Axis
	drawVerticalAxisTicks();
	drawHorizontalAxisTicks();
	label();
	x_arrow();
	y_arrow();
	redraw();
	}
  <!-----------------------------end of labeling init button------------------------------>
    function clr() {
	var retval=confirm("Are you sure?");
	if(retval==true){
	ctx.fillStyle = "black";
	//alert("ssssss");
	ctx.clearRect(-21,-400, canvas.width, canvas.height);
	ctx.fillRect(0,-transY, 1, canvas.height); //vertical Axis
	ctx.fillRect( - transX, 0, canvas.width, 1); //Horizantal Axis
    document.getElementById("totalIterations").value = 0;
	red_array.length = 0;
	blue_array.length = 0;
    drawVerticalAxisTicks();
	drawHorizontalAxisTicks();
	label();
	x_arrow();
	y_arrow();
	}
}  <!-----------------------------end of labeling clear button------------------------------>
