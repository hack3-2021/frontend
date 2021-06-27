let test_email = "normal.human@gmail.com"

async function render_post(email, contents) {

    let $container = $('#stream');
    $container.prepend(`<div class="post"><img><b><p class="name"></p></b><p class="body"></p></div>`);
    
    let promise = new Promise( (resolve, reject) => { resolve(fetch_user(email)) } );
    let result = await promise;

    console.log(result)
    //$container.children("img, p").click();
}

function fetch_user(email) {
    let user_data = {};
    $.ajax({
        url: "/api/profile?email=" + email,
        type: 'GET',
        dataType: 'json',
        "async": true,
    }).done( function (response) {
        console.log(response)
        user_data = response
    })
    return user_data;
}

render_post(test_email, "bing bong")