let test_email = "normal.human@gmail.com"

async function render_post(email, contents) {

    let $container = $('#stream');
    $container.prepend(`<div class="post"><img><b><p class="name"></p></b><p class="body"></p></div>`);
    let user_data = {};

    $.ajax({
        url: "/api/profile?email=" + email,
        type: 'GET',
        dataType: 'json',
        "async": true,
    }).done( function (response) {
        $container.children("img").attr("src", response["picture"]);
        $container.children("p.first").text(response["firstName"] + " " + response["lastName"]);
        $container.children("p").last().text(contents)
    })
}

function fetch_user(email) {
    
    return user_data;
}

render_post(test_email, "bing bong")
