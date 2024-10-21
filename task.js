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
		1:"Clear any clutter off the table.",
		2:"Place placemats in front of each chair.",
		3:"Set the plates on the placemats.",
		4:"Put the utensils beside the plates.",
		5:"Place the serving dishes in the center of the table.",
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
	new Task("Take a Bath", {
		1:"Turn on the water and fill the bathtub.",
		2:"Get in the tub.",
		3:"Use soap to wash your body.",
		4:"Rinse with water.",
		5:"Dry yourself with a towel.",
	}),
	new Task("Bake Cookies", {
		1:"Gather the ingredients.",
		2:"Mix the ingredients in a bowl.",
		3:"Spoon the dough onto a baking tray.",
		4:"Bake in the oven.",
		5:"Let the cookies cool.",
	}),
	new Task("Wash the Car", {
		1:"Rinse the car with water to remove dirt.",
		2:"Apply soapy water to the car with a sponge.",
		3:"Scrub the car starting from the roof down.",
		4:"Rinse the car to remove soap.",
		5:"Dry the car with a clean towel.",
	}),
	new Task("Clean the Bathroom", {
		1:"Scrub the sink with cleaner.",
		2:"Wipe down the mirror.",
		3:"Scrub the toilet with cleaner.",
		4:"Mop the floor.",
		5:"Dry everything with a clean cloth.",
	}),
	new Task("Organize a Bookshelf", {
		1:"Take all the books off the shelf.",
		2:"Dust the shelves.",
		3:"Sort the books by size or subject.",
		4:"Place the books back on the shelf neatly.",
		5:"Add any decorative items.",
	}),
	new Task("Prepare Breakfast", {
		1:"Choose what you want to eat.",
		2:"Get all the ingredients and utensils ready.",
		3:"Cook or prepare the food.",
		4:"Serve it on a plate.",
		5:"Clean up the kitchen afterward.",
	}),
	new Task("Wrap a Gift", {
		1:"Measure and cut the wrapping paper.",
		2:"Wrap the paper around the gift.",
		3:"Secure the paper with tape.",
		4:"Add ribbon or bow on top.",
		5:"Write and attach a gift tag.",
	}),
	new Task("Plan a Sleepover", {
		1:"Decide on a date for the sleepover.",
		2:"Send invitations to friends.",
		3:"Prepare snacks and games.",
		4:"Set up the sleeping bags or beds.",
		5:"Watch movies or play games with friends.",
	}),
	new Task("Learn a Magic Trick", {
		1:"Choose a magic trick to learn.",
		2:"Practice the steps of the trick.",
		3:"Add any secret moves or techniques.",
		4:"Practice in front of a mirror.",
		5:"Perform the trick for friends or family.",
	}),
	new Task("Plan a Picnic", {
		1:"Choose a location for the picnic.",
		2:"Pack a blanket and basket.",
		3:"Prepare sandwiches and snacks.",
		4:"Pack drinks and utensils.",
		5:"Head to the picnic spot.",
	}),
];
