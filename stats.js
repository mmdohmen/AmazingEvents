// array de datos en el archivo data.js   ==>   data.events[]
const events = data.events
console.log("events:", events)

// agrego la clave "attendance"
events.forEach(element => {
    if (element.assistance) {
        element.attendance = element.assistance / element.capacity
    } else {
        element.attendance = element.estimate / element.capacity
    }

})
console.log("events modificado:", events)

// ordeno segun 'attendance'
events.sort((a, b) => {
    if (a.attendance < b.attendance) { return -1 }
    if (a.attendance > b.attendance) { return 1 }
    return 0
})
console.log("events ordenado:", events)

// capturo la FECHA ACTUAL 
const fecha = data.currentDate
const anio = fecha[2] + fecha[3]
const mes = fecha[5] + fecha[6]
const dia = fecha[8] + fecha[9]
console.log('año:', anio, 'mes:', mes, '- dia:', dia)

// creo ARRAYs con los DATOS de los EVENTOS FUTUROS y PASADOS
const upcomingEvents = []
const pastEvents = []
for (let evento of events) {

    let anioEvento = parseInt(evento.date[2] + evento.date[3])
    let mesEvento = parseInt(evento.date[5] + evento.date[6])
    let diaEvento = parseInt(evento.date[8] + evento.date[9])

    if (anioEvento > anio) {
        upcomingEvents.push(evento)
    } else if (anioEvento == anio) {
        if (mesEvento > mes || (mesEvento == mes && diaEvento > dia)) {
            upcomingEvents.push(evento)
        } else {
            pastEvents.push(evento)
        }
    } else {
        pastEvents.push(evento)
    }

}
console.log("upcomingEvents:", upcomingEvents);
console.log("pastEvents:", pastEvents)



// capturo ELEMENTOS del DOM   ==============================================================================================================
let eventStats = document.getElementById("eventStats")
let tablaUpcomingStats = document.getElementById("tablaUpcomingStats")
let tablaPastStats = document.getElementById("tablaPastStats")



// llamado a funciones   ===================================================================================================================
eventStatistics(pastEvents)

let filasUpcoming = categoriaStatistics(upcomingEvents)
filasUpcoming.forEach(fila => {
    let tr = document.createElement('tr')
    tr.innerHTML = `<td>${fila.cat}</td>
                    <td>$ ${fila.rev}</td>
                    <td>${fila.att} %</td>`
    tablaUpcomingStats.appendChild(tr)
})

let filasPast = categoriaStatistics(pastEvents)
filasPast.forEach(fila => {
    let tr = document.createElement('tr')
    tr.innerHTML = `<td>${fila.cat}</td>
                    <td>$ ${fila.rev}</td>
                    <td>${fila.att} %</td>`
    tablaPastStats.appendChild(tr)
})



// FUNCIONES   =============================================================================================================================
function eventStatistics(arrayEventos) {
    let lowest = arrayEventos[0]
    console.log('lowest:', lowest.name, '-', lowest.attendance * 100)

    let highest = lowest
    let larger = lowest
    arrayEventos.forEach(element => {
        if (element.assistance) {
            if (element.attendance > highest.attendance) { highest = element }
        }  
        if (element.capacity > larger.capacity) { larger = element }
    })
    console.log('highest:', highest.name, '-', highest.attendance * 100)
    console.log('larger:', larger.name, '-', larger.capacity)

    eventStats.innerHTML = `<td>${highest.name} - ${highest.attendance * 100} %</td>
                           <td>${lowest.name} - ${lowest.attendance * 100} %</td>
                           <td>${larger.name} - ${larger.capacity}</td>`
}

function categoriaStatistics(arrayEventos) {

    // declaro un array que guardara los datos buscados
    let catStats = []

    // busco las CATEGORIAS existentes
    let arrayCategorias = []
    arrayEventos.forEach(element => {
        arrayCategorias.push(element.category)
    })
    console.log("categorias:", arrayCategorias)
    // elimino los elementos duplicados usando una coleccion/objeto SET
    const categoriaSET = new Set(arrayCategorias)
    console.log("categoriaSET:", categoriaSET)

    // calculo las ESTADISTICAS p/ c/ categoria
    categoriaSET.forEach(categoria => {

        let revenue = 0
        let attendance = 0, cantidad = 0
        arrayEventos.forEach(evento => {
            if (evento.category == categoria) {
                // revenue
                if (evento.assistance) {
                    revenue += evento.price * evento.assistance
                } else {
                    revenue += evento.price * evento.estimate
                }
                // attendance
                attendance += evento.attendance
                cantidad += 1
            }
        })
        console.log(categoria, '- $', revenue, '-', (attendance / cantidad * 100).toFixed(2), '%', cantidad)

        // guardo los datos en el array
        catStats.push( {cat:categoria, rev:revenue, att:(attendance / cantidad * 100).toFixed(2)})
                               
    })

    console.log(catStats)

    return catStats

}