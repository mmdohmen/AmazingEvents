// array de DATOS en el archivo data.js   ==>   data.events[]
const events = data.events
//console.log(events)

let homeEvents = events
console.log('homeEvents:', homeEvents)


// array de CATEGORIAS   =========================================================================================================================
let categories = []
let catChecked = []
let catCheckedEvents = []



// FUNCIONES   ==================================================================================================================================
function categorias(eventos) {
    eventos.forEach(element => {
        if (categories.some(category => category == element.category)) {
            //console.log("categoria existente")
        }
        else {
            categories.push(element.category)
        }
    });
    console.log('categorias:', categories)

    // capturo al contenedor de CATEGORIAS del DOM
    let categoriasDOM = document.getElementById("category")

    // recorro el array de categorias
    for (let category of categories) {

        // creo una CATEGORIA
        let categoria = document.createElement("div")
        categoria.setAttribute("class", "form-check")

        // INPUT de la categoria
        let input = document.createElement("input")
        input.setAttribute("class", "form-check-input")
        input.setAttribute("type", "checkbox")
        input.setAttribute("value", category)
        input.setAttribute("id", category)
        input.addEventListener('click', checked)
        categoria.appendChild(input)

        // LABEL de la categoria
        let label = document.createElement("label")
        label.setAttribute("class", "form-check-label")
        label.setAttribute("for", category)
        label.innerHTML = category
        categoria.appendChild(label)

        //console.log(categoria)

        // agrego la categoria al contenedor
        categoriasDOM.appendChild(categoria)

    }

}

function unchecked() {
     console.log(categorias)
}

function cards(eventos) {

    // capturo al contenedor de EVENTOS del DOM   ====================================================================================================
    let eventosDOM = document.getElementById("eventos")

    // recorro el ARRAY de datos
    for (let evento of eventos) {

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
        boton.setAttribute("href", `./evento.html?id=${evento._id}`)
        boton.setAttribute("class", "btn btn-light")
        boton.innerHTML = "see more"
        colBoton.appendChild(boton)
        row.appendChild(colBoton)

        // agrego la CARD al contenedor
        eventosDOM.appendChild(card)

    }

}

function borrarCards() {
    let main = document.getElementById("main")
    //console.log(main)
    let eventos = document.getElementById("eventos")
    //console.log(eventos)
    main.removeChild(eventos)
    let div = document.createElement("div")
    div.setAttribute("class", "eventos")
    div.setAttribute("id", "eventos")
    main.appendChild(div)
    //console.log(main)
}

function checked(e) {

    // borro las cards del DOM
    borrarCards()

    // categorias CHECKEADAS
    if (catChecked.length == 0) {
        //console.log('if linea 28')
        catCheckedEvents = []

    }

    //console.log(e.target.value)
    if (e.target.checked) {
        catChecked.push(e.target.value)
        //console.log('checked:', catChecked)
        for (let evento of homeEvents) {
            if (evento.category == e.target.value) {
                catCheckedEvents.push(evento)

            }
        }
    } else {
        //console.log('quitar', e.target.value)
        catChecked = catChecked.filter(elemento => elemento != e.target.value)
        catCheckedEvents = catCheckedEvents.filter(evento => evento.category != e.target.value)

        if (catChecked.length == 0) {
            //catCheckedEvents = homeEvents
            location.reload()
        }
        //console.log('checked:', catChecked)
    }
    console.log('catCheckedEvents:', catCheckedEvents)
    console.log('catChecked:', catChecked)


    // agrego las CARDS de las categorias checkeadas
    cards(catCheckedEvents)


}

function buscar(e) {
    e.preventDefault()                   // cancelo el evento (envio de datos del formulario)
    console.log("texto a buscar:", textoAbuscar.value)

    if (textoAbuscar.value == "") {
        location.reload()
        // borrarCards()
        // textoAbuscar.value = ""
        // cards(homeEvents)
    } else {
        let respuesta = 'no'
        let encontrados = []

        if (catCheckedEvents.length == 0) {
            evento2 = homeEvents
        } else {
            evento2 = catCheckedEvents
        }

        evento2.forEach(evento => {
            //homeEvents.forEach(evento => {
            let nombre = evento.name.split(" ")
            //console.log("nombre evento:", nombre)
            for (let i = 0; i < nombre.length; i++) {
                if (nombre[i].toLowerCase() == textoAbuscar.value.toLowerCase()) {
                    encontrados.push(evento)
                    console.log('categoria:', evento.category)

                    let categoriaElementoEncontrado = document.getElementById(evento.category)
                    // console.log(categoriaElementoEncontrado)
                    categoriaElementoEncontrado.setAttribute("checked", "true")
                    // console.log(categoriaElementoEncontrado.checked)

                    respuesta = "si"
                } 
            }
        })

        if (respuesta == 'no') {
            alert("NO tenemos ningun EVENTO con ese NOMBRE ...")
        } else {
            borrarCards()
            cards(encontrados)
            console.log(encontrados)
            document.getElementById("search").setAttribute("disabled", "true")
            document.getElementById("search").setAttribute("placeholder", "")
            document.getElementById("botonBuscar").setAttribute("type", "button")
            document.getElementById("botonBuscar").innerHTML = "return"
            document.getElementById("botonBuscar").setAttribute("onclick", "location.reload()")
        }

        textoAbuscar.value = ""

    }

}



// agrego las CATEGORIAS   ====================================================================================================================
categorias(homeEvents)


// BUSQUEDA de eventos   =====================================================================================================================
// capturo el BOTON de busqueda y el TEXTO a buscar
let botonBuscar = document.getElementById('botonBuscar')
let textoAbuscar = document.getElementById('search')
botonBuscar.addEventListener('click', buscar)



// agrego las CARDS   ========================================================================================================================
cards(homeEvents)
