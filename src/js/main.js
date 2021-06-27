let test_email = "normal.human@gmail.com"

async function render_post(email, contents) {
    let $container = $('#stream');
    $container.prepend(`<div class="post"><img><b><p class="name"></p></b><p class="body"></p></div>`);
    let $post = $container.children("div.first");

    $.ajax({
        url: "/api/profile?email=" + email,
        type: 'GET',
        dataType: 'json',
        "async": true,
    }).done( function (response) {
        console.log(response);
        console.log($post);
        $post.children("img").attr("src", response["picture"]);
        $post.children("p.first").text(response["firstName"] + " " + response["lastName"]);
        $post.children("p").last().text(contents);
    });
}

render_post(test_email, "bing bong");
