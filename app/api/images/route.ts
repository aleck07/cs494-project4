import { createClient } from "@/lib/supabase/server";
import { put, list, del } from "@vercel/blob";
import { generateFileName } from "@/lib/file";
import { todo } from "node:test";

export async function POST(request: Request) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user || !user.data.user) {
    return Response.json({ error: "User not authenticated" });
  }

  const userId = user.data.user.id;

  const formData = await request.formData();
  const images = formData.getAll("images");

  const urls = [];

  for (let i = 0; i < images.length; i++) {
    const { url } = await put(`${userId}/${generateFileName()}`, images[i], {
      access: "public",
    });
    urls.push(url);
  }

  return Response.json({ imageUrls: urls });
}

export async function GET() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user || !user.data.user) {
    return Response.json({ error: "User not authenticated" });
  }

  const userId = user.data.user.id;

  const blobs = (await list({ prefix: `${userId}/` })).blobs;
  const imageUrls = blobs.map((blob) => blob.url);

  return Response.json({ imageUrls });
}

export async function DELETE(request: Request) {
  // TODO: should be able to delete a file by path. An icon will call this function
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user || !user.data.user) {
    return Response.json({ error: "User not authenticated" });
  }

  let imageUrl: string;
  try {
    ({ imageUrl } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    await del(imageUrl);
    return Response.json({ message: "Image deleted successfully" });
  } catch (error) {
    return Response.json({ error: "Failed to delete image!" }, { status: 500 });
  }
}