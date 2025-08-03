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


// save or update user in db
export const saveUserDB= async user =>{
  const {data}=await axios.post(`https://server12-taupe.vercel.app/user`,user)
  return data;
}