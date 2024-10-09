import { useReducer, useState } from "react";
import "./Add.css";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook

const Add = () => {
  const { t } = useTranslation(); // Hook for translation
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
    if (!state.title || !state.cat || !state.desc || !state.price) {
      alert(t("add.alertMessage")); // Use translation for alert message
      return;
    }
    mutation.mutate(state);
  };

  return (
    <div className="add">
      <div className="container">
        <h1>{t("add.addNewGig")}</h1> {/* Use translation for the title */}
        <div className="sections">
          <div className="info">
            <label htmlFor="title">{t("add.title")}</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={t("add.titlePlaceholder")} // Use translation for placeholder
              onChange={handleChange}
            />
            <label htmlFor="cat">{t("add.category")}</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">{t("add.categoryDesign")}</option>
              <option value="web">{t("add.categoryWeb")}</option>
              <option value="animation">{t("add.categoryAnimation")}</option>
              <option value="music">{t("add.categoryMusic")}</option>
              <option value="painting">{t("add.categoryPainting")}</option>
              <option value="drawing">{t("add.categoryDrawing")}</option>
              <option value="softwareDevelopment">{t("add.categorySoftwareDevelopment")}</option>
              <option value="videoEditing">{t("add.categoryVideoEditing")}</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="coverImage">{t("add.coverImage")}</label>
                <input
                  type="file"
                  id="coverImage"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="uploadImages">{t("add.uploadImages")}</label>
                <input
                  type="file"
                  id="uploadImages"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} className="upload-button">
                {uploading ? t("add.uploading") : t("add.upload")} {/* Use translation for button text */}
              </button>
            </div>
            <label htmlFor="desc">{t("add.description")}</label>
            <textarea
              name="desc"
              id="desc"
              placeholder={t("add.descriptionPlaceholder")} // Use translation for placeholder
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit} className="create-button">{t("add.create")}</button> {/* Use translation for button text */}
          </div>
          <div className="details">
            <label htmlFor="shortTitle">{t("add.shortTitle")}</label>
            <input
              type="text"
              id="shortTitle"
              name="shortTitle"
              placeholder={t("add.shortTitlePlaceholder")} // Use translation for placeholder
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">{t("add.shortDesc")}</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              placeholder={t("add.shortDescPlaceholder")} // Use translation for placeholder
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">{t("add.deliveryTime")}</label>
            <input
              type="number"
              id="deliveryTime"
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="revisionNumber">{t("add.revisionNumber")}</label>
            <input
              type="number"
              id="revisionNumber"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="addFeatures">{t("add.addFeatures")}</label>
            <form className="add" onSubmit={handleFeature}>
              <input
                type="text"
                id="addFeatures"
                placeholder={t("add.addFeaturesPlaceholder")} // Use translation for placeholder
              />
              <button type="submit" className="feature-button">{t("add.add")}</button> {/* Use translation for button text */}
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                    className="remove-feature"
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">{t("add.price")}</label>
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
