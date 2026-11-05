"use client";

import AvatarUpload from "@/app/components/settings/AvatarUpload";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";

const SettingPage = () => {
  const { avatarUrl, handleUpload } = useAvatarUpload();

  return (
    <div>
      <AvatarUpload avatarUrl={avatarUrl} handleUpload={handleUpload} />
    </div>
  );
};

export default SettingPage;
