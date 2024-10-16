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
//metodo para agregar y validar
app.post("/usuarios", (req, res)=>{
    /*validaciones de tarea para el lunes
    1.-La informacion debe estar completa, si una de ellas no llega enviar un error (400)
    if(!nombre || !apellido || !email){
    res.status(400).send({ error: "Todos los campos son requeridos" });
    return;
    }
    2.-El email debe ser unico (400) 
    if(usuarios.find((usuario) => usuario.email === email)){
    res.status(400).send({ error: "El email ya está en uso" });
    return;
    }
    */
    const {nombre, apellido, email} = req.body;
    if (!nombre || nombre.trim() === '') {
        return res.status(400).send({ error: "Nombre es un campo obligatorio" });
    }
    if (!apellido || apellido.trim() === '') {
        return res.status(400).send({ error: "Apellido es un campo obligatorio" });
    }
    if (!email || email.trim() === '') {
        return res.status(400).send({ error: "Email es un campo obligatorio" });
    }

    const emailExists = usuarios.some(usuario => usuario.email === email);
    if (emailExists) {
        return res.status(400).send({ error: "El email ya está en uso" });
    }

    usuarios.push({id: usuarios.length + 1, nombre, apellido, email});
    //console.log(req.body)
    res.status(201).send("El usuario se agregó correctamente");
    
})
//metodo para actualizar (sustitucion completa)
//en el put debes de decirle el parametro
app.put("/usuarios/:id", (req, res) =>{
    const {nombre, apellido, email} = req.body; 
    const id = +req.params.id;
    if(!nombre || !apellido || !email){
        res.status(400).send({ error: "Todos los campos son requeridos" });
        return;
        }
        if(isNaN(id)){
            res.status(400).send({error:"El id debe ser un numero"});
            return;
        };
       const usuario = usuarios.find((usuario)=>usuario.id === +id);
       if(!usuario){
        res.status(404).send({Error: `El usuario con id ${id} no existe`});
        return;
       }; 
       const emailExists = usuarios.some(usuario => usuario.email === email);
       if (emailExists) {
           return res.status(400).send({ error: "El email ya está en uso por lo tanto no se puede actualizar el usuario" });
       }   
    usuarios.forEach((usuario) => {
        if(usuario.id === +req.params.id){
            usuario.nombre = nombre;
            usuario.apellido = apellido; 
            usuario.email = email;
        }
    })
    res.status(200).send("El usuario se actualizó correctamente");
});
//TAREA DE VALIDACION: solamente me deje actualizar el correo siempre y cuando no exista en otro usuario
//solo modfica una parte de la informacion del usuario
app.patch("/usuarios/:id", (req, res) =>{

});
app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});