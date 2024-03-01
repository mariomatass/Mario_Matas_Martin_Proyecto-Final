const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData(req) {
    const data = req.query
    const result = await db.query(`
        insert into coleccion (nombre,marca,tipo,precio)
        values ('${data.nombre}','${data.marca}','${data.tipo}','${data.precio}')
    `)
    return result.affectedRows
}

async function insertUser(req) {
    const data = req.query
    const result = await db.query(`
        insert into usuarios (nombre,login,password,rol)
        values ('${data.nombre}','${data.login}','${data.password}','${data.rol}')
    `)
    return result.affectedRows
}

async function getData(req, res) {
    const rows = await db.query('select * from coleccion')
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function getUser(req, res) {
    const rows = await db.query('select * from usuarios')
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(`delete from coleccion where id=${data.id}`)
    return result.affectedRows
}

module.exports = {
    getData, insertData, deleteData, insertUser, getUser
}