import React from 'react'
import Home from './components/homepage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Home"
}

export default function page() {
  return <Home />
}
