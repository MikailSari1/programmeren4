//
// Application configuration
//
const secretkey = process.env.SECRETKEY || 'ThisIsASecretKey'

const config = {
    secretkey: secretkey,

    dbHost: 'localhost',
    dbUser: 'app_user',
    dbDatabase: 'database_name'
}

export default config