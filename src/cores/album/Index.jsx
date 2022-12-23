import React from 'react'
import Navbar from '../../components/Navbar'
import PreAlbum from './PreAlbum'

function Index() {
  return (
    <div className='flex flex-col w-screen h-screen'>
        <Navbar />
        <PreAlbum />
    </div>
  )
}

export default Index