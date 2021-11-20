const getAutoById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/autos/' + id
    }).done(res => res);
};

const getIdAuto = async id => {
    document.getElementById("id2_delete").value = id;
    console.log(id2_delete);
    console.log(document.getElementById("id2_delete").value);
};

const getInfoAuto = async id => {
    let autos = await getautosById(id);
    var dateCreated = new Date(autos.autos[0].dateRegister).toLocaleString();

    if (autos.autos[0].dateUpdate == null) {
        var dateUpdate = "No hay fecha de actualización";
    } else {
        var dateUpdate = new Date(autos.autos[0].dateUpdate).toLocaleString();
    };

    document.getElementById('nombre1').value = autos.autos[0].nombre;
    document.getElementById('matricula').value = autos.autos[0].matricula;
    document.getElementById('verificacion').value = autos.autos[0].yearCheck;
    document.getElementById('fechaRegistro').value = dateRegister;
    document.getElementById('fechaActualizacion').value = dateUpdate;
    document.getElementById('estado').value = autos.autos[0].status ? "Activo" : "Inactivo";
    document.getElementById('marca').value = autos.autos[0].marca;
    console.log(autos);
};

const getInfoUpdateautos = async id => {
    let autos = await getautosById(id);

    var dateCreated = new Date(autos.autos[0].dateRegister).toISOString();
    if (autos.autos[0].fechaActualizacion == null) {
        var dateUpdated = "No hay fecha de actualización";
    } else {
        var dateUpdated = new Date(autos.autos[0].dateUpdate).toISOString();
    };
    document.getElementById('id2_update').value = id;
    document.getElementById('nombre1_update').value = autos.autos[0].nombre;
    document.getElementById('matricula_update').value = autos.autos[0].matricula;
    document.getElementById('verificacion_update').value = autos.autos[0].yearCheck;
    document.getElementById('fechaRegistro_update').value = dateRegister;
    document.getElementById('fechaActualizacion_update').value = dateUpdate;
    document.getElementById('marca_update').value = autos.autos[0].marca;

    console.log(autos);

};
const getautos = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/autos'
    }).done(res => {
        console.log(res.listAutos);

        let listAutos = res.listAutos;
        let table = $("#tabla2");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Nombre</th>" +
            "<th scope='col'>matrícula</th>" +
            "<th scope='col'>Verificación</th>" +
            "<th scope='col'>Fecha Registro</th>" +
            "<th scope='col'>Fecha Actualización</th>" +
            "<th scope='col'>Estado</th>" +
            "<th scope='col'>Marca</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listAutos.length; i++) {
            var dateRegister = new Date(listAutos[i].dateRegister).toLocaleString();

            if (listAutos[i].fechaActualizacion == null) {
                var dateUpdate = "No hay fecha de actualización";
            } else {
                var dateUpdate = new Date(listAutos[i].dateUpdate).toLocaleString();
            };
            table.append(
                "<tr>" +
                "<td>" + listAutos[i].id + "</td>" +
                "<td>" + listAutos[i].nombre + "</td>" +
                "<td>" + listAutos[i].matricula + "</td>" +
                "<td>" + listAutos[i].yearCheck + "</td>" +
                "<td>" + dateRegister + "</td>" +
                "<td>" + dateUpdate + "</td>" +
                "<td>" + listAutos[i].status + "</td>" +
                "<td>" + listAutos[i].marca + "</td>" +
                "<td>" + '<button onclick="getInfoautos(' + listAutos[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details2"> <i class="fa fa-align-left" aria-hidden="true"></i> Detalles</button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateautos(' + listAutos[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update2"><i class="fa fa-edit" aria-hidden="true"></i> Modificar</button> </td>' +
                "<td>" + '<button onclick="getIdautos(' + listAutos[i].id + ');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete2"><i class="fa fa-chevron-down" aria-hidden="true"></i> Eliminar</button> </td>' +
                "</tr>")
        }
    });
};



const registerautos = async () => {
    let nombre = document.getElementById('nombre1_register').value;
    let matricula = document.getElementById('matricula_register').value;
    let verificacion = document.getElementById('verificacion_register').value;
    var date = Date.now();
    let fechaRegistro = document.getElementById(date);
    let marca = document.getElementById('marca_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/autos/create',
        data: { nombre, matricula, yearCheck, dateRegister, marca }
    }).done(function (res) {
        console.log(res);
    });
};

const updateautos = async () => {

    let id = document.getElementById('id2_update').value;
    let nombre = document.getElementById('nombre1_update').value;
    let matricula = document.getElementById('matricula_update').value;
    let verificacion = document.getElementById('verificacion_update').value;
    var date = Date.now();
    let fechaActualizacion = document.getElementById(date);
    let marca = document.getElementById('marca_update').value;
    console.log(id);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/autos/update/' + id,
        data: { nombre, matricula, verificacion, fechaActualizacion, marca }
    }).done(function (res) {
        console.log(res);
    });
};

// const deleteautos = async () => {
//     let id = document.getElementById("id2_delete").value;
//     await $.ajax({
//         type: 'GET',
//         url: 'http://localhost:4000/autos/delete/' + id
//     }).done(res => {
//         console.log(res);
//     });
// };

const deleteautos = async () => {
    let id = document.getElementById("id2_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/autos/delete/' + id
    }).done(res => {
        console.log(res);
        //getoffice();
    });
};
