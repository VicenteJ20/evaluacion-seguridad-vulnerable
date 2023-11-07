const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: '52.207.114.200',
  user: 'vicente86',
  password: 'vicente86',
  database: 'vicente86',
});



const LoginController = async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection()
    const { email, password } = req.body
    console.log(email, password)

    const response = await connection.query(`SELECT * FROM jorquera86 WHERE email = '${email}' AND password = '${password}'`)
    console.log(response)
    if (response.length === 0) {
      res.status(401).json({ message: 'Unauthorized' })
    } else {
      res.status(200).json({ message: 'Authorized' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    if (connection) connection.release()
  }
}

const AllData = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection()
    const response = await connection.query("SELECT * FROM jorquera86")
    return res.status(200).json({data: response})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    if (connection) connection.release()
  }
}

module.exports = { LoginController, AllData }