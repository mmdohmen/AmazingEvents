// array de datos en el archivo data.js   ==>   data.events[]
const events = data.events
console.log(events)

// capturo la FECHA ACTUAL
const fecha = new Date
const hoy = fecha.getDate()
const mes = fecha.getMonth() + 1
console.log(mes, hoy)

// capturo al contenedor de EVENTOS del DOM
let eventosDOM = document.getElementById("eventos")

// recorro el ARRAY de datos
for (let evento of events) {

    let mesEvento = parseInt(evento.date[5] + evento.date[6])
    let diaEvento = parseInt(evento.date[8] + evento.date[9])
    

    if (mesEvento > mes || (mesEvento == mes && diaEvento > hoy)) {

        console.log(evento.date, mesEvento, diaEvento)

        // creo una CARD 
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        card.style.width = "18rem"

        // IMAGEN de la card
        let img = document.createElement("img")
        img.setAttribute("src", evento.image)
        img.setAttribute("class", "card-img-top")
        card.appendChild(img)

        // BODY de la CARD (contiene al TITULO, DESCRIPCION, PRECIO y BOTON)
        let cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        card.appendChild(cardBody)

        // TITULO de la card
        let h5 = document.createElement("h5")
        h5.setAttribute("class", "card-title")
        h5.innerHTML = evento.name
        cardBody.appendChild(h5)

        // DESCRIPCION de la card
        let p = document.createElement("p")
        p.setAttribute("class", "card-text")
        p.innerHTML = evento.description
        cardBody.appendChild(p)

        // FILA de la card
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        cardBody.appendChild(row)

        // COLUMNAS
        let colPrecio = document.createElement("div")
        colPrecio.setAttribute("class", "col")
        let price = document.createElement("p")
        price.innerHTML = "$ " + evento.price
        colPrecio.appendChild(price)
        row.appendChild(colPrecio)

        let colBoton = document.createElement("div")
        colBoton.setAttribute("class", "col")
        let boton = document.createElement("a")
        boton.setAttribute("href", "./evento.html")
        boton.setAttribute("class", "btn btn-light")
        boton.innerHTML = "see more"
        colBoton.appendChild(boton)
        row.appendChild(colBoton)

        // agrego la CARD al contenedor
        eventosDOM.appendChild(card)


    }
}



/*
let imagen = document.getElementById("imagen")
imagen.setAttribute("src",events[0].image)

let nombre = document.getElementById("nombre")
nombre.innerHTML = events[0].name

let descripcion = document.getElementById("descripcion")
descripcion.innerHTML = events[0].description

let precio = document.getElementById("precio")
precio.innerHTML = "$ " + events[0].price
*/
