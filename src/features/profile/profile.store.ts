import { useState, useCallback } from "react";
import { profileApiService } from "./profile.api";

export const useProfileStore = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearNotifications = useCallback(() => {
    setError(null);
    setSuccessMessage(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await profileApiService.getProfile();
      if (result.success && result.data) {
        setProfileData(result.data);
        if (result.data.user) {
          setUserData(result.data.user); 
        }
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.error || "Failed to load user profile matrix.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const modifyProfile = useCallback(async (formDataPayload: FormData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const result = await profileApiService.updateProfile(formDataPayload);
      if (result.success && result.data) {
        setProfileData(result.data); 
        setSuccessMessage("Your profile information has been successfully updated.");
        return { success: true };
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.error || "Error encountered while modifying profile.";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile: profileData, // 🎯 FIXED: Maps internal state to "profile" for seamless component destructuring
    profileData,         // Kept as a fallback option
    userData,
    loading,
    error,
    successMessage,
    fetchProfile,
    modifyProfile,
    clearNotifications,
  };
};

export default useProfileStore;
