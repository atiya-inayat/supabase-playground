"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const page = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setuserId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const supabase = createClient();

  async function handleUser() {
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    console.log("user exists on setting page", user);

    if (error) {
      console.error("Error fetching user", error.message);
      return;
    }

    if (!user) {
      console.error("User unauthenticated", error);
      return;
    }
    setuserId(user?.id);

    return user?.id;
  }

  async function handleUpload(event) {
    const userId = await handleUser();
    console.log("setting user id is :: ", userId);

    const file = event.target.files[0];
    if (!file) {
      console.log("Please select a file first");
      return;
    }

    if (!userId) {
      console.error("User unauthenticated");
      return;
    }
    const fileExt = file.name.split(".").pop();

    const fileName = `avatar.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      console.error("Error uploading picture", error.message);
    } else {
      const { data: urlResult } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = urlResult.publicUrl;

      // Display the image on the Settings page
      setAvatarUrl(publicUrl);
      setUploadFile(data);

      // Save the avatar URL in Supabase Auth metadata
      const { data: updatedUser, error: updateError } =
        await supabase.auth.updateUser({
          data: {
            avatar_url: publicUrl,
          },
        });

      if (updateError) {
        console.error("Error saving avatar URL:", updateError.message);
        return;
      }

      console.log("Updated user:", updatedUser.user);

      // Tell the Sidebar to fetch the updated user
      window.dispatchEvent(new Event("profile-updated"));

      console.log("Avatar URL saved successfully:", publicUrl);
    }
  }

  return (
    <div>
      <input
        onChange={handleUpload}
        type="file"
        name="avatar"
        accept="image/png, image/jpeg"
      />
      {avatarUrl && <img src={avatarUrl} alt="profile avatar" width={120} />}
    </div>
  );
};

export default page;
