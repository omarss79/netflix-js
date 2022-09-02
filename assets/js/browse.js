document.body.onload = function() {
    let token = localStorage.getItem('tmbd_user_token');
    if(token == "" || token == undefined) location.href = 'login.html';
}
