let chartInstance = null

let nose_radius = Number(document.getElementById("nose_radius").value)

async function calculate(){

let diameter = Number(document.getElementById("diameter").value)
let rpm = Number(document.getElementById("rpm").value)
let feed = Number(document.getElementById("feed").value)
let length = Number(document.getElementById("length").value)
let doc = Number(document.getElementById("doc").value)

let url = `http://127.0.0.1:8001/calculate?diameter=${diameter}&rpm=${rpm}&feed=${feed}&length=${length}&doc=${doc}&nose_radius=${nose_radius}`

let response = await fetch(url,{method:"POST"})
let data = await response.json()

let feedRate = feed * rpm

let gcode = `G21
G90
M03 S${rpm}

G00 X${diameter}
G01 Z-${length} F${feedRate}

M05
M30`

document.getElementById("gcode").innerText = gcode

document.getElementById("cutting_speed").innerText =
"Cutting Speed: "+data.cutting_speed+" m/min"

document.getElementById("feed_rate").innerText =
"Feed Rate: "+data.feed_rate+" mm/min"

document.getElementById("machining_time").innerText =
"Machining Time: "+data.machining_time+" min"

document.getElementById("mrr").innerText =
"Material Removal Rate: "+data.mrr

document.getElementById("power").innerText =
"Power Required: "+data.power+" kW"

createChart(rpm)

}

const cncDatabase = {

steel:{speed:120,feed:0.2,doc:2},
aluminium:{speed:250,feed:0.3,doc:3},
castiron:{speed:90,feed:0.25,doc:2},
stainless:{speed:80,feed:0.15,doc:1.5}

}

document.getElementById("material").addEventListener("change",function(){

let material = this.value
let params = cncDatabase[material]

document.getElementById("feed").value = params.feed
document.getElementById("doc").value = params.doc

document.getElementById("recommended_speed").innerText =
"Recommended Cutting Speed: "+params.speed+" m/min"

})

function createChart(baseRPM){

let rpms=[]
let times=[]

for(let i=500;i<=3000;i+=250){

rpms.push(i)
times.push(baseRPM/i)

}

let ctx = document.getElementById("rpmChart")

if(chartInstance){
chartInstance.destroy()
}

chartInstance = new Chart(ctx,{

type:"line",

data:{
labels:rpms,
datasets:[{
label:"Machining Time vs RPM",
data:times,
borderColor:"blue",
fill:false
}]
},

options:{
responsive:true
}

})

}