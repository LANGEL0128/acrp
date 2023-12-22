import React from 'react'
import { Outlet } from 'react-router-dom'

export const FrontLayout = () => {
  return (
    <>
        <div>FrontLayout</div>
        <Outlet />
    </>
  )
}
