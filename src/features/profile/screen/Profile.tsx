import React, { useState, useEffect } from "react";
import useProfileStore from "../profile.store"; 

const Profile = () => {
  // 1. Destructure shared profile state and actions from the custom hook store
  const {
    profile: profileData, 
    userData,
    loading: fetchLoading,
    modifyProfile,
    fetchProfile,         
    clearNotifications,
    error: storeError,
    successMessage: storeSuccess
  } = useProfileStore();

  // 2. Core local input cache model structured to replicate backend Mongoose schema layers
  const [profile, setProfile] = useState({
    bio: "",
    gender: "prefer not to say",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    avatar: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // 3. Mount-trigger fetching data variables over axios
  useEffect(() => {
    if (fetchProfile) fetchProfile();
  }, [fetchProfile]);

  // 4. Populate localized states whenever store caches record updates
  useEffect(() => {
    if (profileData) {
      setProfile({
        bio: profileData.bio || "",
        gender: profileData.gender || "prefer not to say",
        dateOfBirth: profileData.dateOfBirth ? profileData.dateOfBirth.split("T")[0] : "",
        address: {
          street: profileData.address?.street || "",
          city: profileData.address?.city || "",
          state: profileData.address?.state || "",
          zipCode: profileData.address?.zipCode || "",
          country: profileData.address?.country || "",
        },
        avatar: profileData.avatar || "",
      });
    }
  }, [profileData]);

  // 5. Input control managers mapping data transformations dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // 6. Packaging data as Multipart Form-Data and routing to state engine hooks
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clearNotifications) clearNotifications();

    const formData = new FormData();
    formData.append("bio", profile.bio);
    formData.append("gender", profile.gender);
    formData.append("dateOfBirth", profile.dateOfBirth);
    formData.append("address", JSON.stringify(profile.address));

    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    const result = await modifyProfile(formData);
    
    if (result?.success) {
      setSelectedFile(null); 
      // Force reload to let the layout and headers sync with the short URL path string perfectly
      window.location.reload(); 
    }
  };

  if (fetchLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500 font-medium">
        Loading your profile layout matrix...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Manage User Account Profile
        </h2>

        {/* Dynamic Alerts derived straight from your store provider states */}
        {storeError && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200 text-center">
            {storeError}
          </div>
        )}
        {storeSuccess && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200 text-center">
            {storeSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* ================= SECTION 1: AVATAR FRAME ================= */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 bg-gray-100 shadow-inner">
              <img
                src={previewUrl || profile.avatar || "https://placehold.co"}
                alt="Profile Avatar Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co";
                }}
              />
            </div>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold shadow-sm transition-colors duration-200">
              Change Profile Photo
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
                onClick={(e) => e.stopPropagation()} 
              />
            </label>
          </div>

          {/* ================= SECTION 2: READ ONLY ACCOUNT FIELDS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name (Account Linked)</label>
              <input type="text" value={userData?.fullname || ""} disabled className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 font-medium cursor-not-allowed w-full text-sm" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Registered Email</label>
              <input type="email" value={userData?.email || ""} disabled className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 font-medium cursor-not-allowed w-full text-sm" />
            </div>
          </div>

          {/* ================= SECTION 3: EDITABLE BASIC PROPERTIES ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleInputChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Gender Selection</label>
              <select name="gender" value={profile.gender} onChange={handleInputChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all bg-white">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer not to say">Prefer Not to Say</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Bio Narrative (Max 500 Characters)</label>
            <textarea name="bio" value={profile.bio} onChange={handleInputChange} maxLength={500} rows={3} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all resize-none" placeholder="Tell us a little bit about yourself..." />
          </div>

          {/* ================= SECTION 4: EDITABLE NESTED ADDRESS DATA ================= */}
          <h3 className="text-base font-bold text-gray-700 border-b border-gray-100 pb-2 mt-2">
            Physical Mailing Address
          </h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Street Details</label>
            <input type="text" name="street" value={profile.address.street} onChange={handleAddressChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all" placeholder="123 Tech Park St." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">City</label>
              <input type="text" name="city" value={profile.address.city} onChange={handleAddressChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all" placeholder="Noida" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">State / Province</label>
              <input type="text" name="state" value={profile.address.state} onChange={handleAddressChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all" placeholder="Uttar Pradesh" />
            </div>
            <div className="flex flex-col gap-1.5">
  <input type="text" name="zipCode" value={profile.address.zipCode} onChange={handleAddressChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all" placeholder="201301" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Country</label>
            <input type="text" name="country" value={profile.address.country} onChange={handleAddressChange} className="p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full text-sm transition-all" placeholder="India" />
          </div>

          {/* ================= BUTTON CONTROLS ================= */}
          <button 
            type="submit" 
            disabled={fetchLoading} 
            className="mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors duration-200 shadow-sm outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer uppercase tracking-wide"
          >
            {fetchLoading ? "Saving Changes..." : "Update Profile Configuration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
