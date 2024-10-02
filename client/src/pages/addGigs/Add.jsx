import { useReducer, useState } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const feature = e.target[0].value.trim();
    if (feature) {
      dispatch({
        type: "ADD_FEATURE",
        payload: feature,
      });
      e.target[0].value = "";
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = singleFile ? await upload(singleFile) : null;

      const images = await Promise.all(
        Array.from(files).map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.error("File upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (error) => {
      console.error("Error submitting gig:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!state.title || !state.cat || !state.desc || !state.price) {
      alert("Please fill in all required fields.");
      return;
    }

    mutation.mutate(state);
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="painting">Painting</option>
              <option value="drawing">Drawing</option>
              <option value="softwareDevelopment">Software Development</option>
              <option value="videoEditing">Video Editing</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="coverImage">Cover Image</label>
                <input
                  type="file"
                  id="coverImage"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="uploadImages">Upload Images</label>
                <input
                  type="file"
                  id="uploadImages"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Brief description to introduce your service to customers"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              id="shortTitle"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              id="deliveryTime"
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              id="revisionNumber"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="addFeatures">Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input
                type="text"
                id="addFeatures"
                placeholder="e.g. page design"
              />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
