'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// TODO: need to store the imageUrls
// TODO: need to get the imageUrls, method: GET
// TODO: need a function to delete an image by URL method: DELETE
// TODO: need certain components:

// components:
// show our gallery
// image needs a delete icon so the user can click that to trigger the DELETE function
// 

// create a type for your props
type ImageContextProps = {
    uploadImages: (images: File[]) => void

}

// create a context variable
const ImageContext = createContext<ImageContextProps | undefined>(undefined)

// create a context provider
export function ImageContextProvider(props: { children: ReactNode }) {
    
    async function uploadImages(images: File[]){
        console.log(images)

        const formData = new FormData()

        images.forEach(image=>formData.append("images", image))

        const response = await fetch("/api/images", {method: "POST", body: formData})

        const data = await response.json()

        console.log(data.imageUrls)
    }


    return (
        <ImageContext.Provider value={{ uploadImages }}>
            {props.children}
        </ImageContext.Provider>
    )
}

// create a function to use the context
export function useImageContext() {
    const context = useContext(ImageContext)
    if (!context) {
        throw new Error('useProfileContext must be used within a ProfileContextProvider')
    }
    return context
}