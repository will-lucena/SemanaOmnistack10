import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }) {

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [github_username, setGithub_username] = useState('')
  const [stack, setStack] = useState('')

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

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github_username, stack,
      longitude, latitude
    })

    setGithub_username('')
    setStack('')
  }

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default DevForm;