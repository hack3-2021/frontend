function render_post(profile_img, name, contents) {
    $('#stream').prepend(`<div class="post"><img class="${profile_img}" src="img_src"><b><p class="name">${name}</p></b><p class="body">${contents}</p></div>`);
}

function fetch_user(username) {
    console.log("");   
}
