import { useImageContext } from "@/context/imageContext";

export default async function Gallery() {
  const { uploadImages } = useImageContext()
  const response = await fetch("/api/images")
}