import React, { useState } from "react";

function CreateUser() {

  const [role, setRole] = useState("");

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Selected Role: " + role);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>User Role *</label>

        <select value={role} onChange={handleChange} style={styles.select}>
          <option value="">-- Select UserRole --</option>
          <option value="User">User</option>
          <option value="SiteAdmin">SiteAdmin</option>
          <option value="MainAdmin">MainAdmin</option>
        </select>

        <br /><br />

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "50px auto",
    fontFamily: "Arial"
  },
  label: {
    fontWeight: "bold"
  },
  select: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default CreateUser;