function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}

function onLinkedInAuth() {
  // Change the login div
  $("#login-section").hide();
  // Retrieve linkedin profile
  IN.API.Profile("me")
    .fields("firstName", 
            "lastName", 
            'email-address',
            'summary',
            'specialties',
            'industry',
            'positions',
            'honors',
            'interests',
            'languages',
            'skills',
            'certifications',
            'educations',
            'courses',
            'phone-numbers',
            'main-address',
            'twitter-accounts',
            'primary-twitter-account')
    .result(displayProfiles);
}

var logged_in_transforms = function (member) {
  $("#member-name").html(member.firstName + " " + member.lastName);
  $("#logout-section").show();
}


function displayProfiles(profiles) {
  member = profiles.values[0];
  console.log(member);
  logged_in_transforms(member);
  start_serious_design(member);
}


var clear_cv = function () {
  $("#cv").empty();
  $("#prev-button").hide();
  $("#next-button").hide();
}

$(document).ready( function () {
  $("#login-section").bind('click',function () {
    IN.User.authorize(); 
    });
  $("#signout").bind('click', function () {
      IN.User.logout();
      clear_cv();
      $("#login-section").show();
      $("#logout-section").hide();
      
    });
});