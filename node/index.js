const express = require('express')
const mysql = require('mysql')
const faker = require('faker')
const app = express()
const port = 3000
const mysqlConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const connection = mysql.createConnection(mysqlConfig)

function printNames(names) {
    let listOfNames = ``
    for(let name of names) {
        listOfNames = listOfNames + `<li>${name}</li>`
    }
    return listOfNames
}

app.get('/', (req, res) => {
    connection.query(`INSERT INTO people (name) VALUES('${faker.name.firstName()}');`)
    connection.query(`Select * from people`, (err, results) => {
        if(err) {
            console.log(err)
        }
        const names = results.map(result => result.name)
        res.send(`<h1>Full Cycle Rocks!</h1>
            <ul>
            ${printNames(names)}
            </ul>
        `)
        
    })
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})