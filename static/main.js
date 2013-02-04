function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}

function onLinkedInAuth() {
  // Change the login div
  $("#login-text").hide();
  // Retrieve linkedin profile
  IN.API.Profile("me")
    .fields("firstName", "lastName", "industry")
    .result(displayProfiles);
}

function displayProfiles(profiles) {
  var member = profiles.values[0];
  $("#logged-in-text").show()
                      .html("Hello " + member.firstName + ", you are now logged in." );
  start_serious_design(member);
}
