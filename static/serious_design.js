// Entry function to create the cv using this formating
// member -- the linkedin memeber profile
start_serious_design = function (member) {
    var content_box = create_page(member);
    
    //Create the summary section
    if (member.summary != "") {
        var summary_section = $("<div>").addClass("content-section")
                                         .appendTo(content_box);
        $("<h2>").addClass("rambla")
                 .html("EXPERTISE & OBJECTIVES")
                 .appendTo(summary_section);
        $("<p>").addClass("description cantarell")
                .html(member.summary)
                .appendTo(summary_section);
    }
    
    //Add Educations
    if (member.educations.values != undefined) {
        var education_section = $("<div>").addClass("content-section")
                                           .appendTo(content_box);
        $("<h2>").addClass("rambla")
                 .html("EDUCATION")
                 .appendTo(education_section);
        $.each(member.educations.values, function(index, edu) {
            var header = create_company_element(edu.schoolName, 
                                                 edu.startDate.year + "-" + edu.endDate.year);
            header.appendTo(education_section);
            $("<h4>").addClass("rambla")
                     .html(edu.degree + ", " + edu.fieldOfStudy)
                     .appendTo(education_section);
            if (edu.notes != undefined) {
                $("<p>").addClass("description cantarell")
                        .html(edu.notes.replace(/(\r\n|\n|\r)/gm,"<br\>"))
                        .appendTo(education_section);
            }
        });
    }    
    //Add Certifications
    if (member.certifications.values != undefined) {
        var certification_section = $("<div>").addClass("content-section")
                                               .appendTo(content_box);
        $("<h2>").addClass("rambla")
                 .html("CERTIFICATIONS")
                 .appendTo(certification_section);
        $.each(member.certifications.values, function(index, cert) {
            $("<h4>").addClass("rambla")
                     .html(cert.name)
                     .appendTo(certification_section);
        });
    }    
    //Add Languages
    if (member.languages.values != undefined) {
        var language_section = $("<div>").addClass("content-section")
                                               .appendTo(content_box);
        $("<h2>").addClass("rambla")
                 .html("LANGUAGES")
                 .appendTo(language_section);
        $.each(member.languages.values, function(index, lang) {
            $("<h4>").addClass("rambla")
                     .html(lang.language.name)
                     .appendTo(language_section);
        });
    }    
    //Add Skills
    if (member.skills.values != undefined) {
        var skill_section = $("<div>").addClass("content-section")
                                               .appendTo(content_box);
        $("<h2>").addClass("rambla")
                 .html("Skills")
                 .appendTo(language_section);
        var skills_string = ""
        $.each(member.skills.values, function(index, skill) {
            skills_string = skills_string + skill.skill.name
            if (index < member.skills.values.length - 1) {
                skills_string = skills_string + ", "
            }
        });
        $("<p>").addClass("description cantarell")
                .html(skills_string)
                .appendTo(skill_section);
    }    
}

// Convenience function to create the company-header element
create_company_element = function (name, date_period) {
    var header = $("<div>").addClass("company-header rambla");
    $("<label>").addClass("company-name")
                .html(name)
                .appendTo(header);
    $("<label>").addClass("company-dates")
                .html(date_period)
                .appendTo(header);
    return header
}

// Create a new cv page and return
// member -- the linked in member profile
create_page = function (member) {
    // Create the page div
    var page = $("<div>").addClass("page")
                          .appendTo($("#cv"));
    // Create the name box div
    var name_box = $("<div>").addClass("name-box")
                              .appendTo(page);

    $("<label>").attr("id", "name")
                .addClass("rambla")
                .html(member.firstName + ' ' + member.lastName)
                .appendTo(name_box);
    // Create the contact box
    var contact_box = $("<div>").addClass("contact-box")
                                 .appendTo(page);
    // Add Address
    if (member.mainAddress != '') {
        $("<label>").addClass("contact-title rambla")
                    .html("Address")
                    .appendTo(contact_box);
        var formatted_address = member.mainAddress.replace(/(\r\n|\n|\r)/gm,"<br\>")
        $("<label>").addClass("contact-value rambla")
                    .html(formatted_address )
                    .appendTo(contact_box);
    }
    // Add Phone Numbers
    $.each(member.phoneNumbers.values, function (index, phone) {
        $("<label>").addClass("contact-title rambla")
                    .html(phone.phoneType)
                    .appendTo(contact_box);
        $("<label>").addClass("contact-value rambla")
                    .html(phone.phoneNumber)
                    .appendTo(contact_box);
    });
    // Add Email Address
    if (member.emailAddress != '') {
        $("<label>").addClass("contact-title rambla")
                    .html("Email")
                    .appendTo(contact_box);
        $("<label>").addClass("contact-value rambla")
                    .html(member.emailAddress)
                    .appendTo(contact_box);
    }
    //Add Content Section
    var content_box = $("<div>").addClass("content-box")
                                 .appendTo(page);

    
    return content_box;
}