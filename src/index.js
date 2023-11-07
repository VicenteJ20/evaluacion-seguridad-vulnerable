const express = require('express')
const { LoginController, AllData } = require('./controller/loginController')


const main = async () => {
  const app = express()
  app.use(express.json())

  app.use(express.static('src'))

  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './src/views' })
  })

  app.get('/api/get/alldata', AllData)

  app.post('/login', LoginController)

  const PORT = 3000

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

main()