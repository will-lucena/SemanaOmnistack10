import React from 'react'

import './styles.css'

function DevCard({ dev }) {

  return (
    <li className="dev-card">
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
  )
}

export default DevCard;