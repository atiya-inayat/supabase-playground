// A custom hook lets us reuse React logic separately from the UI.
// this hook will handle everything related to avatar uploads.

"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export function useAvatarUpload() {
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

    return user?.id;
  }

  async function handleUpload(event) {
    // Get the first selected file from the input's FileList when the input value changes.
    const file = event.target.files[0];
    if (!file) {
      console.log("Please select a file first");
      return;
    }

    const userId = await handleUser();
    console.log("setting user id is :: ", userId);
    let oldAvatarPath = null;

    if (!userId) {
      console.error("User unauthenticated");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file.size > maxSize) {
      console.error("File size exceeds 2 MB. Please select a smaller file.");
      return; // stop if file is too large
    }

    // file.name -- gives the name of the selected file
    // split() -> js method its job is to devide a string into smaller pieces wherever it finds the character we specify - js finds the dot(.) and devides the string there.e.g. myphoto.png ['myphoto', 'png']
    // pop() -> js method its job is to remove the last element from an array and return it. e.g. ['myphoto', 'png'].pop() => 'png'
    const fileExt = file.name.split(".").pop();

    const uuid = crypto.randomUUID(); // Generate a unique identifier for the file
    // we want a fixed filename (avatar) but a flexible extension (png, jpg, jpeg, etc.).
    const fileName = `avatar-${uuid}.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/webp"
    ) {
      console.error(
        "Invalid file type. Please upload a PNG, JPEG, or WEBP image.",
      );
      return;
    }

    // this remember the previous avatar storage path
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("avatar_path")
      .eq("id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching old avatar:", fetchError.message);
      return;
    }

    oldAvatarPath = profile?.avatar_path;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading picture", error.message);
      return;
    } else {
      const { data: urlResult } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath); // It generates the URL needed to display an image from a public bucket.

      const publicUrl = urlResult.publicUrl;

      // Save the avatar URL in profiles table
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          // Inserts or updates a profile record.
          id: userId, // Identifies whose profile to update.
          avatar_path: data.path, // Saves the uploaded image's Storage path.
        },
        {
          onConflict: "id", // Uses the primary key to identify an existing profile.
        },
      );

      if (profileError) {
        console.error("Error saving avatar URL:", profileError.message);
        return;
      }

      // delete the older image
      if (oldAvatarPath) {
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([oldAvatarPath]);

        if (deleteError) {
          console.error("Error deleting old avatar:", deleteError.message);
        }
      }

      // Display the image on the Settings page
      setAvatarUrl(publicUrl);

      // Tell the Sidebar to fetch the updated user
      window.dispatchEvent(new Event("profile-updated"));

      console.log("Avatar Path saved successfully:", data.path);
    }
  }

  useEffect(() => {
    async function getAvatar() {
      // Get the logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }

      if (!user) return;

      // Get the saved avatar path
      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("avatar_path")
        .eq("id", user.id)
        .maybeSingle(); // If the user doesn't have a profile record yet, .maybeSingle() handles that situation more gracefully.

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      if (!data?.avatar_path) return;

      // Generate the public image URL
      const { data: image } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.avatar_path);

      setAvatarUrl(image.publicUrl);
    }

    getAvatar();
  }, []);

  return {
    avatarUrl,
    handleUpload,
  };
}

/*
upload flow now
1. Get logged-in user.
2. Remember the old avatar path.
3. Upload the new image.
4. Update the profile table.
5. Delete the old image.
6. Display the new image.

*/
