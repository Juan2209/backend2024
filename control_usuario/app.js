const express = require("express")

const app= express()
app.use(express.json());
const usuarios = [
    {
    id: 1,
    nombre: "Juan David",
    apellido: "Teodoro Pavon",
    email: "teodoropavonjuan@gmail.com",
    },
    {
    id: 2,
    nombre: "Elizabeth",
    apellido: "Pavon Sanchez",
    email: "elizabeth@gmail.com",
    },
   

]


app.get("/usuarios", (req, res)=>{
    res.status(404).send({usuarios});
});//GET OBTENER INFORMACION

//app.get("/usuarios/1", (req, res)=>{
//   res.status(200).send(usuarios[0]);
//})

//app.get("/usuarios/:id", (req, res)=>{
//    const {id} = req.params;
//   const usuario = usuarios.find((usuario)=>usuario.id == id);
//    res.status(200).send(usuario);
//});
app.get("/usuarios/:id", (req, res)=>{
    const {id} = req.params;
    //console.log(isNaN (id));
    //console.log(typeof +id);
    if(isNaN(id)){
        res.status(400).send({error:"El id debe ser un numero"});
        return;
    };
   const usuario = usuarios.find((usuario)=>usuario.id === +id);
   if(usuario === undefined){
    //res.status(404).send({Error: "usuario no encontrado"});
    res.status(404).send({Error: `El usuario con id ${id} no existe`});
    return;
   } 
   res.status(200).send(usuario);
});
app.post("/usuarios", (req, res)=>{
    /*validaciones de tarea
    1.-La informacion debe estar completa, si una de ellas no llega enviar un error (400)
    2.-El email debe ser unico (400) */
    const {nombre, apellido, email} = req.body;
    usuarios.push({id: usuarios.length + 1, nombre, apellido, email});
    //console.log(req.body)
    res.status(201).send("El usuario se agregó correctamente");
    
})


app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});