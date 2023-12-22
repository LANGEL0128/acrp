import React from 'react'
import { app } from '../../../config/app'

export const Footer = () => {
  return (
    <div className="col-12 py-4 bg-light border-top">
        <p className='text-center'>{ app.name } Todos los Derechos Reservados &copy; - {new Date().getFullYear()}</p>
    </div>
  )
}
