random = function(a,b)
{
	return a + Math.random()*(b-a);
}

block = function(dist) {
	var min_dis = Math.pow(Bird.v_max,2)/(2*Bird.a)*1.5,
		range_top = canvas.height*0.8-min_dis;
	this.top = parseInt(random(canvas.height*0.1,range_top));
	this.bottom = this.top + min_dis;
	this.start_x = dist;
	this.speed = Block.block_distance;
	this.current_x = dist;
};

block.prototype.update = function(time) {
	this.current_x = this.start_x - this.speed*time/1000;
};

block.prototype.render = function(ctx) {
	if(!Block.start)
	{
		var image = Block.image_upper;
		sx = 0;
		sy = 0;
		sw = image.width;
		sh = image.height;
		dx = this.current_x-(image.width/2)*SCALE;
		dy = this.top - (image.height)*SCALE;
		dw = sw * SCALE;
		dh = sh * SCALE;
		ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
		image = Block.image_lower;
		sx = 0;
		sy = 0;
		sw = image.width;
		sh = image.height;
		dx = this.current_x-(image.width/2)*SCALE;
		dy = this.bottom;
		dw = sw * SCALE;
		dh = sh * SCALE;
		ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
		if(this.current_x+image.width/2 < 0)
			return false;
		else
			return true;
	}
	return true;
};

block.prototype.collision = function(x,y) {
	if( x > this.current_x-(Block.image_lower.width/2)*SCALE && 
		x < this.current_x+(Block.image_lower.width/2)*SCALE &&
		(y < this.top || y > this.bottom))
		return true;
	else
		return false;
};


Block = {
	start : -2,
	block : []
}

Block.add = function(i) {
	if(typeof i !== "undefined")
		delete Block.block[i];
	else
		i = Block.block.length;
	Block.block_x += Block.block_distance;
	Block.block[i] = new block(Block.block_x);
}

Block.render = function(ctx) {
	for(i in Block.block)
		if(!Block.block[i].render(ctx))
			Block.add(i);
}

Block.update = function(time) {
	for(i in Block.block)
		Block.block[i].update(time);
}

Block.check_collision = function(x,y) {
	for(i in Block.block)
		if(Block.block[i].collision(x,y))
			return true;
}

////////////////////////////////Loading image///////////////////////
Block.image_upper = new Image();
Block.image_lower = new Image();
Block.image_upper.onload = function()
{
	Block.start += 1;
}
Block.image_lower.onload = function()
{
	Block.start += 1;
}
Block.image_upper.src = "assets/upper.png";
Block.image_lower.src = "assets/lower.png";

game_load(function(){
	Block.block_distance = canvas.height/3
	Block.block_x = canvas.width;
	for(var i=0; i<canvas.width/Block.block_distance; i++)
		Block.add();
});