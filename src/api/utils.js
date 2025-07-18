// import axios from "axios"


// // upload image and return image url
// export const imageUpLoad= async imageData =>{
//     const imageFormData=new FormData()
//     imageFormData.append('image', imageData)
//      const { data } = await axios.post(
//     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//     imageFormData
//   )
//   return data?.data?.display_url
// };

// console.log("IMGBB Key:",);

// export const saveUserDB= async user =>{
//   const {data}=await axios.post(`http://localhost:3000/user`,user)
//   console.log(data)
//   return data;
// }

import axios from "axios"



export const imageUpload=async imageData =>{
    const imageFormData = new FormData()
  imageFormData.append('image', imageData)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=4bf307bd7fe356fa7b4c940abc922d0f`,
    imageFormData
  )
  // image url response from imgbb
  return data?.data?.display_url
};
// export const imageUpload = async (imageFile) => {
//   const formData = new FormData();
//   formData.append("file", imageFile);
//   formData.append("upload_preset", "unsigned_preset_1"); // <-- put your unsigned preset here

//   try {
//     const { data } = await axios.post(
//       "https://api.cloudinary.com/v1_1/dns0jdzrm/image/upload",
//       formData
//     );
//     return data.secure_url; // Return the hosted image URL
//   } catch (error) {
//     console.error("❌ Cloudinary upload failed:", error);
//     throw new Error("Image upload failed");
//   }
// };


// save or update user in db
export const saveUserDB= async user =>{
  const {data}=await axios.post(`https://server12-taupe.vercel.app/user`,user)
  return data;
}