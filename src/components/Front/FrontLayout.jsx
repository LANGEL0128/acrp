import React from 'react'
import { Outlet } from 'react-router-dom'
import { FrontHeader } from './tpl/FrontHeader'
import { FrontFooter } from './tpl/FrontFooter'

import './layout.css'

export const FrontLayout = () => {
  return (
    <>
      <FrontHeader />
      <Outlet />
      <FrontFooter />
    </>
  )
}
