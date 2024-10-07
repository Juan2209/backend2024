const express = require("express")

const app= express()
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
   const usuario = usuarios.find((usuario)=>usuario.id === +id);
    res.status(200).send(usuario);
});

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});