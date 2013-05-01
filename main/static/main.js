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
  $("#description").hide();
  $("#linkedin-login").hide();
  $("#intro").css("height", $("#logo").css("height"));
  $("#intro").animate({marginTop : "0px"},500);
  
  $("#cv-container").slideDown();
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

var align_intro = function() {
  var intro = $("#intro");
  intro.css("margin-top", ($(window).height()-intro.height())/2);
}

$(document).ready( function () {
  align_intro();

  $("#linkedin-login").bind('click',function () {
    IN.User.authorize(); 
    });
  $("#signout").bind('click', function () {
      IN.User.logout();
      clear_cv();
      $("#login-section").show();
      $("#logout-section").hide();
      
    });
});