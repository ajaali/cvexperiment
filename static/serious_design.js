start_serious_design = function (member) {
    var page = create_page();
    
}

create_page = function () {
    var page = $("<div>").addClass("page")
                          .appendTo($("#cv"));
    var name_box = $("<div>").addClass("name-box")
                    .appendTo(page);
    $("<label>").attr("id", "name")
                .addClass("rambla")
                .html("name goes here")
                .appendTo(name_box);
    $("<div>").addClass("contact-box")
              .appendTo(page);
                          
    return page;
}