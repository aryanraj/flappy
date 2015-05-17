var game_functions = [],
	interval;

function game_load(func) {
	game_functions.push(func);
};

function send_interupt(e) {
	if(start_time == false)
	{
		start_time = (new Date()).getTime();
	}
	Bird.interupt((new Date()).getTime()-start_time);
}

step = function(timestamp){
	ctx.clearRect (0,0,canvas.width,canvas.height);
	
	ctx.beginPath();
	ctx.moveTo(0,canvas.height*0.05);
	ctx.lineTo(canvas.width,canvas.height*0.05);
	ctx.lineTo(canvas.width,canvas.height*0.9);
	ctx.lineTo(0,canvas.height*0.9);
	ctx.lineTo(0,canvas.height*0.1);
	ctx.stroke();	
	
	if(start_time != false)
	{
		var time = (new Date()).getTime()-start_time;
		Bird.update(time);
		Block.update(time);
		if(Block.check_collision(Bird.x, Bird.y)) {
			clearInterval(interval);
			location.reload();
		}
	}
	Bird.render(ctx);
	Block.render(ctx);
}

game_load(function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	canvas.height = document.body.clientHeight;
	canvas.width = document.body.clientWidth;
	SCALE = canvas.height/256;
	start_time = false;

	addEventListener("keydown", send_interupt);
	addEventListener("touchstart", send_interupt);
	
	interval = setInterval(step,20);
});

document.onreadystatechange = function() {
	if(document.readyState == "complete")
	{
		for(i in game_functions)
			game_functions[i]();
	}
}