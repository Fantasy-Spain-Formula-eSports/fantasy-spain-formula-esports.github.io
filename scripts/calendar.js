// Leer el JSON
fetch('../data/race_calendar.json')
.then(response => {
if (!response.ok) {
    throw new Error('Error al cargar el archivo JSON');
}
return response.json();
})
.then(data => {
    var race_info = [];
    data.forEach(element => {
        if(element.fecha != ""){
            console.info(element.gp_name)
            race_info.push(element)
        }
    });

    WriteCards(race_info)
}
)
.catch(error => {
console.error('Error:', error);
}); 


function WriteCards(race_info) {
    console.table(race_info)
    document.getElementById("main").innerHTML = ""
    race_info.forEach(element => {
        card = '<div class="cardBox">'
        card += '<div class="card" id="'+element.id_card +'">'
        card += '<div class="h4">'+element.calendar_date+'</div>'
            card += '<div class="content">'+
                        '<div class="h3">'+element.gp_name+"</div>"+
                        "<p>"+element.track_name+"</p>"
            card += "</div>"
        card += '</div>'
        card += '</div>'
        document.getElementById("main").innerHTML += card;
    });
}