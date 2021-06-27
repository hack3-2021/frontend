var $stream;

function render_post(post) {
    // Formats and appends posts to the stream div
    $stream.prepend(`
    <div class="spacer"></div>

    <div class="post">
      <img class="profile_picture">
      <b><p class="post_username"></p></b>
      <p class="post_body"></p>
      <hr>

      <button id="commentToggle" style ="width:175px;">Show Comments</button>

      <div id="commentFeed" class="comments" style="display:hidden;">

        <div id="addComment" class="comments">
          <input type="text" id="newComment"> <button id="postComment">Post Comment</button>
        </div>

      </div>
    </div>
    `);
    let $post = $stream.children(":first").next();
    $post.find("#postComment").on("click", () => {_send_comment(post["postID"])});
    $post.find("#commentToggle").on("click", () => {
        if ($post.find("#commentFeed").css("display") == "hidden") {$post.find("#commentFeed").css("display", "block")}
        else {$post.find("#commentFeed").css("display", "hidden")}
    });

    console.log($post.html());

    $post.find("img").attr("src", post["poster"]["picture"]);
    $post.find(".post_username").text( post["poster"]["firstName"] + " " + post["poster"]["lastName"]);
    $post.find(".post_body").text(post["msg"]);

    let $comments = $post.find("#commentFeed");
    post["comments"].forEach((comment, i)=>{
        $comments.append(`<div class="comment"><img class="profile_picture" src="${comment["poster"]["picture"]}"><b><p>${comment["poster"]["firstName"] + " " + comment["poster"]["lastName"]}</p></b> <p>${comment["msg"]}</p></div>`);
    });
}

function _callback_fetch(url, on_fetched, on_fail=(req)=>console.log("Callback fetch failed"), dataType = 'json') {
    // Fetches JSON from the specified URL, parses result to on_fetched when done
    $.ajax({
        url: url,
        type: 'GET',
        dataType: dataType,
        "async": true
    }).done(on_fetched).fail(on_fail);
}

function fetch_profile(email, on_fetched) {
    // Grabs the contents of a profile
    _callback_fetch("/api/profile?email=" + email, on_fetched);
}

function show_community() {
    $stream.empty();
    $stream.prepend(`<div class="spacer"></div><div class="post"><img class="profile_picture" src="icon.png"><b><p class="post_username">Dev Team</p></b><p class="post_body">Man it's lonely down here...</p><hr></div>`);

    _callback_fetch("/api/community?community=" + Cookies.get("community"), (response) => {
        response.forEach((post, i) => render_post(post))
    });
}

function show_login() {
    $stream.empty();
    $stream.prepend(`<div id="login">
    <img src="../img/logoLong.png" style=" filter: invert(100%)">

    <h1 style="text-align: center;">Login</h1>

    <div class="enterFields">
      <label for="firstName">Email</label>
      <input type="text" name="firstName">
      <br>
      <label for="lastName">Password</label>
      <input type="password" name="lastName">
    </div>
    <br>
    <div class="centered">
      <b><p id="signUpRedirect">Or Create and Account</p></b>
      <button id = "btnLogin" type="button" name="button">Login</button>
    </div>
  </div>`);

    $("#signUpRedirect").on("click", () => {
        show_signup();
    });

    $("#btnLogin").on("click", () => {
        Cookies.set("email", "alan.sandlar@gmail.com");
        Cookies.set("community", "Bankstown");
        show_community()
    });
}

function show_signup() {
    $stream.empty();
    $stream.prepend(`<div id="signUp"><h1 style="text-align: center;">Sign Up</h1><div class="enterFields"><label for="firstName">First Name</label><input type="text" name="firstName"><br><label for="lastName">Last Name</label><input type="text" name="lastName"><br><label for="email">Email</label><input type="email" name="email"><br><label for="bio">Biography</label><input type="text" name="bio"><br><label for="profileURL">Profile Picture URL</label><input type="url" name="profileURL"><br><label for="phoneNum">Phone Number</label><input type="text" name="phoneNum"><br><label for="suburb">Suburb</label><input type="text" name="suburb"><br><label for="vaccinated">Covid-19 Vaccinated</label><select name="vaccinated"><option value="0" selected>Partially or Unvaccinated</option><option value="1">Vaccinated</option></select></div><br><div class="centered"><button id = "btnSignUp" type="button" name="button">Sign up</button></div></div>`);

    $("#btnSignUp").on("click", create_user);
}

function show_about() {
    $stream.empty();
}

function create_user() {
    let first_name = $("input[name='firstName']").val();
    let last_name = $("input[name='lastName']").val();
    let email = $("input[name='email']").val();
    let picture_url = $("input[name='profileURL']").val();
    let bio = $("input[name='bio']").val();
    let phone_number = $("input[name='phoneNum']").val();
    let vaccinated = 0;
    console.log(vaccinated);
    let community = $("input[name='suburb']").val();
    _callback_fetch("/api/profile?email=" + email, (response) => {
        alert("Email already exists");
    }, (jqXHR, textStatus, errorThrown) => {
        if (errorThrown=="Not Found") { // User doesn't exist bbgurl
            _callback_fetch("/api/create_user?" + `email=${email}&firstName=${first_name}&lastName=${last_name}&pictureLink=${picture_url}&bio=${bio}&phoneNumber=${phone_number}&vaccinated=${vaccinated}&community=${community}`, (resp) => {
                console.log(resp);
            }, (x,y, errorThrown) => {
                alert("ERROR: Our server didn't like some of your inputs, who knows why. Our Back-end Dev refuses to implement meaninful errors. Try hitting send again?");
                console.log("Error while creating user: ");
                console.log(errorThrown);
                console.log("With URL string: ");
                console.log("/api/create_user?" + `email=${email}&firstName=${first_name}&lastName=${last_name}&pictureLink=${picture_url}&bio=${bio}&phoneNumber=${phone_number}&vaccinated=${vaccinated}&community=${community}`);
            }, "html")
        }
    });
}


function _send_post(msg) {
    // Sends a post to a community
    _callback_fetch("/api/post?community=" + Cookies.get("community") + "&email=" + Cookies.get("email") + "&msg=" + msg, () => {});
}

function _send_comment(postID, msg) {
    // Sends a comment to a post
    _callback_fetch("/api/comment?postID=" + postID + "&email=" + Cookies.get("email") + "&msg=" + msg, () => {});
}


document.addEventListener("DOMContentLoaded", function(){

    _callback_fetch("/api/ping", ()=>{
        $stream = $("#stream");
        if (window.location.pathname !== "html/about.html") {
            console.log(Cookies.get("email"));
            if (Cookies.get("email") == undefined || Cookies.get("community") == undefined){
                show_login();
            } else {
                show_community();
            }
            
        }
    });
   
});

