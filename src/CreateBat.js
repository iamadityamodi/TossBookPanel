import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./CreateBat.css";
import api from "./api";

const CreateBat = () => {


  const location = useLocation();

  const editId = location.state?.id;

  console.log("Received ID:", editId);

  // const [name, setName] = useState("");
  const [formData, setFormData] = useState({
    teamName: "",
    teamA: "",
    teamB: "",
    type: "",
    dateTime: "",
    tossRate: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      console.log("Selected File:", file);  // 👈 check this

      setFormData((prev) => ({
        ...prev,
        image: file || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    console.log("formData.image", formData.image);

    console.log("Image Object:", formData.image);
    console.log("Image Name:", formData.image);


    if (!formData.teamName) newErrors.teamName = "Team Name is required";
    if (!formData.teamA) newErrors.teamA = "Team A is required";
    if (!formData.teamB) newErrors.teamB = "Team B is required";
    if (!formData.type) newErrors.type = "Select Type";
    if (!formData.dateTime) newErrors.dateTime = "Select Date & Time";
    if (!formData.tossRate) newErrors.tossRate = "Toss Rate required";
    if (!formData.image) newErrors.image = "Image required";

    setErrors(newErrors);

    // ❌ Stop if validation fails
    if (Object.keys(newErrors).length !== 0) return;

    try {
      const formattedDate =
        formData.dateTime.replace("T", " ") + ":00";

      const data = new FormData();

      data.append("id", editId);
      data.append("teamAName", formData.teamA);
      data.append("teamBName", formData.teamB);
      data.append("leagueName", formData.teamName);
      data.append("sportType", formData.type);
      data.append("betEndTime", formattedDate);
      data.append("tossRate", formData.tossRate);
      // data.append("image", formData.image);

      // 🔥 Safe image append
      // ✅ Correct image append
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await api.post("InsertBets", data);

      console.log("API Response:", res.data);

      if (res.data.success) {
        alert("Data Submitted Successfully ✅");

        // 🔥 Reset form after success
        setFormData({
          teamName: "",
          teamA: "",
          teamB: "",
          type: "",
          dateTime: "",
          tossRate: "",
          image: null,
        });

        setErrors({});
      } else {
        alert(res.data.message || "Something went wrong ❌");
      }

    } catch (error) {
      console.error("API Error:", error);
      alert("Server Error ❌");
    }
  };

  // 🔥 GET DATA FROM API
  useEffect(() => {

    if (!editId) return;

    const getData = async () => {
      try {

        const body = {
          id: editId,
          user_name: "",
          isActive: "true",
          userZone: ""
        };

        const res = await api.post("getAllBats", body);

        console.log("API Data:", res.data);

        if (res.data.data && res.data.data.length > 0) {

          const bet = res.data.data[0]; // first record

          setFormData({
            teamName: bet.leagueName || "",
            teamA: bet.teamAName || "",
            teamB: bet.teamBName || "",
            type: bet.sportType || "",
            dateTime: bet.betEndTime
              ? bet.betEndTime.replace(" ", "T").slice(0, 16)
              : "",
            tossRate: bet.tossRate || "",
            image: bet.imageUrl
            
          });

        }

      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    getData();
  }, [editId]);

  return (
    <div className="form-container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Create Match</h2>

        <div className="grid-3">

          <div className="form-group">
            <label>Team Name *</label>
            <input type="text" autoComplete="off" name="teamName" value={formData.teamName} onChange={handleChange} />
            {errors.teamName && <p className="error">{errors.teamName}</p>}
          </div>

          <div className="form-group">
            <label>Team Name A *</label>
            <input type="text" autoComplete="off" name="teamA" value={formData.teamA} onChange={handleChange} />
            {errors.teamA && <p className="error">{errors.teamA}</p>}
          </div>

          <div className="form-group">
            <label>Team Name B *</label>
            <input type="text" autoComplete="off" name="teamB" value={formData.teamB} onChange={handleChange} />
            {errors.teamB && <p className="error">{errors.teamB}</p>}
          </div>

          <div className="form-group">
            <label>Type *</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="type" value="Cricket" onChange={handleChange} /> Cricket
              </label>
              <label>
                <input type="radio" name="type" value="Kabaddi" onChange={handleChange} /> Kabaddi
              </label>
            </div>
            {errors.type && <p className="error">{errors.type}</p>}
          </div>

          <div className="form-group">
            <label>Select Date & Time *</label>
            <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} />
            {errors.dateTime && <p className="error">{errors.dateTime}</p>}
          </div>

          <div className="form-group">
            <label>Toss Rate *</label>
            <input type="number" autoComplete="off" name="tossRate" value={formData.tossRate} onChange={handleChange} />
            {errors.tossRate && <p className="error">{errors.tossRate}</p>}
          </div>

          <div className="form-group full-width">
            <label>Attach Image *</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

        </div>



        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}


export default CreateBat;