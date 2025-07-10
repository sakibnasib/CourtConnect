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

// save or update user in db
export const saveUserDB= async user =>{
  const {data}=await axios.post(`http://localhost:3000/user`,user)
  return data;
}