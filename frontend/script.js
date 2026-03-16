async function calculate(){

let speed = document.getElementById("speed").value
let feed = document.getElementById("feed").value
let length = document.getElementById("length").value

if(speed <= 0 || feed <= 0 || length <= 0){

document.getElementById("result").innerText =
"Please enter valid positive numbers."

return
}

let url = `http://127.0.0.1:8001/calculate?speed=${speed}&feed=${feed}&length=${length}`

let response = await fetch(url,{method:"POST"})

let data = await response.json()

if(data.error){

document.getElementById("result").innerText = data.error

}else{

document.getElementById("result").innerText =
"Machining Time: " + data.machining_time

}

}