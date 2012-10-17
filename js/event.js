// JavaScript Document
Parse.initialize("vd4AGWyFCpawPBI9o2hugn1YmRy1q0vV3aLSd3gr", "E7KcLQkrYLrccAcHGNamDkzXKDOqzfkQYoSdg7TJ");



function newEvent()
{
	alert("createEvent");

//creates subclass for Parse Object
var Event = Parse.Object.extend("Event");
// Create a new instance of that class.
var e = new Event();
//saves the fields and value
e.save({
	Event: document.getElementById("newEvent").value ,
	Attendees: 1 ,
	}, {
  		success: function(e) {
    			//it worked, do nothing
  	},
		error: function(e, error) {
			alert("there was an error");
	}
	});
	
	$("ul").prepend("<li><a href="+"page"+">"+e.get("Event")+"</a><span class="+"ui-li-count"+">"+ e.get("Attendees") +"</span><a href="+"#"+" onclick="+"incAttendees("+e.get("objectId")+">Join</a></li>");
	
		$("ul").listview("refresh");
	
}


function retreiveEventList()
{
	//alert("retreiveEventList");
	var query = new Parse.Query("Event");
	//array that stores list of event objects
    var eventArray = new Array();
	
query.find({
	success: function(results) {
    	// results is an array of Parse.Object.
		
    	eventArray = results;
		var len = eventArray.length;
	    var E;
		var id;
		//iterate through and display the objects
	for(i = 0; i < len; i++) {
		E = eventArray[i];
		//alert(E.id);
		id = E.id;
		alert(id);
	$("ul").append("<li><a href="+"eventComments"+">"+E.get("Event")+"</a><span class="+"ui-li-count"+">"+ E.get("Attendees") +"</span><a href="+"#"+" onclick="+"incAttendees(id)"+">Join</a></li>");
	
		$("ul").listview("refresh");
		}
	
  },

  error: function(error) {
    	// error is an instance of Parse.Error.
  }
});	
}

function incAttendees(EventID)
{
	alert("incAttendees");
	alert(EventID);
var E = Parse.Object.extend("Event");
var query = new Parse.Query(E);
query.get(EventID, {
  success: function(E) {
// The object was retrieved successfully.
	alert("object retrieved");
	
		
//get specific info on object
//E.get("Attendees")++;
E.increment("Attendees");
E.save();
  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});


	
}