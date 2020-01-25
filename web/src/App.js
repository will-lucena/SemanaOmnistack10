import React, { useState, useEffect } from 'react';
import api from './services/api.js'
import DevCard from './components/DevCard'
import DevForm from './components/DevForm'


import './css/base.css'
import './css/app.css'
import './css/sidebar.css'
import './css/main.css'

function App() {
  const [devs, setDevs] = useState([])
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs();
  }, [])

  async function handleRegister(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Sign up</strong>
        <DevForm onSubmit={handleRegister}></DevForm>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevCard key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
