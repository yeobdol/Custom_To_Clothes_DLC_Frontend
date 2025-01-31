// html js
// javascripts interlock
const backend_base_url = "http://127.0.0.1:8000"
//Signup
async function handleSignup(){
	const username = document.getElementById("sign-username").value
	const email = document.getElementById("sign-email").value
	const password = document.getElementById("sign-pass").value
	const password2 = document.getElementById("sign-confirm").value

	const response = await fetch(`${backend_base_url}/user/signup/`, {
		headers: {
			'Content-Type' : 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({
			"username":username,
			"password":password,
			"email":email
		})
	})
	console.log(response_json = await response.json())
	location.href = "signup.html";
}
//Signin
async function handleSignin(){
	const email = document.getElementById("log-email").value
	const password = document.getElementById("log-pass").value

	const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
	
	const response_json = await response.json()

	console.log(response_json)

	localStorage.setItem("access", "Bearer "+response_json.access);
	localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    location.href = "main.html";
}

//로그아웃

async function handleLogout(){
	localStorage.removeItem("access")
	localStorage.removeItem("refresh")
	localStorage.removeItem("payload")
	alert("로그아웃되었습니다.")
	location.herf = "signup.html"
}


