let buttons = {};
let scene = "";

const list_rect = [windowW/2 - 300, 180, 600, 400];
let mainList = new List(list_rect);
mainList.populate_from_rand_array(tasks);

let timer = 0;
let maxTimer = 0;
let easyMaxTimer = 30;
let advancedMaxTimer = 20;
let round = 1;

let transTimer = 0;
let transTimerMax = 8;
let transThresh = 2;
let score = 0;
let highScore = 0;

let titleBg = new image("./assets/imgs/bg/torn_paper.png");
let introImg = new image("./assets/imgs/lex/intro.png");
let failImg = new image("./assets/imgs/lex/try_again.png");
let correctImg = new image("./assets/imgs/lex/congrats.png");
let endImg = new image("./assets/imgs/lex/end.png");

class Confetti{
	constructor(x,y,theta,speed,prnt){
		this.pos = [x,y];
		this.vel = [Math.cos(theta)*speed, -Math.sin(theta)*speed];
		this.grav = [0,random(0.5,2)*0.2];
		this.drag = 0.97;
		this.parent = prnt;

		this.col = this.rand_col();
		this.rad = random(3,12);
	}
	rand_col(){
		let choices = [
			"#a864fd",
			"#29cdff",
			"#78ff44",
			"#ff718d",
			"#fdff6a",
		];
		return choices[random(0,choices.length-1, true)];
	}
	update(){
		this.pos = add(this.pos, this.vel);
		this.vel = add(this.vel, this.grav);
		this.vel = math.multiply(this.vel, this.drag);
		if(this.pos[1] >= windowH + this.rad && this.vel[1] > 0){
			this.parent.del(this);
		}
	}
	draw(){
		drawCircle(this.pos, this.rad, this.col);
	}
}
class ConfettiManager{
	constructor(){
		this.confetti = [];
		this.toRm = [];
	}
	del(obj){
		this.toRm.push(obj);
	}
	spawn_confetti_rain(){
		this.confetti.push(new Confetti(
			random(0,windowW), -50, //x, y
			Math.PI/2, // theta
			random(1, 2), this, //speed, parent
		));
	}
	spawn_confetti(){
		this.confetti.push(new Confetti(windowW/2, windowH*1.2, (0.5+random(-0.125,0.125))*Math.PI, random(0,40), this));
	}
	rain(){
		this.spawn_confetti_rain();
	}
	blast(amtn){
		for(let i = 0; i < amtn; i++){
			this.spawn_confetti();
		}
	}
	draw(){
		for(let i of this.confetti){
			i.draw();
		}
	}
	update(){
		for(let i of this.confetti){
			i.update();
		}
		for(let j of this.toRm){
			this.confetti = arrayRemove(this.confetti, j);
		}
		this.toRm = [];
	}
}
conf_man = new ConfettiManager();

function lerpFunc(t){
	return Math.exp(-20*((t-0.5)**2)) - 0.01;
}
class Button{
	constructor(rect, col, text){
		this.rect = rect;
		this.col = col;
		this.text = text;
		this.oldMouseDown = false;

		try{
			this.img = new image("./assets/imgs/ui/"+text+".png");
			this.selected_img = new image("./assets/imgs/ui/"+text+"_selected.png");
		} catch (e){
			console.log(e);
		}
	}
	update(){
		let collision = AABBCollision(this.rect, [mouse.x, mouse.y, 0, 0]);
		let pressed = !this.oldMouseDown && mouse.button.left;
		if(collision && pressed){
			this.onPress();
		}

		this.oldMouseDown = mouse.button.left;
	}
	draw(){
		let coll = AABBCollision(enlargeRect(this.rect, 0.9, 0.9), [mouse.x, mouse.y, 0,0]);
		if(coll){
			this.selected_img.drawImg(...enlargeRect(this.rect, 1.05,1.05), 1);
		}else{
			this.img.drawImg(...this.rect, 1);
		}
	}

	onPress(){
		console.log("on press not overriden!");
	}
}

function end_game(){
	//switch_to_menu(); // temp
	scene = "end";
	buttons = {};
	buttons["exit"] = new ExitButton();
	buttons["reload"] = new ReloadButton();
	if(score > highScore){
		highScore=score;
	}
}

shouldDoNewRound = false;
let blinkTimer = 0;

function new_round(){
	mainList.populate_from_rand_array(tasks);
	timer = maxTimer - 5*round;
	round ++;
	if(round > 3){
		end_game(); // end game
	}
	shouldDoNewRound = false;
	if(beginGame){
		beginGame = false;
		setup_start_vars();
	}
}

function correct_order(){
	shouldDoNewRound = true;
	transTimer = transTimerMax;
	conf_man.blast(200);
	score += 5 * 100;
	score += 50 * Math.round(timer);
	return;
}

class ValidateButton extends Button{
	constructor(list){
		super([140,200,110,100], "red", "check");
		this.list = list;
	}

	onPress(){
		if(this.list.validate()){
			correct_order();
			return;
		}
		mainList.shake = 300;
		mainList.shakeIntensity = 20;
		this.list.sort_self();
		buttons["retry"] = new RetryButton(this.list);
		delete buttons["validate"];
		failTimer = 0;
	}
}
class ExitButton extends Button{
	constructor(list){
		super([240,410,100,100], "blue", "exit");
		this.list = list;
	}

	onPress(){
		transTimer = transThresh;
		goToMenu = true;
	}
}

class ReloadButton extends Button{
	constructor(list){
		super([140,410,100,100], "blue", "retry");
		this.list = list;
	}

	onPress(){
		switch_to_main();
	}
}

class RetryButton extends Button{
	constructor(list){
		super([140,410,100,100], "blue", "retry");
		this.list = list;
	}


	onPress(){
		this.list.retry();
		buttons["validate"] = new ValidateButton(mainList);
		delete buttons["retry"];
	}
}
class AdvancedButton extends Button{
	constructor(){
		super([windowW*0.05, windowH*0.85, 290, 75], "red", "advanced");
	}
	onPress(){
		maxTimer = advancedMaxTimer;
		switch_to_main();
	}
}
class EasyButton extends Button{
	constructor(){
		super([windowW*0.05, windowH*0.7, 290, 75], "green", "easy");
	}
	onPress(){
		maxTimer = easyMaxTimer;
		switch_to_main();
		mainList.mode = 'easy'
	}
}

class SortButton extends Button{
	constructor(){
		super([windowW*0.25 - 200, windowH/2, 100, 40], "green", "easy");
	}
	draw(){
		let collision = AABBCollision(this.rect, [mouse.x, mouse.y, 0, 0]);
		if(collision){
			drawRect(enlargeRect(this.rect, 1.25, 1.25), this.col);
			drawRect(enlargeRect(this.rect, 1.25, 1.25), "white", 0, 0, 1, 10);
			showText(this.text, this.rect[0]+this.rect[2]/2, this.rect[1]+this.rect[3]/2, 1.25*this.rect[2]/5, "black", true);
		}else{
			drawRect(this.rect, this.col);
			showText(this.text, this.rect[0]+this.rect[2]/2, this.rect[1]+this.rect[3]/2, this.rect[2]/5, "white", true);
		}
	}
	onPress(){
		mainList.sort_self();
	}
}

beginGame = false;
function switch_to_main(){
	goToMenu = false;
	transTimer = transThresh;
	shouldDoNewRound = true;
	beginGame = true;
	timer = maxTimer;
}

function setup_start_vars(){
	round = 1;
	timer = maxTimer;
	buttons = {};
	score = 0;
	// debug
	//buttons['debug'] = new SortButton();
	//
	mainList = new List(list_rect);
	mainList.populate_from_rand_array(tasks);
	buttons["validate"] = new ValidateButton(mainList);
	scene = "main";
	mouse.button.left = false;
}

function switch_to_menu(){
	mainList.mode = "";
	buttons = {};
	buttons["Easy"] = new EasyButton();
	buttons["Advanced"] = new AdvancedButton();
	scene = "menu";
	mouse.button.left = false;
}

let display_score = 0;
let clock = new image("./assets/imgs/bg/clock.png");
function draw_main(){
	mainList.draw();
	drawCircle([windowW*0.49, 55], 50, "white"); 
	drawCircle([windowW*0.49, 55], 40, "black"); 
	showText(round, windowW*0.49, 70, 50, "white", true);

	let scoreboardRect = [windowW/2 + 80, 0, windowW/5.2, 70];
	if(display_score < score){
		let dScore = Math.round((score - display_score)/80);
		if(dScore < 2){
			dScore = 2;
		}
		display_score += dScore;
	}else{
		display_score = score;
	}
	drawRect(scoreboardRect, "black")
	drawRect([windowW/2 + 80+0.125*windowW/5.2, 20, 0.75*windowW/5.2, 70], "black")
	showText(display_score, scoreboardRect[0] + scoreboardRect[2]/2, scoreboardRect[1] + scoreboardRect[3]*0.7, 50, "white", false, false, "Orbitron");
	showText("score", scoreboardRect[0] + scoreboardRect[2]/2, scoreboardRect[1] + scoreboardRect[3]*1.2, 30, "white", false, false, "Orbitron");


	clock.drawImg(windowW/4.5, 0, windowW/5.2, 70, 1);
	let num = Math.round(timer);

	if(!("validate" in buttons)){
		blinkTimer ++;
	}
	if("validate" in buttons || blinkTimer%100 < 50){
		showText("00:"+String(num).padStart(2, '0'), windowW/4.5 + 40, 45, 30, "black", false, false, "Orbitron", "left");
	}
	//showText(num, windowW/4.5+110, 60, 45, "black", false, false, "Orbitron", "left");
	conf_man.draw();
}
function update_main(){
	mainList.update();
}

function draw_menu(){
	//drawRect([0,0, windowW, windowH], "yellow");
	titleBg.drawImg(windowW/2 - 475, 20, 950, 150, 1);
	showText("Kai's Procrastination Buster", windowW/2, 110, 65, "black", true, true, "Delicious Handrawn");

	introImg.drawImg(windowW*0.45, windowH*0.3, windowW*0.6, windowH*0.8, 1);

	bgRect = [25,windowH*0.35,windowW*0.4,150];
	drawRect(enlargeRect(bgRect, 1.1, 1.1), "white");
	drawRect(bgRect, "black");
	showText("HIGHSCORE:", 40, windowH *0.45, 50, "white", false, false, "Orbitron", "left");
	showText(highScore, 215, windowH*0.45+50, 50, "white", false, false, "Orbitron", "center");
}
function update_menu(){
}

function draw_end(){
	endImg.drawImg(-200,50,windowW*1.2,windowH,1);
	conf_man.rain();
	conf_man.draw();
}
function update_end(){
}

let bg = new image("./assets/imgs/bg/room.png");
correctRect = [windowW*0.4, windowH*0.3, windowW*0.6, windowH*0.8];
correctRestY = windowH+100;
correctTargetY = windowH*0.3;

failRect = [0.7*windowW*0.4, windowH, 1.2*windowW*0.6, 1.2*windowH*0.8];
failRestY = windowH+100;
failTargetY = windowH*0.1;
let failTimer = 0;
switch_to_menu();
end_game();

let goToMenu = false;
let prev_time = 0;
function main(curr_time){
	if(prev_time == 0){ prev_time = curr_time; }
	let dt = curr_time - prev_time;
	prev_time = curr_time;

	//drawRect([0,0, windowW, windowH], "white");
	bg.drawImg(0,0,windowW,windowH, 1);

	if(maxTimer == easyMaxTimer){ mainList.mode = "easy"; }

	// update
	if(transTimer <= transThresh/2){
		if(scene == "main"){
			update_main();
			if(transTimer <= 0 && "validate" in buttons){
				timer -= dt/1000;
			}
			if(timer <= 0){
				switch_to_menu();
			}
		}else if(scene == "menu"){
			update_menu();
		}else if(scene == "end"){
			update_end();
		}
		for(let [key, bttn] of Object.entries(buttons)){
			bttn.update();
		}
		correctRect[1] = correctRestY;
	}else{
		// enters here if transitioning but not full black yet
		if(shouldDoNewRound){
			// if success
			if(correctRect[1] > correctTargetY){
				correctRect[1] = lerp(correctRect[1], correctTargetY, 0.1);
			}
		}
	}
	conf_man.update();
	transTimer -= dt/1000;
	if(transTimer <= transThresh/2){
		if(shouldDoNewRound){
			new_round();
		}
		else if(goToMenu){
			goToMenu = false;
			switch_to_menu();
		}
	}

	// draw
	if(scene == "main"){
		draw_main();
		correctImg.drawImg(...correctRect, 1);
		failImg.drawImg(...failRect, 1);
		if("retry" in buttons && failTimer < 5){ // if retrying
			failRect[1] = lerp(failRect[1], failTargetY, 0.1);
			failTimer += dt/1000;
		}else{
			failRect[1] = lerp(failRect[1], failRestY, 0.1);
		}
	}else if(scene == "menu"){
		draw_menu();
	}else if(scene == "end"){
		draw_end();
	}
	for(let [key, bttn] of Object.entries(buttons)){
		bttn.draw();
	}
	if(transTimer <= transThresh){
		drawRect([0,0,windowW*1.1*lerpFunc(transTimer/transThresh), windowH], "black");
	}

	oldKeys = {...keys};

	requestAnimationFrame(main);
}

requestAnimationFrame(main);

