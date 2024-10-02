import { useState } from "react";
import upload from "../../utils/upload.js";
import "./Register.css";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password || !user.country) {
      setError("Please fill out all required fields.");
      return;
    }

    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please upload a valid image file (jpg, png).");
      return;
    }

    setLoading(true);
    try {
      const url = file ? await upload(file) : "";
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a New Account</h1>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
          />

          <label htmlFor="file">Profile Picture</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            placeholder="USA"
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="right">
          <h1>Become a Seller</h1>
          <div className="toggle">
            <label htmlFor="isSeller">Activate Seller Account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="phone">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />

          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            placeholder="A short description of yourself"
            cols="30"
            rows="5"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
