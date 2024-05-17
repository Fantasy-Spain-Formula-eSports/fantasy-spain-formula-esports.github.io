let formula1Drivers = [];
let formula2Drivers = [];
let recentPenaltiesDescriptions = [];
const MAX_FIA_POINTS = 12;
const TIME_DURATION_PENALTIES = 10;

// Obtener la fecha actual
const currentDate = new Date();

// Función para calcular la diferencia en semanas entre dos fechas
const weeksDifference = (date1, date2) => {
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.abs((date1 - date2) / oneWeek);
};

fetch('../data/super_license_points.json') //Petición GET para cargar el archivo JSON
.then(function (response) {
  return response.json();
})
.then(function (data) {
    data.forEach(driver => {
        // Filtrar las penalizaciones que no tienen más de 10 semanas
        const recentPenalties = driver.penalties.filter(penalty => {
            if (penalty.penalty_date) {
                const penaltyDate = new Date(penalty.penalty_date);
                return weeksDifference(currentDate, penaltyDate) <= TIME_DURATION_PENALTIES;
            }
            return false;
        });
    
        // Sumar los penalty points de las penalizaciones recientes
        let totalPenaltyPoints = recentPenalties.reduce((sum, penalty) => sum + penalty.penalty_points, 0);
        let fia_points = MAX_FIA_POINTS - totalPenaltyPoints
        if (fia_points < 0) {
            fia_points = 0
        }else if (fia_points >MAX_FIA_POINTS) {
            fia_points = MAX_FIA_POINTS
        }
        // Agregar las descripciones de las penalizaciones recientes al array
        recentPenalties.forEach(penalty => {
            if (penalty.description) {
                recentPenaltiesDescriptions.push({
                    driver_name: driver.driver_name,
                    driver_category:driver.category,
                    description: penalty.description,
                    penalty_points: penalty.penalty_points,
                    penalty_date: penalty.penalty_date
    
                });
            }
        });
    
        // Crear un objeto con el nombre del piloto y la suma de penalty points
        let driverInfo = {
            driver_name: driver.driver_name,
            fia_points: fia_points
        };
    
        // Clasificar al piloto según su categoría
        if (driver.category === "Formula1") {
            formula1Drivers.push(driverInfo);
        } else if (driver.category === "Formula2") {
            formula2Drivers.push(driverInfo);
        }
    });
    document.getElementById("fia-points-f1-drivers-table-body1").innerHTML = ""
    document.getElementById("fia-points-f2-drivers-table-body1").innerHTML = ""
    formula1Drivers.forEach(driver =>{
        penalty_driver_styles = ""
        if (driver.fia_points == 0) {
            penalty_driver_styles = "background-color:red;color:white;";
        }else{
            penalty_driver_styles = "background-color: white;color:black;"
        }
        document.getElementById("fia-points-f1-drivers-table-body1").innerHTML += "<tr>"+
        '<td style="'+penalty_driver_styles+'">'+driver.driver_name+'</td>'+
        '<td style="'+penalty_driver_styles+'font-size:2rem;">'+driver.fia_points+'</td>'+
        '</tr>';
    });
    formula2Drivers.forEach(driver =>{
        penalty_driver_styles = ""
        if (driver.fia_points == 0) {
            penalty_driver_styles = "background-color:red;color:white;";
        }else{
            penalty_driver_styles = "background-color: white;color:black;"
        }
        document.getElementById("fia-points-f2-drivers-table-body1").innerHTML += "<tr>"+
        '<td style="'+penalty_driver_styles+'">'+driver.driver_name+'</td>'+
        '<td style="'+penalty_driver_styles+'font-size:2rem;">'+driver.fia_points+'</td>'+
        '</tr>';
    });
    if (recentPenaltiesDescriptions.length > 0) {
        document.getElementById("fia-points-statement-table").innerHTML = ""
        recentPenaltiesDescriptions.forEach(penalty =>{
            document.getElementById("fia-points-statement-table").innerHTML += "<tr>"+
            '<td style="background-color: white;color:black;">'+penalty.driver_name+'</td>'+
            '<td>'+penalty.driver_category+'</td>'+
            '<td style="background-color: white;color:black;">'+penalty.description+'</td>'+
            '<td>'+penalty.penalty_date+'</td>'+
            '<td style="background-color: red;color:white;">'+penalty.penalty_points+'</td>'+
            '</tr>';
        });

        document.getElementById("fia-statement").style.display = "block";
        
    }else{
        document.getElementById("fia-statement").style.display = "none";
    }

    // console.table("Formula1 Drivers:", formula1Drivers);
    // console.table("Formula2 Drivers:", formula2Drivers);
    // console.table("Recent Penalties Descriptions:", recentPenaltiesDescriptions);

})
.catch(function (error) {
  console.log(error);
});



