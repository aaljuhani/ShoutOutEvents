// JavaScript Document
Parse.initialize("vd4AGWyFCpawPBI9o2hugn1YmRy1q0vV3aLSd3gr", "E7KcLQkrYLrccAcHGNamDkzXKDOqzfkQYoSdg7TJ");

var eventArray = new Array();

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
e.save({
	Event: document.getElementById("newEvent").value ,
	Attendees: 1 ,
	}, {
  		success: function(e) {
			
			$("#eventlist").prepend("<li id="+String(e.id)+"><a href="+"eventDetails"+">"+e.get("Event")+"</a><span class="+"ui-li-count"+">"+ e.get("Attendees") +"</span><a onClick= incAttendees(this.parentNode.id);>Join</a></li>");
		
	
		$("#eventlist").listview("refresh");
    			//it worked, do nothing
  	},
		error: function(e, error) {
			alert("there was an error");
	}
	});
	
	
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
			
        $("#eventlist").append("<li id="+String(e.id)+"><a href="+"eventDetails"+">"+e.get("Event")+"</a><span class="+"ui-li-count"+">"+ e.get("Attendees") +"</span><a onClick= incAttendees(this.parentNode.id);>Join</a></li>");
		
	
		$("#eventlist").listview("refresh");
		
		
		}
	
  },

  error: function(error) {
    	// error is an instance of Parse.Error.
  }
});	
}

function incAttendees(EventID)
{
	
var e = Parse.Object.extend("Event");
var query = new Parse.Query(e);
query.get(EventID, {
  success: function(e) {
// The object was retrieved successfully.
//	alert("object retrieved");
	
//get specific info on object
e.increment("Attendees");
e.save();
$("#eventlist").listview("refresh");
refreshPage();
  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});
	
}


$(document).delegate('#eventDetails', 'pageshow', function () {
    //Your code for each page load here
	retreiveEventDetails();
});


function retreiveEventDetails()
{
alert("showcomments");
// get Title and creator

// get comments



}