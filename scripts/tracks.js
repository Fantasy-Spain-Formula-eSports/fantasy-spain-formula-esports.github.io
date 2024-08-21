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

    WriteTracks(race_info)
}
)
.catch(error => {
console.error('Error:', error);
}); 


function WriteTracks(race_info) {
    console.table(race_info)
    document.getElementById("tracks-div").innerHTML = ""
    race_info.forEach(element => {
        card = '<div class="cardInformation">'+
                    '<div class="cardBox" id="'+element.id_card+'">'+
                        '<div class="card" id="'+element.id_card+'">'+
                            '<div class="h4"></div>'+
                            '<div class="content">'+
                                '<div class="container">'+
                                    '<h4>'+element.track_name+'</h4>'+
                                    // Rectas
                                    '<div class="skill-box">'+
                                        '<span class="title">Rectas(%)</span>'+
                                        '<div class="skill-bar">'+
                                            '<span class="skill-per rectas '+element.id_card+'">'+
                                                '<span class="tooltip">'+element.straights+'</span>'+
                                            '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    //Curvas Lentas
                                    '<div class="skill-box">'+
                                        '<span class="title">Curvas Lentas</span>'+
                                        '<div class="skill-bar">'+
                                            '<span class="skill-per lentas '+element.id_card+'">'+
                                                '<span class="tooltip">'+element.slow_turns+'</span>'+
                                            '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    //Curvas Medias
                                    '<div class="skill-box">'+
                                        '<span class="title">Curvas Medias</span>'+
                                        '<div class="skill-bar">'+
                                            '<span class="skill-per medias '+element.id_card+'">'+
                                                '<span class="tooltip">'+element.medium_turns+'</span>'+
                                            '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    //Curvas Rápidas
                                    '<div class="skill-box">'+
                                        '<span class="title">Curvas Rápidas</span>'+
                                        '<div class="skill-bar">'+
                                            '<span class="skill-per rapidas '+element.id_card+'">'+
                                                '<span class="tooltip">'+element.fast_turns+'</span>'+
                                            '</span>'+
                                        '</div>'+
                                    '</div>'+
                                    //END
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="boxInformation">'+
                        '<h2 style=margin-left: 2rem;">'+element.track_name+'</h2>'+
                        '<p id="boxText '+element.id_card+'">'+element.boxText+'</p>'+
                    '</div>'
        card += '</div>'
        document.getElementById("tracks-div").innerHTML += card;
    });
}