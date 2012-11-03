// JavaScript Document
Parse.initialize("vd4AGWyFCpawPBI9o2hugn1YmRy1q0vV3aLSd3gr", "E7KcLQkrYLrccAcHGNamDkzXKDOqzfkQYoSdg7TJ");
var commentStart = 0;


function refreshPage() {
  $.mobile.changePage(
    window.location.reload(),
    {
      allowSamePageTransition : true,
      transition              : 'none',
      showLoadMsg             : false,
      reloadPage              : true
    }
  );
}


function newEvent()
{
	//alert("createEvent");

//creates subclass for Parse Object
var Event = Parse.Object.extend("Event");
// Create a new instance of that class.
var e = new Event();
//saves the fields and value
var Creator = document.getElementById("newCreator").value;
var eventName = document.getElementById("newEvent").value;
e.save({
	
	Event: "Join " + Creator + " for " + eventName ,
	
	Attendees: 1 ,
	}, {
  		success: function(e) {

			$("#eventlist").prepend("<li id="+String(e.id)+"><a href="+"javascript:void(0)"+" onClick= retreiveEventDetails(this.parentNode.parentNode.parentNode.id);>"+e.get("Event")+"</a><span class="+"ui-li-count"+">"+ e.get("Attendees") +"</span><a onClick= incAttendees(this.parentNode.id);>Join</a></li>");
		
	
		$("#eventlist").listview("refresh");
    			//it worked, do nothing
  	},
		error: function(e, error) {
			alert("there was an error");
	}
	});
	document.getElementById("newCreator").value = "";
	document.getElementById("newEvent").value = "";
	
}


function retreiveEventList()
{
	
	var query = new Parse.Query("Event");
	//array that stores list of event objects
    var eventArray = new Array();
	query.descending("createdAt");
query.find({
	success: function(results) {
    	// results is an array of Parse.Object.
		
    	eventArray = results;
		var len = eventArray.length;
	    var e;
				
		//iterate through and display the objects
	for(i = 0; i < len; i++) {
		e = eventArray[i];
		//alert( String(e.id));
			
        $("#eventlist").append("<li id="+String(e.id)+"><a onClick= retreiveEventDetails(this.parentNode.parentNode.parentNode.id);>"+e.get("Event")+"</a><span class="+"ui-li-count"+">"+ e.get("Attendees") +"</span><a onClick= incAttendees(this.parentNode.id);>Join</a></li>");
		
	
		$("#eventlist").listview("refresh");
	
		}
	
  },

  error: function(error) {
    	// error is an instance of Parse.Error.
  }
});	
}

var participant;
function incAttendees(EventID)
{
	
	 participant = prompt("Please enter your name","Your Name");
	
	if (participant != null)
	{
		
var e = Parse.Object.extend("Event");
var query = new Parse.Query(e);
query.get(EventID, {
  success: function(e) {
// The object was retrieved successfully.
//	alert("object retrieved");
	
//get specific info on object
e.increment("Attendees");
e.add("Participant", participant);
//e.Participant[Participant.length()-1] = participant;
e.save();
$("#eventlist").listview("refresh");
refreshPage();
//$.mobile.pageLoading(true);
  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});
	
}
}


function retreiveEventDetails(EventID)
{

$.mobile.changePage("#eventDetails");
//alert(EventID);
// get Title and creator from Database
var e = Parse.Object.extend("Event");
var query = new Parse.Query(e);
//alert(EventID);
query.get(EventID, {
  success: function(e) {
// The object was retrieved successfully.

//get specific info on object
document.getElementById("eventTitle").innerHTML= e.get("Event");
document.getElementById("eventCreator").innerHTML ="";
//$("#eventDetails").listview("refresh");
//refreshPage();
//$.mobile.pageLoading(true);
var participantArray = e.get("Participant");
var colArray = ['a','b','c'];

//clear the current list of participant 
		$('#listofjoiners').children().remove('div');

for (i =0 ; i < participantArray.length ; i++)
{

$('#listofjoiners').append("<div class="+"ui-block-"+colArray[i%(colArray.length)]+">" + participantArray[i] + "</div>");
}






  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});


//// retreive comments for each event
var query = new Parse.Query("Comment");
	//array that stores list of event objects
    var commentArray = new Array();
	query.ascending("createdAt");
	query.equalTo("EventId", EventID);
query.find({
	success: function(results) {
    	// results is an array of Parse.Object.
		//alert(EventID);
		//alert(results);
		
    	commentArray = results;
		var len = commentArray.length;
	    var c;		
		
		//clear the current list of comments 
		$('#commentslist').children().remove('li');
		
	//iterate through and display the objects
	for(i = 0; i < len; i++) {
		c = commentArray[i];
		//alert( String(e.id));
		
       $("#commentslist").append("<li id="+String(c.id)+"><h3>"+ c.get("comment")+"</h3><p>"+ "" +"</p><p class="+"ui-li-aside"+">"+ c.createdAt +"</p></li>");
	
		$("#commentslist").listview("refresh");
		
		}
  },

  error: function(error) {
    	// error is an instance of Parse.Error.
  }
});	




	
}

function newComment()
{
	
var EventID;
var eventTitle = document.getElementById("eventTitle").innerHTML;
//look for event Id 
var e = Parse.Object.extend("Event");
var query = new Parse.Query(e);


query.equalTo("Event",eventTitle );
query.first({
  success: function(e) {
// The object was retrieved successfully.

//get specific info on object
EventID = e.id;
// add comments
//creates subclass for Parse Object
var Commenter = document.getElementById("newCommenter").value;
var Comment = Parse.Object.extend("Comment");
// Create a new instance of that class.
var c = new Comment();
//saves the fields and value
c.save({
	comment: Commenter + ": " + document.getElementById("newComment").value ,
	EventId: EventID ,
	}, {
  		success: function(c) {
			
			$("#commentslist").append("<li id="+String(c.id)+"><h3>"+ c.get("comment")+"</h3><p>"+ "" +"</p><p class="+"ui-li-aside"+">"+ c.createdAt +"</p></li>");
		
	
		$("#commentslist").listview("refresh");
    			//it worked, do nothing
	document.getElementById("newCommenter").value = "";
	document.getElementById("newComment").value = "";
  	},
		error: function(e, error) {
			alert("there was an error");
	}
	});

  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});


}

/*
$(document).delegate('#eventDetails', 'pageshow', function () {
    //Your code for each page load here
	alert("retreive comment");
});*/