
fetch('../data/race_calendar.json')
.then(response => {
if (!response.ok) {
    throw new Error('Error al cargar el archivo JSON');
}
return response.json();
})
.then(data => {
    const fecha = new Date
    // Buscamos el primer menor, es la próxima carrera.
    var first_menu = false
    var race_info = {};
    data.forEach(element => {
        if(fecha < new Date(element.fecha) && first_menu == false){
            first_menu = true
            race_info = element
        }
    });

    if (!first_menu) {
        race_info.gp_name = "Fin de Temporada"
        race_info.track_name = ""
        race_info.img_country = "FIA"
        race_info.img_track = "end_season"
    }
    WriteInformation(race_info)
}
)
.catch(error => {
console.error('Error:', error);
}); 




// Dibujar en el HTML
function WriteInformation(race_info) {
    document.getElementById("header_index").style = "background-image: url('./attachments/next_races/"+race_info.img_track+"_background.jpg');"
    document.getElementById("gp_name").innerHTML = race_info.gp_name;
    document.getElementById("track_name").innerHTML = race_info.track_name
    document.getElementById("img_country").src = "./attachments/country/" + race_info.img_country + ".png"
}

