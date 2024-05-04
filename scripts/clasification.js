
// Función para calcular las puntuaciones por carrera para cada piloto
function calcularPuntuacionesPorPiloto(data) {
    const puntuacionesPorPiloto = {};

    data.forEach(driver => {
        const piloto = driver.driver_name;
        const puntuaciones = driver.score;

        if (puntuacionesPorPiloto[piloto]) {
            puntuacionesPorPiloto[piloto] = puntuacionesPorPiloto[piloto].map((val, index) => val + puntuaciones[index]);
        } else {
            puntuacionesPorPiloto[piloto] = puntuaciones;
        }
    });

    return puntuacionesPorPiloto;
}

// Función para calcular la puntuación total de un piloto o un equipo
function calcularPuntuacionTotal(puntuaciones) {
    return puntuaciones.reduce((total, score) => total + score, 0);
}

// Función para ordenar los pilotos por su puntuación total
function ordenarPilotosPorPuntuacion(puntuacionesPorPiloto) {
    return Object.entries(puntuacionesPorPiloto)
                .sort((a, b) => calcularPuntuacionTotal(b[1]) - calcularPuntuacionTotal(a[1]))
                .map(entry => ({ piloto: entry[0], puntuaciones: entry[1], puntuacionTotal: calcularPuntuacionTotal(entry[1]) }));
}

// Función para calcular las puntuaciones por carrera para cada equipo
function calcularPuntuacionesPorEquipo(data) {
    const puntuacionesPorEquipo = {};

    data.forEach(driver => {
        const equipo = driver.team;
        const puntuaciones = driver.score;

        if (puntuacionesPorEquipo[equipo]) {
            puntuacionesPorEquipo[equipo] = puntuacionesPorEquipo[equipo].map((val, index) => val + puntuaciones[index]);
        } else {
            puntuacionesPorEquipo[equipo] = puntuaciones;
        }
    });

    return puntuacionesPorEquipo;
}

// Función para ordenar los equipos por su puntuación total
function ordenarEquiposPorPuntuacion(puntuacionesPorEquipo) {
    return Object.entries(puntuacionesPorEquipo)
                 .sort((a, b) => calcularPuntuacionTotal(b[1]) - calcularPuntuacionTotal(a[1]))
                 .map(entry => ({ equipo: entry[0], puntuaciones: entry[1], puntuacionTotal: calcularPuntuacionTotal(entry[1]) }));
}



function show_formula_uno() {
    document.getElementById('formula-uno').style.display = 'block';
    document.getElementById('formula-dos').style.display = 'none';
}

function show_formula_dos() {
    document.getElementById('formula-uno').style.display = 'none';
    document.getElementById('formula-dos').style.display = 'block';
}

function get_data() {
    get_formula_uno_data()
    get_formula_dos_data()
}

function show_data_driver(json,category) {
    document.querySelector('body').style="min-height: 130rem";
    document.getElementById(category+"-drivers-table").innerHTML = ""
    for (let index = 0; index < json.length; index++) {        
        document.getElementById(category+"-drivers-table").innerHTML += '<tr>'+
        '<td style="background-color: red;">'+json[index]["piloto"]+'</td>' +
        '<td>'+json[index]["puntuaciones"][0]+'</td>'+
        '<td>'+json[index]["puntuaciones"][1]+'</td>'+
        '<td>'+json[index]["puntuaciones"][2]+'</td>'+
        '<td>'+json[index]["puntuaciones"][3]+'</td>'+
        '<td>'+json[index]["puntuaciones"][4]+'</td>'+
        '<td>'+json[index]["puntuaciones"][5]+'</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td style="background-color: red;">'+json[index]["puntuacionTotal"]+'</td>'+
      '</tr>'
    }    
}

function show_data_team(json,category) {
    document.getElementById(category+"-teams-table").innerHTML = ""
    for (let index = 0; index < json.length; index++) {        
        document.getElementById(category+"-teams-table").innerHTML += '<tr>'+
        '<td style="background-color: red;">'+json[index]["equipo"]+'</td>' +
        '<td>'+json[index]["puntuaciones"][0]+'</td>'+
        '<td>'+json[index]["puntuaciones"][1]+'</td>'+
        '<td>'+json[index]["puntuaciones"][2]+'</td>'+
        '<td>'+json[index]["puntuaciones"][3]+'</td>'+
        '<td>'+json[index]["puntuaciones"][4]+'</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td>-</td>'+
        '<td style="background-color: red;">'+json[index]["puntuacionTotal"]+'</td>'+
      '</tr>'
    }   
}

function manage_formula_driver_data(data,category) {
    // Calcular las puntuaciones por piloto
    const puntuacionesPorPiloto = calcularPuntuacionesPorPiloto(data);
    // Ordenar los pilotos por su puntuación total
    const pilotosOrdenados = ordenarPilotosPorPuntuacion(puntuacionesPorPiloto);
    show_data_driver(pilotosOrdenados,category)
}

function manage_formula_teams_data(data,category) {
    // Calcular las puntuaciones por equipo
    const puntuacionesPorEquipo = calcularPuntuacionesPorEquipo(data);

    // Ordenar los equipos por su puntuación total
    const equiposOrdenados = ordenarEquiposPorPuntuacion(puntuacionesPorEquipo);
    show_data_team(equiposOrdenados,category)
}

function get_formula_uno_data() {
    fetch('../data/race_info_f1.json') //Petición GET para cargar el archivo JSON
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
        manage_formula_driver_data(json,"f1");
        manage_formula_teams_data(json,"f1");
    })
    .catch(function (error) {
      console.log(error);
    });

}
function get_formula_dos_data() {
    fetch('../data/race_info_f2.json') //Petición GET para cargar el archivo JSON
    .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        manage_formula_driver_data(json,"f2");
        manage_formula_teams_data(json,"f2");
      })
      .catch(function (error) {
        console.log(error);
      });
}





