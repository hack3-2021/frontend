let test_email = "normal.human@gmail.com"
let test_community = "bankstown"

function render_post(post) {
    let $container = $('#stream');
    $container.prepend(`<div class="spacer"></div><div class="post"><img class="profile_picture"><b><p class="post_username"></p></b><p class="post_body"></p></div>`);
    let $post = $container.children(":first").next();
    console.log(post.html());
    $post.find("img").attr("src", post["poster"]["picture"]);
    $post.find(".post_username").text( post["poster"]["firstName"] + " " + post["poster"]["lastName"]);
    $post.find(".post_body").text(post["msg"]);
}

function callback_fetch(url, on_fetched) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        "async": true
    }).done(on_fetched);
}

function fetch_profile(email, on_fetched) {
    callback_fetch("/api/profile?email=" + email, on_fetched);
}

function fetch_community(community) {
    callback_fetch("/api/community?community=" + community, (response) => {
        response.forEach((post, index) => {
            console.log(post);
            render_post(post);
        });
    });
}

function redirect(url) {

}

document.addEventListener("DOMContentLoaded", function(){
    if (window.location.pathname == "/") { fetch_community(test_community); }
});
