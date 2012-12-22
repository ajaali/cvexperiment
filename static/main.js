


function onLinkedInLoad() {
//     IN.Event.on(IN, "auth", onLinkedInAuth);
}

/*
function onLinkedInAuth() {
     IN.API.Profile("me").result(displayProfiles);
}

function displayProfiles(profiles) {
     member = profiles.values[0];
     document.getElementById("profiles").innerHTML = 
          "<p id=\"" + member.id + "\">Hello " +  member.firstName + " " + member.lastName + "</p>";
}*/
/*
function onLinkedInAuth() {
  IN.API.Profile("me","url=http://www.linkedin.com/in/jakobheuser")
    .fields("firstName", "lastName", "industry")
    .result(displayProfiles);
}


function displayProfiles(profiles) {
  var profilesDiv = document.getElementById("profiles");

  var members = profiles.values;
  for (var member in members) {
    profilesDiv.innerHTML += "<p>" + members[member].firstName + " " + members[member].lastName 
      + " works in the " + members[member].industry + " industry.";
  }
}
*/

function setHeights () {
	console.log($("#cv_body").height())
	$("#contact_place").height($("#cv_body").height());
}

//$(document).ready( setHeights );
