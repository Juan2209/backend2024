const express = require("express")

const app= express()

app.get("/usuarios", (req, res)=>{
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
    res.status(404).send(usuarios);
});//GET OBTENER INFORMACION

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});