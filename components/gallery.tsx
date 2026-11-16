"use client";
import { useImageContext } from "../context/imageContext";
import Image from "next/image";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Gallery() {
  const { imageUrls, deleteImage } = useImageContext();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 2, p: 2 }}>
      {imageUrls.map((image: string) => (
        <Box key={image} sx={{ position: "relative", width: 300 }}>
          <a href={image} target="_blank">
            <Image
              src={image}
              width={300}
              height={300}
              alt="Gallery"
              style={{ display: "block", width: "100%", height: "auto", cursor: "zoom-in" }}
            />
          </a>
          <IconButton
            aria-label="Delete image"
            size="small"
            onClick={() => deleteImage(image)}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
