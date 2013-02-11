// Add an element to the page.  We check the amount of space remaining on the page and we 
// return a new page if needed
add_to_page = function (element) {
    element.appendTo(content_box);
    console.log(element);
    console.log("height " + element.outerHeight(true));
    if (space_remaining - element.outerHeight(true) < 0) {
        create_page(member);        
    }
    space_remaining = space_remaining - element.outerHeight(true);
    element.appendTo(content_box);
}

next_button_click = function () {
    var pages = $("#cv>div.page");
    if (page_shown < pages.length - 1) {
        $(pages[page_shown]).hide();
        page_shown = page_shown + 1;
        $(pages[page_shown]).show();        
    }
    else {
        // Disable the button
    }
}

prev_button_click = function () {
    var pages = $("#cv>div.page");
    if (page_shown > 0) {
        $(pages[page_shown]).hide();
        page_shown = page_shown - 1;
        $(pages[page_shown]).show();        
    }
    else {
        // Disable the button
    }
}


// Entry function to create the cv using this formating
// member -- the linkedin memeber profile
start_serious_design = function (member) {
    page_shown = 0;
    $("#prev-button").click(prev_button_click);
    $("#next-button").click(next_button_click);
    
    create_page(member, false);
    create_summary(member);
    create_position(member);
    create_education(member);
    create_certification(member);
    create_language(member);
    create_skills(member);  
    
    $("#cv>div.page").each(function (idx, page) {
        if (idx > 0) {
            $(page).hide();
        }
    });
    
}

create_summary = function (member) {
    //Create the summary section
    if (member.summary != "") {
        add_to_page($("<h2>").addClass("rambla")
                             .html("EXPERTISE & OBJECTIVES"));
        add_to_page($("<p>").addClass("description cantarell")
                             .html(member.summary));
    }
}


create_position = function (member) {
    //Add Positions
    if (member.positions.values != undefined) {
        add_to_page($("<h2>").addClass("rambla")
                              .html("WORK EXPERIENCE"));
        $.each(member.positions.values, function(index, pos) {
            var date_str = pos.startDate.month + "/" + pos.startDate.year + "-"
            if (pos.endDate != undefined) {
                date_str = date_str + pos.endDate.month + "/" + pos.endDate.year
            }
            else {
                date_str = date_str + "Current"
            }
            var header = create_company_element(pos.company.name, 
                                                 date_str);
            add_to_page(header);
            add_to_page($("<h4>").addClass("rambla")
                                  .html(pos.title));
            if (pos.summary != undefined) {
                add_to_page($("<p>").addClass("description cantarell")
                                     .html(pos.summary.replace(/(\r\n|\n|\r)/gm,"<br\>")));
            }
        });
    }
}

create_education = function (member) {
    //Add Educations
    if (member.educations.values != undefined) {
        add_to_page($("<h2>").addClass("rambla")
                              .html("EDUCATION"));
        $.each(member.educations.values, function(index, edu) {
            var header = create_company_element(edu.schoolName, 
                                                 edu.startDate.year + "-" + edu.endDate.year);
            add_to_page(header);
            add_to_page($("<h4>").addClass("rambla")
                                  .html(edu.degree + ", " + edu.fieldOfStudy));
            if (edu.notes != undefined) {
                add_to_page($("<p>").addClass("description cantarell")
                                    .html(edu.notes.replace(/(\r\n|\n|\r)/gm,"<br\>")));
            }
        });
    }   
}

create_certification = function (member) {
    //Add Certifications
    if (member.certifications.values != undefined) {
        add_to_page($("<h2>").addClass("rambla")
                              .html("CERTIFICATIONS"));
        $.each(member.certifications.values, function(index, cert) {
            add_to_page($("<h4>").addClass("rambla")
                                  .html(cert.name));
        });
    }
}

create_language = function (member) {
    //Add Languages
    if (member.languages.values != undefined) {
        add_to_page($("<h2>").addClass("rambla")
                              .html("LANGUAGES"))
        $.each(member.languages.values, function(index, lang) {
            add_to_page($("<h4>").addClass("rambla")
                                  .html(lang.language.name));
        });
    } 
}

create_skills = function (member) {
    //Add Skills
    if (member.skills.values != undefined) {
        add_to_page($("<h2>").addClass("rambla")
                              .html("Skills"));
        var skills_string = ""
        $.each(member.skills.values, function(index, skill) {
            skills_string = skills_string + skill.skill.name
            if (index < member.skills.values.length - 1) {
                skills_string = skills_string + ", "
            }
        });
        add_to_page($("<p>").addClass("description cantarell")
                            .html(skills_string));
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
create_page = function (member, hidden) {
    // Create the page div
    var page = $("<div>").addClass("page")
                          .appendTo($("#cv"));
    //if (hidden == undefined || hidden == true) {
        //page.hide();
    //}
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
    content_box = $("<div>").addClass("content-box")
                            .appendTo(page);
    space_remaining = content_box.height()
}