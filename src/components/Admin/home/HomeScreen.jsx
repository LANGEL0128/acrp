import React from 'react'
import { app } from '../../../config/app'

export const HomeScreen = () => {
  return (
    <div className="card animate__animated animate__fadeIn shadow-sm">
        <div className="card-header">
            <h2>{ app.name }</h2>
        </div>
        <div className="card-body">
            <blockquote className="blockquote mb-0">
                <p>Sea bienvenido al panel de administración de la Asociación Cubana de Reconocimiento de Patrones.</p>
            </blockquote>
        </div>
    </div>
  )
}
