const {request, response} = require ('express');
const pool = require('../../db/connection');
const { usersQueries } = require('../models/users');

//const users = [
//    {id: 1, name: 'Jhon Doe'},
//    {id: 2, name: 'Jane Doe'},
//    {id: 3, name: 'Bob Smith'},
//];

const getAllUsers = async (req = request, res= response) => {
    let conn;
    try{
        conn = await pool.getConnection();
        const users = await conn.query(usersQueries.getAll);

        res.send(users);
    }catch (error){
        res.status(500).send(error);
        return;
    }finally{
        if (conn) conn.end();
    }

}

const getUserById = async (req = request, res= response) =>{
    const {id} = req.params;
    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
    }
    let conn;
    try{
        conn = await pool.getConnection();
        const user = conn.query(usersQueries.getById, [+id]);
        
        if(!user){
        res.status(404).send('User not found')
        return;
    }
    res.send(user);
    }catch (error){
        res.status(500).send(error);
    }finally{
        if(conn) conn.end();
    }

    //const user = users.find(user => user.id === +id);

    if(!user){
        res.status(404).send('User not found')
        return;
    }
    
}
//agregar un usuario
const create = (req = request, res = response) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).send('Name is required');
        return;
    }

    //const user = user.find(user => user.name === name);

    //if(user){
    //    res.status(409).send('User already exits');
    //}

    const newUser = {
        id: users.length + 1,
        name
    };

    users.push(newUser);
    res.status(201).send('User created successfully');
}

const update = (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(id)) {
        res.status(400).send('ID must be a number');
        return;
    }

    if (!name || name.trim() === '') {
        res.status(400).send('Name is required');
        return;
    }

    const userIndex = users.findIndex(user => user.id === +id);

    if (userIndex === -1) {
        res.status(404).send(`User with id ${id} not found`);
        return;
    }

    users[userIndex] = {
        ...users[userIndex],
        name
    };

    res.status(200).send('User updated successfully');
}

const remove = (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send('ID must be a number');
        return;
    }

    const userIndex = users.findIndex(user => user.id === +id);

    if (userIndex === -1) {
        res.status(404).send(`User with id ${id} not found`);
        return;
    }

    users.splice(userIndex, 1);
    res.status(200).send('User deleted successfully');
}

module.exports = { getAllUsers, getUserById, create, update, remove };
//tarea: agregar los endpoint de agregar, editar y eliminar un usuario
//module.exports = {getAll, getById}