"use client";

// avatarUrl, handleUpload comes from your custom hook and is passed as a prop.

export default function AvatarUpload({ avatarUrl, handleUpload }) {
  return (
    <div>
      <h2>Profile Photo</h2>
      <input
        onChange={handleUpload}
        type="file"
        name="avatar"
        accept="image/png, image/jpeg,  image/webp"
      />
      {avatarUrl && <img src={avatarUrl} alt="profile avatar" width={120} />}
    </div>
  );
}
