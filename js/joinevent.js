// JavaScript Document
Parse.initialize("vd4AGWyFCpawPBI9o2hugn1YmRy1q0vV3aLSd3gr", "E7KcLQkrYLrccAcHGNamDkzXKDOqzfkQYoSdg7TJ");
<<<<<<< HEAD

=======
//array that stores list of event objects
var eventArray = new Array();

//creates events from user input, have to implement front end
function createEvent() {
>>>>>>> 98a49f22d2d088ce7b288f7c3a70744512dbaa19
//creates subclass for Parse Object
var Event = Parse.Object.extend("Event");
// Create a new instance of that class.
var e = new Event();
//saves the fields and value
e.save({
	Event: "Soccer Game",
	Location: "lakeside field",
	Day: "Wed",
	Time: "7:00pm",
	Description: "Let's play soccer before it gets cold",
	Creator: "Mark",
	}, {
  		success: function(e) {
    			//it worked, do nothing
  	},
		error: function(e, error) {
			alert("there was an error");
	}
	});
<<<<<<< HEAD
	
// retreive collection
	
	
	
//retreive object
var E = Parse.Object.extend("Event");
var query = new Parse.Query(E);
query.get("khwFsSd0xI", {
  success: function(E) {
// The object was retrieved successfully.
	
		
//get specific info on object
var who = E.get("Creator");
var what = E.get("Event");
var whenT = E.get("Time");
var whenD = E.get("Day");
var description = E.get("Description");
var where = E.get("Location");

//write information to screen
var event2join = "Join " + who + " For "+ what + " on " + whenD + " at " + whenT + "";
//1) create Element
var newEvent = document.createElement("h4");
var newDes = document.createElement("p");
//2)create text
var EventText = document.createTextNode(event2join);
var DesText = document.createTextNode(description + " @ " + where);
//3) Append text to NewElemnt
newEvent.appendChild(EventText);
newDes.appendChild(DesText);
//4)Append New Element to html
document.getElementById("eventList").appendChild(newEvent);
document.getElementById("eventList").appendChild(newDes);
  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});
=======
}
	
// retreive entire query:
function retreiveQuery() {
var query = new Parse.Query("Event");
query.find({
  success: function(results) {
    	// results is an array of Parse.Object.
    	eventArray = results;
  },

  error: function(error) {
    	// error is an instance of Parse.Error.
  }
});	
displayObjects();
}



function displayObjects(){
	alert("Here are the events");
	//length of array of events
	var len = eventArray.length;
	var E;
	//iterate through and display the objects
	for(i = 0; i < len; i++) {
		E = eventArray[i];
		var who = E.get("Creator");
		var what = E.get("Event");
		var whenT = E.get("Time");
		var whenD = E.get("Day");
		var description = E.get("Description");
		var where = E.get("Location");

		//write information to screen
		var event2join = "Join " + who + " For "+ what + " on " + whenD + " at " + whenT + "";
		//1) create Element
		var newEvent = document.createElement("h4");
		var newDes = document.createElement("p");
		//2)create text
		var EventText = document.createTextNode(event2join);
		var DesText = document.createTextNode(description + " @ " + where);
		//3) Append text to NewElemnt
		newEvent.appendChild(EventText);
		newDes.appendChild(DesText);
		//4)Append New Element to html
		document.getElementById("eventList").appendChild(newEvent);
		document.getElementById("eventList").appendChild(newDes);
	}
}
>>>>>>> 98a49f22d2d088ce7b288f7c3a70744512dbaa19



