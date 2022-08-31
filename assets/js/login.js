document.body.onload = function() {
    let alert = document.getElementById("loginAlert");
    alert.style.display = 'none';
}

function login(){
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    let auth = authenticationUser(user,pass)
    
    let token
    if(auth){
        getUser();
    }
    else{
        let alert = document.getElementById("loginAlert");
        alert.style.display = 'block';
    }
}

function authenticationUser(user,pass){
    if(pass == '11111') return true;
    else return false
}

async function getUser() {
    try {
        let url = API_URL+'/3/authentication/token/new?api_key='+API_KEY;
        console.log(url);
        const response = await axios.get(url);
        console.log(response);
        localStorage.setItem('tmbd_user_token', response.data.request_token);
        //localStorage.removeItem('tmbd_user_token');
        location.href = 'browse.html';
    } catch (error) {
        console.log("Entro a error");
    }
}


let userAlertHide = document.getElementById('user');
userAlertHide.addEventListener('click', (e) => {
    let alert = document.getElementById("loginAlert");
    alert.style.display = 'none';
})

let passAlertHide = document.getElementById('pass');
passAlertHide.addEventListener('click', (e) => {
    let alert = document.getElementById("loginAlert");
    alert.style.display = 'none';
})


  