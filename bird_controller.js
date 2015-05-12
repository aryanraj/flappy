Bird = {
	x : canvas.width*0.2,
	y : canvas.height/2,
	v : 0,
	a : 9.81,
	prev_time : 0,
	start : false,
	last_interupt_time : 0
}

Bird.update = function(time)
{
	Bird.y += Bird.v*(time-Bird.prev_time);
	Bird.v += Bird.a*(time-Bird.prev_time);
	Bird.prev_time = time;
	console.log("updateing");
}

Bird.render = function(ctx)
{
	if(Bird.start)
	{
		sx = Bird.image.width/3;
		sy = 0;
		sw = Bird.image.width/3;
		sh = Bird.image.height;
		dx = Bird.x-Bird.image.width/2;
		dy = Bird.y-Bird.image.height/2;
		dw = sw * SCALE;
		dh = sh * SCALE;
		ctx.drawImage(Bird.image,sx,sy,sw,sh,dx,dy,dw,dh);
	}
}

Bird.interupt = function(time)
{
	if(time - Bird.last_interupt_time > 500)
	{
		Bird.last_interupt_time = time;
		Bird.v = -10;
	}
}

////////////////////////////////Loading image///////////////////////
Bird.image = new Image();
Bird.image.onload = function()
{
	Bird.start = true;
}
Bird.image.src = "assets/flappy_atlas.png";