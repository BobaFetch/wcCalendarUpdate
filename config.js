require('dotenv').config()

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.HOST,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

module.exports = config