import React, { useState } from "react";
 import { ToastContainer, toast } from "react-toastify";

const AddUser = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        mobile: "",
        age: "",
        gender: "",
        country: "",
        address: ""
    });



    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const styles = {
        page: { padding: 20, fontFamily: "Arial" },
        card: { border: "1px solid #ddd", borderRadius: 10, padding: 25 },
        row: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 16
        },
        field: { display: "flex", flexDirection: "column" },
        label: { fontSize: 14, fontWeight: 600, marginBottom: 6 },
        input: {
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
        },
        error: { color: "red", fontSize: 12, marginTop: 4 },
        button: {
            padding: "10px 20px",
            background: "#0d6efd",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
        },
        buttonWrapper: {
            gridColumn: "1 / -1",   // ⬅ span full row
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20
        },


    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        let temp = {};

        if (!form.name) temp.name = "Name is required";
        if (!form.username) temp.username = "Username is required";
        if (!form.password) temp.password = "Password is required";
        if (!form.mobile) temp.mobile = "Mobile number is required";
        else if (form.mobile.length !== 10)
            temp.mobile = "Mobile must be 10 digits";
        if (!form.gender) temp.gender = "Gender is required";
        if (!form.address) temp.address = "Address is required";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            fullname: form.name,
            user_name: form.username,
            password: form.password,
            address: form.address,
            mobile_no: form.mobile,
            ages: form.age,
            gender: form.gender,
            country: form.country
        };

        try {
            setLoading(true);

            const response = await fetch(
                "https://api.sarktossbook.com/api/v1/tossbook/createuser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();

            if (response.ok) {
                 toast.success(response.data.message || "Something went wrong!", {
                                    position: "top-right",
                                    autoClose: 2000,
                                    theme: "colored",
                                });
                alert("User created successfully");
                console.log(result);
            } else {
                toast.error(result.message || "Something went wrong", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    theme: "colored",
                                });
            }
        } catch (error) {
            toast.error("API error", {
                                position: "top-right",
                                autoClose: 3000,
                                theme: "colored",
                            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={styles.page}>
            <h3>Add User</h3>
            <div style={styles.card}>


                {/* FORM START */}
                <form autoComplete="off" onSubmit={handleSubmit}>

                    {/* Row 1 */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>Name *</label>
                            <input
                                name="name"
                                autoComplete="off"
                                style={styles.input}
                                onChange={handleChange}
                            />
                            {errors.name && <span style={styles.error}>{errors.name}</span>}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Username *</label>
                            <input
                                name="username"
                                autoComplete="off"
                                style={styles.input}
                                onChange={handleChange}
                            />
                            {errors.username && (
                                <span style={styles.error}>{errors.username}</span>
                            )}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Password *</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                style={styles.input}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <span style={styles.error}>{errors.password}</span>
                            )}
                        </div>


                    </div>

                    {/* Row 2 */}
                    <div style={styles.row}>

                        <div style={styles.field}>
                            <label style={styles.label}>Mobile No *</label>
                            <input
                                name="mobile"
                                autoComplete="off"
                                style={styles.input}
                                onChange={handleChange}
                            />
                            {errors.mobile && (
                                <span style={styles.error}>{errors.mobile}</span>
                            )}
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Age</label>
                            <input
                                name="age"
                                autoComplete="off"
                                style={styles.input}
                                onChange={handleChange}
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Gender *</label>
                            <select
                                name="gender"
                                autoComplete="off"
                                style={styles.input}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Gender --</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.gender && (
                                <span style={styles.error}>{errors.gender}</span>
                            )}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Country</label>
                            <input
                                name="country"
                                autoComplete="off"
                                style={styles.input}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Address */}
                        <div style={styles.field}>
                            <label style={styles.label}>Address *</label>
                            <textarea
                                name="address"
                                autoComplete="off"
                                rows="4"
                                style={styles.input}
                                onChange={handleChange}
                            />
                            {errors.address && (
                                <span style={styles.error}>{errors.address}</span>
                            )}
                        </div>

                    </div>


                    <br />
                    <div style={styles.buttonWrapper}>
                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? "Please wait..." : "Create User"}
                        </button>
                    </div>
                </form>
                <ToastContainer />
                {/* FORM END */}
            </div>
        </div>
    );
};

export default AddUser;
