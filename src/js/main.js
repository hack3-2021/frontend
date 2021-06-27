var $stream = $("#stream")

function render_post(post) {
    // Formats and appends posts to the stream div
    $stream.prepend(`<div class="spacer"></div><div class="post"><img class="profile_picture"><b><p class="post_username"></p></b><p class="post_body"></p></div>`);
    let $post = $stream.children(":first").next();
    $post.find("img").attr("src", post["poster"]["picture"]);
    $post.find(".post_username").text( post["poster"]["firstName"] + " " + post["poster"]["lastName"]);
    $post.find(".post_body").text(post["msg"]);
}

function _callback_fetch(url, on_fetched) {
    // Fetches JSON from the specified URL, parses result to on_fetched when done
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        "async": true
    }).done(on_fetched);
}

function fetch_profile(email, on_fetched) {
    // Grabs the contents of a profile
    _callback_fetch("/api/profile?email=" + email, on_fetched);
}

function show_community(community) {
    $stream.innerHTML = "";
    $stream.appendChild(`<div class="spacer"></div><div class="post"><img class="profile_picture" src="icon.png"><b><p class="post_username">Dev Team</p></b><p class="post_body">Man it's lonely down here...</p><hr></div>`);

    _callback_fetch("/api/community?community=" + community, (response) => {
        response.forEach((post, i) => render_post(port))
    });
}

function show_login() {
    $stream.innerHTML = "";


    $("#btnSignUp").click(create_user());
}

function show_about() {
    $stream.innerHTML = "";
}

function create_user() {
    let email = $("input[name='firstName']").val();
    let first_name = $("input[name='lastName']").val();
    let last_name = $("input[name='email']").val();
    let picture_url = $("input[name='profileURL']").val();
    let bio = $("input[name='bio']").val();
    let phone_number = $("input[name='phoneNum']").val();
    let vacciated = $("input[name='firstName']").val();
    let community = $("input[name='suburb']").val();
    fetch_profile(email, (response) => {
        console.log(response);
        if (response == "Not Found") {
            alert("Email already exists");
        } else {
            _callback_fetch("/api/create_user?" + `email=${email}&firstName=${first_name}&lastName=${last_name}&pictureLink=${picture_url}&bio=${bio}&phoneNumber=${phone_number}&vaccinated=${vacciated}&community=${community}`, (resp) => {
                console.log(resp);
            })
        }
    });
}

document.addEventListener("DOMContentLoaded", function(){
    if (window.location.pathname == "/") {
        console.log();
    }
});
