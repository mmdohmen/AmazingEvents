// array de datos en el archivo data.js   ==>   data.events[]
const eventos = data.events
console.log(eventos)

// capturo el id de la URL
const url = window.location.search
console.log("url:" , url)
const params = new URLSearchParams(url)
console.log("params:", params)
const id = params.get("id")
console.log("id:", id)

const evento = eventos.find(elemento => elemento._id == id)
console.log("evento:", evento)

// cargo los DATOS del EVENTO
document.getElementById("evento-img").setAttribute("src",`${evento.image}`)
document.getElementById("evento-name").innerText = evento.name
document.getElementById("evento-description").innerText = evento.description
document.getElementById("evento-date").innerHTML = "date: <span style='color:red'><b>" + evento.date + "</b></span>"
document.getElementById("evento-place").innerText = "place: " + evento.place
document.getElementById("evento-capacity").innerText = "capacity: " + evento.capacity
document.getElementById("evento-assistance").innerText = "assistance: " + evento.assistance
document.getElementById("evento-price").innerHTML = "price: <b>$" + evento.price + "</b>"
document.getElementById("evento-category").innerText = "category: " + evento.category