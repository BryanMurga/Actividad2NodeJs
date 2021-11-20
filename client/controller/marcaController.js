const getMarcaById = async id =>{
    return await $.ajax({
        type: 'GET',
        url : 'http://localhost:4000/marca/' + id
    }).done(res => res);
};

const getId = async id => {
    document.getElementById("id_delete").value = id;
    console.log(id_delete);
    console.log(document.getElementById("id_delete").value);
};

const getInfo = async id =>{  
    let marca = await getMarcaById(id); 
   document.getElementById('nombre').value = marca.marca[0].nombre;
   console.log(marca);
};

const getInfoUpdate = async id =>{
    let marca = await getMarcaById(id);
    document.getElementById('id_update').value = id;
    document.getElementById('nombre_update').value = marca.marca[0].nombre;
};

const getMarca = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/marca'
    }).done(res => {
        console.log(res.listMarca); 

        let listMarca = res.listMarca;
        let table = $("#tabla");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>nombre</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listMarca.length; i++) {
            
            table.append(
                "<tr>" +
                "<td>" + listMarca[i].id + "</td>" +
                "<td>" + listMarca[i].nombre + "</td>" +
                "<td>"+ '<button onclick="getInfo('+ listMarca[i].id +');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details"><i class="fa fa-align-left" aria-hidden="true"></i> Detalles</button> </td>'+
                "<td>"+ '<button onclick="getInfoUpdate('+ listMarca[i].id +');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit" aria-hidden="true"></i> Modificar</button> </td>'+
                "<td>"+ '<button onclick="getId('+ listMarca[i].id +');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete"><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</button> </td>'+
                "</tr>")
        }
    });
};

const registerMarca = async() =>{
    let nombre = document.getElementById('nombre_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/marca/create' ,
        data: { nombre }
    }).done(function(res){
        console.log(res);
    });
};

const updateMarca = async () =>{
    let id = document.getElementById('id_update').value;
    let nombre = document.getElementById('nombre_update').value;
    console.log(id,nombre);

    $.ajax({
        type: 'POST', 
        url: 'http://localhost:4000/marca/update/' + id,
        data:{id, nombre }
    }).done(function(res) {
        console.log(res);
    });
};

const deleteMarca = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/marca/delete/' + id
    }).done(res => {
        console.log(res);
        //getmarca();
    });
};