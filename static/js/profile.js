const backend_base_url = "http://127.0.0.1:8000"

window.onload= () => {
    ProfilePage()
}

// 프로필 페이지
async function ProfilePage(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const username = document.getElementById("username")
    username.innerText = payload_parse.username

    const response = await fetch(`${backend_base_url}/user/profile/`, {
        method: 'GET',
        headers:{
            "Authorization": localStorage.getItem("access"),
        }
    })
    response_json = await response.json()
    console.log(response_json)
    const img = document.getElementById('container')
    console.log(img)

    response_json.forEach(element => {
        console.log(element)
        const image = ` <div class="item">
                            <img class="image" src="http://127.0.0.1:8000${element.image}">
                        </div>`
        img.insertAdjacentHTML("beforeend",image)
    })
}