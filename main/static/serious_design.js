// Add an element to the page.  We check the amount of space remaining on the page and we 
// return a new page if needed
add_to_page = function (element) {
    element.appendTo(content_box);
    if (element.hasClass("alignement-container") == true) {
        element.children().each(function (idx, chl) {
        });
    }
    if (space_remaining - element.outerHeight(true) < 0) {
        create_page(member);        
    }
    element.appendTo(content_box);
    space_remaining = space_remaining - element.outerHeight(true);
}

next_button_click = function () {
    var pages = $("#cv>div.page");
    if (page_shown < pages.length - 1) {
        $(pages[page_shown]).hide();
        page_shown = page_shown + 1;
        $(pages[page_shown]).show();        
        $("#prev-button").show();
    }
    if (page_shown == pages.length - 1) {
        $("#next-button").hide();
    }
}

prev_button_click = function () {
    var pages = $("#cv>div.page");
    if (page_shown > 0) {
        $(pages[page_shown]).hide();
        page_shown = page_shown - 1;
        $(pages[page_shown]).show();        
        $("#next-button").show();        
    }
    if (page_shown == 0) {
        $("#prev-button").hide();
    }
}


// Entry function to create the cv using this formating
// member -- the linkedin memeber profile
start_serious_design = function (member) {
    page_shown = 0;  
    $("#prev-button").click(prev_button_click);
    $("#next-button").click(next_button_click);
    
    build_pages(member); 
    
    $("#cv>div.page").each(function (idx, page) {
        if (idx > 0) {
            $(page).hide();
            $("#next-button").show()
        }
    });
}

build_pages = function (member) {
    create_page(member, false);
    create_summary(member);
    create_position(member);
    create_education(member);
    create_certification(member);
    create_language(member);
    create_skills(member);  
}

create_summary = function (member) {
    //Create the summary section
    if (member.summary != undefined && member.summary != "") {
        add_to_page($("<h2>").addClass("rambla")
                             .html("EXPERTISE & OBJECTIVES"));
        add_to_page($("<p>").addClass("description cantarell")
                             .html(member.summary));
    }
}

//Add Positions
create_position = function (member) {
    // Check if the position parameter is returned in the member profile
    if (member.positions != undefined && 
         member.positions.values != undefined) {
        // Create a title header for the position section
        var top_holder = $("<div>").addClass("alignement-container");    
        $("<h2>").addClass("rambla")
                 .html("WORK EXPERIENCE")
                 .appendTo(top_holder);
                 
        // Loop over the positions
        $.each(member.positions.values, function(index, pos) {
            //Create a top holder div to make sure the formating is returned correctly on the page
            //This makes sure that the comapny name, the title and the first line of the description
            //are always kept on the same page
            if (index > 0) {
                top_holder = $("<div>").addClass("alignement-container");    
            }
            //Format the date part of the company title
            var date_str = pos.startDate.month + "/" + pos.startDate.year + "-"
            if (pos.endDate != undefined) {
                date_str = date_str + pos.endDate.month + "/" + pos.endDate.year
            }
            else {
                date_str = date_str + "Current"
            }
            
            //Add the comapny name
            var header = create_company_element(pos.company.name, 
                                                 date_str);
            header.appendTo(top_holder);
            
            //Add the title 
            $("<h4>").addClass("rambla")
                     .html(pos.title)
                     .appendTo(top_holder);
                     
            //Check if there is a summary param returned as part of the position
            if (pos.summary != undefined) {
                //split the summary by return character and loop over them adding the 
                //first one to the alignment-container div.
                $.each(pos.summary.split("\n"), function (index, line) {
                    if (index == 0) {
                        $("<p>").addClass("description cantarell")
                                 .html(line)
                                 .appendTo(top_holder);
                        add_to_page(top_holder);
                    }
                    else {
                        add_to_page($("<p>").addClass("description cantarell")
                                             .html(line));
                    }
                });
            }
            else {
                add_to_page(top_holder);
            }
            
        });
    }
}

//Add Educations
create_education = function (member) {
    //if the ed section has values the continue
    if (member.educations != undefined && 
         member.educations.values != undefined) {
        //Create the ed section header
        var top_holder = $("<div>").addClass("alignement-container");    
        $("<h2>").addClass("rambla")
                  .html("EDUCATION")
                  .appendTo(top_holder);
        //loop over the ed values
        $.each(member.educations.values, function(index, edu) {
            //Create a top holder div to make sure the formating is returned correctly on the page
            //This makes sure that the comapny name, the title and the first line of the description
            //are always kept on the same page
            if (index > 0) {
                top_holder = $("<div>").addClass("alignement-container");    
            }
            //Add the school name
            var header = create_company_element(edu.schoolName, 
                                                 edu.startDate.year + "-" + edu.endDate.year);
            header.appendTo(top_holder);
            //Add the study title
            $("<h4>").addClass("rambla")
                     .html(edu.degree + ", " + edu.fieldOfStudy)
                     .appendTo(top_holder);
                        
            //Check if there is a notes param returned as part of the education
            if (edu.notes != undefined) {
                //split the notes by return character and loop over them adding the 
                //first one to the alignment-container div.
                $.each(edu.notes.split("\n"), function (index, line) {
                    if (index == 0) {
                        $("<p>").addClass("description cantarell")
                                 .html(line)
                                 .appendTo(top_holder);
                        add_to_page(top_holder);
                    }
                    else {
                        add_to_page($("<p>").addClass("description cantarell")
                                             .html(line));
                    }
                });
            }
            else {
                add_to_page(top_holder);
            }
            
        });
    }   
}

create_certification = function (member) {
    //Add Certifications
    if (member.certifications != undefined && 
         member.certifications.values != undefined) {
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
    if (member.languages != undefined && 
         member.languages.values != undefined) {
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
    if (member.skills != undefined && 
         member.skills.values != undefined) {
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
    if (member.mainAddress != undefined && member.mainAddress != '') {
        $("<label>").addClass("contact-title rambla")
                    .html("Address")
                    .appendTo(contact_box);
        var formatted_address = member.mainAddress.replace(/(\r\n|\n|\r)/gm,"<br\>")
        $("<p>").addClass("contact-value rambla")
                    .html(formatted_address )
                    .appendTo(contact_box);
    }
    // Add Phone Numbers
    $.each(member.phoneNumbers.values, function (index, phone) {
        $("<label>").addClass("contact-title rambla")
                    .html(phone.phoneType)
                    .appendTo(contact_box);
        $("<p>").addClass("contact-value rambla")
                    .html(phone.phoneNumber)
                    .appendTo(contact_box);
    });
    // Add Email Address
    if (member.emailAddress != undefined && member.emailAddress != '') {
        $("<label>").addClass("contact-title rambla")
                    .html("Email")
                    .appendTo(contact_box);
        $("<p>").addClass("contact-value rambla")
                    .html(member.emailAddress)
                    .appendTo(contact_box);
    }
    //Add Content Section
    content_box = $("<div>").addClass("content-box")
                            .appendTo(page);
    space_remaining = content_box.height() - 30;
}