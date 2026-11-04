"use client";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { useProfileContext } from "@/context/profileContext";

export default function Home() {
  const { user } = useProfileContext();
  return (
    <main>
      <Typography variant="h4">
        Hello {user ? user.email : "World"}!{" "}
      </Typography>
      {!user && (
        <Link className="bg-amber-400 rounded-xl p-4 text-2xl" href="/login">
          Login
        </Link>
      )}
    </main>
  );
}
