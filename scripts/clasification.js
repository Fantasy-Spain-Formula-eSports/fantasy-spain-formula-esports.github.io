
// Función para calcular las puntuaciones por carrera para cada piloto
function calcularPuntuacionesPorPiloto(data) {
    const puntuacionesPorPiloto = {};
    const puntuacionesPorPiloto_Equipo = {}
    data.forEach(driver => {
        const piloto = driver.driver_name;
        const puntuaciones = driver.score;
        const team = driver.team;
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
    document.querySelector('body').style="min-height: 125rem";
    if (document.getElementById('formula-uno').style.display == 'block') {
        document.getElementById('formula-uno').style.display = 'none';
        document.getElementById('formula-dos').style.display = 'none';
        document.getElementById('fia-points').style.display = 'none';
    }else{
        document.getElementById('formula-uno').style.display = 'block';
        document.getElementById('formula-dos').style.display = 'none';
        document.getElementById('fia-points').style.display = 'none';
    }

}

function show_formula_dos() {
    document.querySelector('body').style="min-height: 137rem";
    if (document.getElementById('formula-dos').style.display == 'block') {
        document.getElementById('formula-uno').style.display = 'none';
        document.getElementById('formula-dos').style.display = 'none';
        document.getElementById('fia-points').style.display = 'none';
    }else{
        document.getElementById('formula-uno').style.display = 'none';
        document.getElementById('formula-dos').style.display = 'block';
        document.getElementById('fia-points').style.display = 'none';
    }
}

function show_FIA_points() {
    if (document.getElementById('fia-points').style.display == 'block') {
        document.getElementById('formula-uno').style.display = 'none';
        document.getElementById('formula-dos').style.display = 'none';
        document.getElementById('fia-points').style.display = 'none';
    }else{
        document.getElementById('formula-uno').style.display = 'none';
        document.getElementById('formula-dos').style.display = 'none';
        document.getElementById('fia-points').style.display = 'block';
    }
}

function get_data() {
    get_formula_uno_data()
    get_formula_dos_data()
}

function get_color_team(team) {
    let color;
    switch (team) {
        case "Mercedes-AMG":
            color = "#565F64";
            break;
        case "Ferrari":
            color = "red";
            break;
        case "Red Bull Racing":
            color = "#121F45;color:white;";
            break;
        case "McLaren":
            color = "#ff9900";
            break;
        case "Aston Martin":
            color = "#037A68";
            break;
        case "Alpine":
            color = "#0044ff";
            break;
        case "Alfa Romeo":
            color = "#A42134";
            break;
        case "Williams Racing":
            color = "#00A0DE";
            break;
        case "AlphaTauri":
            color = "#20394C";
            break;
        case "Haas":
            color = "white; color:black";
            break;
        default:  // Por si acaso, que no pasará nunca
            color = "blue;";
            console.info("Por qué??")
    }
    return color;

}

function show_data_driver(json,category) {
    
    document.getElementById(category+"-drivers-table").innerHTML = ""
    for (let index = 0; index < json.length; index++) {

        document.getElementById(category+"-drivers-table").innerHTML += '<tr>'+
        '<td style="background-color:red;min-width:10rem;max-width:10rem;">'+json[index]["piloto"]+'</td>' +
        '<td>'+json[index]["puntuaciones"][0]+'</td>'+
        '<td>'+json[index]["puntuaciones"][1]+'</td>'+
        '<td>'+json[index]["puntuaciones"][2]+'</td>'+
        '<td>'+json[index]["puntuaciones"][3]+'</td>'+
        '<td>'+json[index]["puntuaciones"][4]+'</td>'+
        '<td>'+json[index]["puntuaciones"][5]+'</td>'+
        '<td>'+json[index]["puntuaciones"][6]+'</td>'+
        '<td>'+json[index]["puntuaciones"][7]+'</td>'+
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
        color_team = get_color_team(json[index]["equipo"])     
        document.getElementById(category+"-teams-table").innerHTML += '<tr>'+
        '<td style="background-color:'+color_team+';min-width:10rem;max-width:10rem;">'+json[index]["equipo"]+'</td>' +
        '<td>'+json[index]["puntuaciones"][0]+'</td>'+
        '<td>'+json[index]["puntuaciones"][1]+'</td>'+
        '<td>'+json[index]["puntuaciones"][2]+'</td>'+
        '<td>'+json[index]["puntuaciones"][3]+'</td>'+
        '<td>'+json[index]["puntuaciones"][4]+'</td>'+
        '<td>'+json[index]["puntuaciones"][5]+'</td>'+
        '<td>'+json[index]["puntuaciones"][6]+'</td>'+
        '<td>'+json[index]["puntuaciones"][7]+'</td>'+
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
