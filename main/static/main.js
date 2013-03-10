function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}

function onLinkedInAuth() {
  // Change the login div
  $("#login-text").hide();
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

function displayProfiles(profiles) {
  member = profiles.values[0];
  console.log(member);
  $("#logged-in-text").show()
                      .html("Hello " + member.firstName + ", you are now logged in." );
  start_serious_design(member);
}
