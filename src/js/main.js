let test_email = "normal.human@gmail.com"

async function render_post(email, contents) {
    let $container = $('#stream');
    $container.prepend(`<div class="post"><img class="profile_picture"><b><p class="post_username"></p></b><p class="post_body"></p></div>`);
    let $post = $container.children("div.first");

    $.ajax({
        url: "/api/profile?email=" + email,
        type: 'GET',
        dataType: 'json',
        "async": true,
    }).done( function (response) {
        console.log($post.html());
        $post.find("img").attr("src", response["picture"]);
        $post.find(".post_username").text(response["firstName"] + " " + response["lastName"]);
        $post.find(".post_body").text(contents);
    });
}

render_post(test_email, "bing bong");
