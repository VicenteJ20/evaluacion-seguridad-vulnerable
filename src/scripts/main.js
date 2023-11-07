const form = document.getElementById('login-form')
const message = document.getElementById('message')
const messageText = document.getElementById('messageText')
const authSpan = document.getElementById('authspan')
const tbody = document.getElementById('tbody')

const checkLogin = async (data) => {
  const { email, password } = data
  console.log(email, password)

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const { status } = res

    if (status === 200) {
      return { status: 200, message: 'Authorized' }
    } else {
      return { status: 401, message: 'Unauthorized' }
    }
  } catch (error) {
    console.log(error)
    return { status: 401, message: 'Unauthorized' }
  }
}

const getData = async (access) => {
  if (access) {
    try {
      const res = await fetch('/api/get/alldata')
      const { data } = await res.json()
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  } else {
    return []
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const response = await checkLogin({ email, password })

  if (response.status === 200) {
    message.classList.remove('hidden')
    message.classList.add('success')
    message.classList.remove('error')
    messageText.innerHTML = 'INICIO DE SESIÓN AUTORIZADO'
    authSpan.innerHTML = 'AUTORIZADO'

    const data = await getData(true)
    console.log(response)

    data.length > 0 && data.map((item) => (
      tbody.innerHTML += `
        <tr class='${item.email === email ? "bg-success" : ""}'>
          <td class='nowrap'>${item.rut}</td>
          <td>${item.nombre}</td>
          <td>${item.apellidoP}</td>
          <td>${item.apellidoM}</td>
          <td>${item.email}</td>
          <td>${item.movil}</td>
          <td>${item.password}</td>
        </tr>
      `
    ))

  }

  if (response.status === 401) {
    message.classList.remove('hidden')
    message.classList.add('error')
    messageText.innerHTML = 'INICIO DE SESIÓN NO AUTORIZADO'
    authSpan.innerHTML = 'NO AUTORIZADO'

    if (tbody.innerHTML !== '') {
      tbody.innerHTML = ''
    }
  }
})