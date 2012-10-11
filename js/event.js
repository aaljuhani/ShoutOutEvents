// JavaScript Document
Parse.initialize("vd4AGWyFCpawPBI9o2hugn1YmRy1q0vV3aLSd3gr", "E7KcLQkrYLrccAcHGNamDkzXKDOqzfkQYoSdg7TJ");

// create a new subclass of Parse.Object.
var Event = Parse.Object.extend("Event");

// Create a new instance of that class.
var event = new Event();

// set information
event.set("Title", "Soccer Game");
event.set("Time", "4 pm");
event.set("Address", "Rogers Park");

// save object
event.save(null, {
  success: function(event) {
    // The object was saved successfully.
  },
  error: function(event, error) {
    // The save failed.
    // error is a Parse.Error with an error code and description.
  }
});

