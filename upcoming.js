// array de datos en el archivo data.js   ==>   data.events[]
const events = data.events

// capturo la FECHA de REFERENCIA   ===========================================================================================================
const fecha = data.currentDate
const anio = fecha[2] + fecha[3]
const mes = fecha[5] + fecha[6]
const dia = fecha[8] + fecha[9]
console.log('año:', anio, 'mes:', mes, '- dia:', dia)

// creo un ARRAY con los DATOS de los EVENTOS FUTUROS
const upcomingEvents = []

for (let evento of events) {

    let anioEvento = parseInt(evento.date[2] + evento.date[3])
    let mesEvento = parseInt(evento.date[5] + evento.date[6])
    let diaEvento = parseInt(evento.date[8] + evento.date[9])

    if (anioEvento > anio) {
        upcomingEvents.push(evento) 
    } else if (anioEvento == anio) {   
        if (mesEvento > mes || (mesEvento == mes && diaEvento > dia)) {
            upcomingEvents.push(evento)
        }
    }
    
}

console.log("upcomingEvents:", upcomingEvents);

// capturo al contenedores/elementos del DOM
const eventosDOM = document.getElementById("eventos")
const categoriasDOM = document.getElementById("category")
const inputDOM = document.getElementById("search")
const botonDOM = document.getElementById("botonBuscar")


// EVENTOS   ===================================================================================================================================
// BUSCAR por TEXTO
// botonDOM.addEventListener("click", (e) => {
//     e.preventDefault()
//     let arrayFiltrado = buscarTexto(upcomingEvents, inputDOM.value)
//     cards(arrayFiltrado)
// })
inputDOM.addEventListener("input", () => {
    // let arrayFiltrado = buscarTexto(upcomingEvents, inputDOM.value)
    // cards(arrayFiltrado)
    buscar()
})

// BUSCAR por CATEGORIA
categoriasDOM.addEventListener('change', () => {
    // let arrayFiltrado = buscarCategoriasCheckeadas(upcomingEvents)
    // cards(arrayFiltrado)
    buscar()

})



// llamado a funciones   ======================================================================================================================
cards(upcomingEvents)
categorias(upcomingEvents)




// FUNCIONES   ================================================================================================================================
function cards(arrayDatos) {
    if (arrayDatos.length == 0) {
        eventosDOM.innerHTML = ""
        Swal.fire('there are NO EVENTS with the text entered ...').then(resultado => {
            if (resultado.value) { window.location.reload() }
        })
    }
    let cards = ""
    arrayDatos.forEach(element => {
        cards += `
        <div class="card" style="width: 18rem;">
            <img src="${element.image}" class="card-img-top" alt="..." id="imagen">
            <div class="card-body">
                <h5 class="card-title" id="nombre">${element.name}</h5>
                <p class="card-text" id="descripcion">${element.description}</p>
                <div class="row">
                    <div class="col">
                        <p id="precio">$ ${element.price}</p>
                    </div>
                    <div class="col"><a href="./evento.html?id=${element._id}" class="btn btn-light">see more</a></div>
                </div>
            </div>
        </div>`
    });
    eventosDOM.innerHTML = cards
}

function categorias(arrayDatos) {
    let arrayCategorias = []
    arrayDatos.forEach(element => {
        arrayCategorias.push(element.category)
    })
    console.log("categorias:", arrayCategorias)
    // elimino los elementos duplicados usando una coleccion/objeto SET
    const categoriaSET = new Set(arrayCategorias)
    console.log("categoriaSET:", categoriaSET)
    // agrego las categorias al DOM
    categoriaSET.forEach(element => {
        categoriasDOM.innerHTML += `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${element}" id="${element}">
            <label class="form-check-label" for="${element}">${element}</label>
        </div>`
    })
}

function buscarTexto(arrayDatos, texto) {
    let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function buscarCategoriasCheckeadas(arrayDatos) {
    // CAPTURO todos los CHECKBOX en una NodeList() o coleccion de NODOS (objetos)
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    //console.log("checkboxes:", checkboxes)

    // TRANSFORMO la NodeList() en un ARRAY
    let arrayCheckboxes = Array.from(checkboxes)
    //console.log("array de checkboxes:", arrayCheckboxes)

    // SEPARO los CHECKBOX q estan CHECKED
    let checkboxesCheckeados = arrayCheckboxes.filter(elemento => elemento.checked)
    console.log("checkboxes Checkeados:", checkboxesCheckeados)

    // si NO HAY elementos CHECKED
    if (checkboxesCheckeados.length == 0) {
        return arrayDatos
    }

    // armo un ARRAY con el NOMBRE/value de los CHECKBOX/CATEGORIAS q estan CHECKED
    let catCheckeadas = checkboxesCheckeados.map(elemento => elemento.value)
    console.log("categorias Checkeadas:", catCheckeadas)

    // armo el ARRAY de DATOS que tienen las CATEGORIAS CHECKEaDas
    let arrayFiltrado = arrayDatos.filter(elemento => catCheckeadas.includes(elemento.category))
    console.log("arrayFiltrado:", arrayFiltrado)

    return arrayFiltrado

}

function buscar() {
    let arrayFiltrado1 = buscarTexto(upcomingEvents, inputDOM.value)
    let arrayFiltrado2 = buscarCategoriasCheckeadas(arrayFiltrado1)
    cards(arrayFiltrado2)
}