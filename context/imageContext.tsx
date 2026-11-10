'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// TODO: need to store the imageUrls
// TODO: need to get the imageUrls, method: GET
// TODO: need a function to delete an image by URL method: DELETE
// TODO: need certain components:

// components:
// show our gallery
// image needs a delete icon so the user can click that to trigger the DELETE function

// create a type for your props
type ImageContextProps = {
    uploadImages: (images: File[]) => void
    imageUrls: string[]
    deleteImage: (imageUrl: string) => void
}

// create a context variable
const ImageContext = createContext<ImageContextProps | undefined>(undefined)

// create a context provider
export function ImageContextProvider(props: { children: ReactNode }) {
    const [imageUrls, setImageUrls] = useState<string[]>([])

    async function getImageUrls() {
        const response = await fetch("/api/images", { method: "GET" })
        const data = await response.json()
        setImageUrls(data.imageUrls ?? [])
    }

    useEffect(() => {
        getImageUrls()
    }, [])
    
    async function uploadImages(images: File[]){
        console.log(images)

        const formData = new FormData()

        images.forEach(image=>formData.append("images", image))

        const response = await fetch("/api/images", {method: "POST", body: formData})

        const data = await response.json()

        setImageUrls(prevImageUrls => [...prevImageUrls, ...data.imageUrls])
    }

    async function deleteImage(imageUrl: string) {
        const response = await fetch("/api/images", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl })
        })

        if (!response.ok) {
            console.log("Failed to delete image")
            return
        }

        setImageUrls(prev => prev.filter(url => url !== imageUrl))
    }


    return (
        <ImageContext.Provider value={{ uploadImages, deleteImage, imageUrls }}>
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