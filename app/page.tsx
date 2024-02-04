import React from 'react'
import Home from './components/home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home page'
}
export default function page() {
  return (
    <div>
        <Home />
    </div>
  )
}
