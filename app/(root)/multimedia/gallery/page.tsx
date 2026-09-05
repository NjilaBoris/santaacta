import PhotoGallery from '@/components/Gallery'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen pt-6">
      <h1 className="text-3xl font-bold text-center mt-14 md:mt-18 text-neutral-700"> Gallery</h1>
      <PhotoGallery/>
    </div>
  )
}

export default page
