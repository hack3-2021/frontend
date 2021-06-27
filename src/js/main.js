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

}

function create_user() {
    let url = "/api/create_user?email=xxx@yyy&firstName=aaa&lastName=bbb&pictureLink=xxx&bio=I AM HUMAN I SWEAR&phoneNumber=0412212518&vaccinated=0&community=Bankstown";
    let email = "";
    let firstName = "";
    let lastName = "";
    let pictureLink = "";
    let bio = "";
}

document.addEventListener("DOMContentLoaded", function(){
    if (window.location.pathname == "/") {
        console.log();
    }
});
