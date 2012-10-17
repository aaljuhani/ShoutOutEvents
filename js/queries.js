// JavaScript Document
/*******************************************
When a user Join an Event  
1) Add user to Participating array in Event Object
2) Add the Event to the participating-in array in the User Object

 ******************************************/
function addUserEvent (user_id,event_id)
{
var E = Parse.Object.extend("Event");
var U = Parse.Object.extend("user");
	
	
}

/***** Get Participants for a given Event **********/
function get_Participants(event_id)
{
var E = Parse.Object.extend("Event");
var query = new Parse.Query(E);
var Participants;
query.get(event_id, {
  success: function(E) {
// The object was retrieved successfully.
	
//get specific info on object
Participants = E.get("Participant");

  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});
return Participants;
}



/***** Get the Events that a user in participating in **********/

function get_userEvents(user_id)
{
var U = Parse.Object.extend("User");
var query = new Parse.Query(U);
var Events;
query.get(user_id, {
  success: function(U) {
// The object was retrieved successfully.
	
//get specific info on object
Events = U.get("Participating_In");

  },
  error: function(E, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	alert("there was an error retreiving object");
  }
});
return Events;
}







