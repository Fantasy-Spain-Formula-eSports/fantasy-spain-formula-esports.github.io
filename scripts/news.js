var new_array = []
function get_news_fetch(category_news_selected) {
    document.getElementById("news_card").innerHTML = ""
    totalNews = 0;
    new_array = []
    fetch('../data/news/news.json')
        .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
        })
        .then(noticiasJSON => {
        noticiasJSON.forEach((noticia,index) =>{
            if ((category_news_selected == "All") ||(category_news_selected == noticia.category)) {
                totalNews++
            }
        })
        document.getElementById("totalNews").innerHTML = totalNews;
        noticiasJSON.forEach((noticia, index) => {
            if ((category_news_selected == "All") ||(category_news_selected == noticia.category)) {
                console.info(totalNews)

                generate_new_html(noticia,index,totalNews)

            }
        });
        console.table(new_array)
        }
        )
        .catch(error => {
        console.error('Error:', error);
        }); 

}

// Función para convertir una fecha en formato dd/mm/yyyy a un objeto Date
function convertirFecha(fechaString) {
    var partes = fechaString.split('/');
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

function getDateArticle(fechaString) {
    // Define la fecha actual
    var fechaActual = new Date();

    // Define la fecha pasada en formato dd/mm/yyyy
    var fechaPasadaString = fechaString;

    // Convierte la fecha pasada a un objeto Date
    var fechaPasada = convertirFecha(fechaPasadaString);

    // Calcula la diferencia en milisegundos entre las dos fechas
    var diferencia = fechaActual - fechaPasada;

    // Convierte la diferencia de milisegundos a días
    var diasPasados = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let text;
    if (diasPasados == 0) {
        text = "Escrito hoy"
    } else {
        text = "Hace " + diasPasados + " dias."
    }
    return text
}


function generate_new_html(noticia,index,length) {

    document.getElementById("news_card").innerHTML +=
    '<div class="card" id="card_index_'+index+'">'+
        '<div href=".index.html" class="card-image"'+'style="background-image:url('+"'"+noticia.image+"'"+')"></div>'+
        '<div class="category '+noticia.category+'">'+noticia.category+'</div>'+
        '<div class="heading">'+noticia.title+'</div>'+
        '<div class="description">'+noticia.description+'</div>'+
        '<div class="author"> By <span class="name">'+noticia.author+' </span>'+getDateArticle(noticia.date)+'</div>'+
    '</div>';
    new_array.push(noticia)
    console.log(`Noticia ${index + 1}:`);
    console.log(`Título: ${noticia.title}`);
    console.log(`Descripción: ${noticia.description}`);
    console.log(`Categoría: ${noticia.category}`);
    console.log(`Fecha: ${getDateArticle(noticia.date)}`);
    console.log(`Autor: ${noticia.author}`);
    console.log(`Imagen: ${noticia.image}`);
    console.log(`Contenido: ${noticia.content}`);
    console.log("\n");
}

get_news_fetch("All")

