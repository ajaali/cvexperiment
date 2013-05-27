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
  $(".steps").hide();
  $("#linkedin-login").hide();
  $("#intro").css("height", $("#logo").css("height"));
  $("#intro").animate({marginTop : "0px"},500, complete = function () { 
       $("#logo").animate({marginLeft : "-2px"},500, complete = function () {
            $("#controls").fadeIn();
          });
    });
  $("#cv-container").slideDown();
  $("#member-name").html(member.firstName + " " + member.lastName);
  $("#logout-section").show();
}


function displayProfiles(profiles) {
  member = profiles.values[0];
  logged_in_transforms(member);
  start_serious_design(member);
}


var logout = function () {
  $("#controls").hide();
  $("#cv-container").hide();
  $("#cv").empty();
  $("#prev-button").hide();
  $("#next-button").hide();
  $("#intro").css("height", "300px");
  align_intro();
  $("#logo").css("margin-left", "192px");
  $("#description").show();
  $(".steps").show();
  $("#linkedin-login").show();

}

var align_intro = function() {
  var intro = $("#intro");
  intro.css("margin-top", ($(window).height()-intro.height())/2);
}

var init_dialog = function () {
  $("#overlay").show();
  var dialog = $("#dialog");
  dialog.css("margin-top", ($(window).height()-dialog.height())/2);
  dialog.css("margin-left", ($(window).width()-dialog.width())/2);
  dialog.slideDown();
}

var show_error_dialog = function() {
  var dialog = $("#dialog");
  dialog.css("height", "285px");
  init_dialog();
  var email_input = $("<input>").attr("id", "id_email")
				 				.attr("type", "email")
								.addClass("titillium")
								.appendTo(dialog);
								
  if (member.emailAddress != '') {
	email_input.attr("value", member.emailAddress)
  }
  else {
	email_input.attr("placeholder", "email address")
  }
			  
  $("<textarea>").attr("id", "id_error_description")
				.attr("placeholder", "Enter a description of the error")
			    .addClass("titillium")
			    .appendTo(dialog);
  
  $("<button>").attr("id", "id_submit")
                .attr("type", "button")
				.html("Submit")
			    .addClass("titillium")
  			    .addClass("form_button")
			    .appendTo(dialog)
				.click(report_error);
				
  $("<button>").attr("id", "id_cancel")
			  .attr("type", "button")
   		      .addClass("titillium")
			  .addClass("form_button")
			  .html("Cancel")
			  .appendTo(dialog)
			  .click(close_dialog);

}

var close_dialog = function ()
{
  $("#dialog").empty()
              .slideUp();
  $("#overlay").hide();  
}

var report_error = function () {
  $.ajax({
	type: "POST",
    headers: {'X-CSRFToken':get_cookie('csrftoken'),
		      'sessionid':get_cookie('sessionid')},
	url: "/save_error/",
	data: { email_to: $("#id_email").val(), 
		    description: $("#id_error_description").val(),
			profile_json: JSON.stringify(member)}
  });  
  close_dialog();
}

var save_print = function () {
  $.ajax({
	type: "POST",
    headers: {'X-CSRFToken':get_cookie('csrftoken'),
		      'sessionid':get_cookie('sessionid')},
	url: "/save_print/",
	data: { email_to: $("#id_email").val(), 
			profile_json: JSON.stringify(member)}
  });  
  close_dialog();
}

var get_cookie = function (name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}


$(document).ready( function () {
  align_intro();

  $("#linkedin-login").bind('click',function () {
    IN.User.authorize(); 
    });
  $("#logout").bind('click', function () {
      IN.User.logout();
      logout();
    });
  $("#report-error").bind('click', function () {
      show_error_dialog();
  });
});