canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");
SCALE = canvas.height/256;
start_time = false;

addEventListener("keydown", function(e) {
	if(start_time == false)
	{
		start_time = (new Date()).getTime();
	}
	Bird.interupt((new Date()).getTime()-start_time);
});


step = function(timestamp){
	if(start_time != false)
	{
		Bird.update((new Date()).getTime()-start_time);
		Bird.render(ctx);
	}
	requestAnimationFrame(step);
}

requestAnimationFrame(step);