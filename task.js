class Task{
	constructor(taskName, subtasks){
		this.subtasks = subtasks; // subtasks is a dict: { n : "Desc/name of subtask"}
		this.name = taskName;
	}

	// checks given order of subtasks against defined correct order
	// the given ordered_subtasks should be of the form { "Desc/name of subtask" : n}
	// ie an inverse of this.subtasks so u can index it against the true order
	validate_order(ordered_subtasks){
		// no point looping if the task lengths dont match lmao
		if(ordered_subtasks.length != this.subtasks.length){ return false; }

		for(let [string, index] of Object.entries(ordered_subtasks)){
			if(this.subtasks[index] != string){
				return false;
			}
		}
		return true;
	}
}

tasks = [
	new Task("Clean Your Room", {
		1:"Pick up toys and put them in the basket.",
		2:"Make your bed.",
		3:"Put dirty clothes in the laundry.",
		4:"Sweep the floor.",
		5:"Arrange books on the shelf.",
	}),
	new Task("Do Your Homework", {
		1:"Take out your homework book.",
		2:"Get your stationery ready.",
		3:"Read the first question.",
		4:"Write the answer to the first question.",
		5:"Complete the rest of the questions.",
	}),
	new Task("Brush Your Teeth", {
		1:"Squeeze toothpaste onto your toothbrush.",
		2:"Brush your teeth for two minutes.",
		3:"Rinse your mouth with water.",
		4:"Wash the toothbrush.",
		5:"Wipe your face with a towel.",
	}),
	new Task("Pack Your School Bag", {
		1:"Gather your books for tomorrow's classes.",
		2:"Put your stationery in the pencil case.",
		3:"Pack your lunch box.",
		4:"Place your water bottle in the bag.",
		5:"Zip up your bag.",
	}),
	new Task("Make a Sandwich", {
		1:"Take two slices of bread.",
		2:"Spread butter on one slice.",
		3:"Put cheese and ham between the slices.",
		4:"Place the sandwich on a plate.",
		5:"Cut it in half.",
	}),
	new Task("Water the Plants", {
		1:"Fill the watering can with water.",
		2:"Walk to the plants.",
		3:"Water each plant evenly.",
		4:"Check if any plants need more water.",
		5:"Put the watering can back.",
	}),
	new Task("Get Ready for Bed", {
		1:"Put on your pajamas.",
		2:"Brush your teeth.",
		3:"Set your alarm clock.",
		4:"Turn off the lights.",
		5:"Get into bed.",
	}),
	new Task("Set the Table for Dinner", {
		1:"Place a plate at each seat.",
		2:"Put forks and knives next to each plate.",
		3:"Set a glass at each seat.",
		4:"Arrange napkins beside the plates.",
		5:"Place a serving dish in the center.",
	}),
	new Task("Feed Your Pet", {
		1:"Get the pet food.",
		2:"Measure the right amount of food.",
		3:"Pour the food into your pet's bowl.",
		4:"Refill the water bowl.",
		5:"Put the pet food back.",
	}),
	new Task("Draw a Picture", {
		1:"Get a piece of paper.",
		2:"Take out your colored pencils.",
		3:"Draw the outline of the picture.",
		4:"Color the picture.",
		5:"Write your name at the bottom.",
	}),
];
