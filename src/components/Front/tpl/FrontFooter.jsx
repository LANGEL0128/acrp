import React from 'react'
import { app } from '../../../config/app'

export const FrontFooter = () => {
  return (
    <div className="col-12 py-4 bg-dark border-top">
        <p className='text-center text-white'>{ app.name } - Todos los Derechos Reservados &copy; - {new Date().getFullYear()}</p>
    </div>
  )
}
