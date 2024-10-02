import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "skillsharemarket");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dtjgdz8zn/image/upload",
      data
    );

    return response.data.url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error; 
  }
};

export default upload;
