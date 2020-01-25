import React, { useState, useEffect } from 'react';
import api from './services/api.js'

import './css/base.css'
import './App.css'
import './css/sidebar.css'
import './css/main.css'

function App() {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [github_username, setGithub_username] = useState('')
  const [stack, setStack] = useState('')
  const [devs, setDevs] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude)
        setLongitude(longitude)
      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 30000
      });
  }, [])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs();
  }, [])

  async function handleRegister(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username, stack,
      longitude, latitude
    })

    console.log(response.data)
    setGithub_username('')
    setStack('')
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Sign up</strong>
        <form onSubmit={handleRegister}>
          <div className="input-block">
            <label htmlFor="github_username">Github username</label>
            <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithub_username(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="stack">Stack</label>
            <input name="stack" id="stack" required value={stack} onChange={e => setStack(e.target.value)} />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>

          <button type="submit">Register</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-card">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.stack.join(', ')}</span>
                </div>
              </header>

              <p>
                {dev.bio}
              </p>
              <a href={`https://github.com/${dev.github_username}`}>Github profile</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
