import React, { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import logoutImage from "./assets/images/logout.png"; // adjust path
import axios from "axios";
import trophyImage from "./assets/images/trophy.png"; // your image path
import calanderImage from "./assets/images/calander.png";
import growthImage from "./assets/images/growth.png";
import scheduleImage from "./assets/images/schedule.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Dashboard() {
  const navigate = useNavigate();


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamID, setSelectedTeamID] = useState("");

  const handleRefresh = () => {
    navigate(0); // ✅ same as full reload
  };



  const openDialogImage = (match) => {
    setSelectedMatch(match);
    setIsDialogOpen(true);
  };

  const closeDialogImage = () => {
    setIsDialogOpen(false);
    setSelectedMatch(null);
  };


  const openDialog = (teamName, id) => {
    setSelectedTeam(teamName);
    setSelectedTeamID(id);
    setIsOpen(true);
  };

  const clearText = () => {
    setInputValue("")
  }

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedTeam("");
    setSelectedTeamID("");
  }

  const handleLogout = () => {

    localStorage.removeItem("User_ID");
    localStorage.removeItem("User_Name");
    localStorage.removeItem("isLoggedIn");
    navigate("/"); // redirect back to login
  };


  const [bats, setBats] = useState([]);   // state to hold API data
  const [wallet, setWallet] = useState([]);   // state to hold API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState(""); // state for input
  const [message, setMessage] = useState("");


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);


  // Fetch data from API
  useEffect(() => {

    const userId = localStorage.getItem("User_ID");
    const userName = localStorage.getItem("User_Name");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || !userId || !userName) {
      console.warn("Skipping API calls — user not logged in");
      return;
    }

    setLoading(true);
    setError("");

    const body = {
      id: "",
      isActive: "true", // use boolean instead of string if your backend expects boolean
      isDelete: "", // same here
      user_name: localStorage.getItem("User_Name") // same here
    };

    const bodyUser = { user_id: localStorage.getItem("User_ID") }; // example body


    console.log("Data store", localStorage.getItem("User_ID"));
    console.log("Data store", localStorage.getItem("User_Name"));

    // Tossbook.getAllBats(body)
    axios
      .post("https://tossbook-api-1008064032232.asia-south1.run.app/api/v1/tossbook/getAllBats", body)
      .then((response) => {
        console.log("API Response:", response.data);
        console.log(localStorage.getItem("User_ID"));

        setBats(response.data?.data || []);
        setLoading(false);


        // Tossbook.getwallet(body)
        axios
          .post("https://tossbook-api-1008064032232.asia-south1.run.app/api/v1/tossbook/wallet", bodyUser)
          .then((response) => {
            console.log("API Response: wallet ", response.data);
            setWallet(response.data?.data || []);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching bats:", err.response || err);
            setError("Failed to load data");
            setLoading(false);
          });

      })
      .catch((err) => {
        console.error("Error fetching bats:", err.response || err);
        setError("Failed to load data");
        setLoading(false);
        axios
          .post("https://tossbook-api-1008064032232.asia-south1.run.app/api/v1/tossbook/wallet", bodyUser)
          .then((response) => {
            console.log("API Response:", response.data);
            setWallet(response.data?.data || []);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching bats:", err.response || err);
            setError("Failed to load data");
            setLoading(false);
          });
      });


  }, []);

  // Render UI
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
        ⚠️ {error}
      </div>
    );


  const handleClick100 = (value) => {
    setInputValue(value); // set clicked value into input
  };

  const handleClick200 = (value) => {
    setInputValue(value); // set clicked value into input
  };

  const handleClick500 = (value) => {
    setInputValue(value); // set clicked value into input
  };

  const handleClick1000 = (value) => {
    setInputValue(value); // set clicked value into input
  };

  const handleClick1500 = (value) => {
    setInputValue(value); // set clicked value into input
  };

  const handleClick2000 = (value) => {
    setInputValue(value); // set clicked value into input
  };


  const value100 = 100;
  const value200 = 200;
  const value500 = 500;
  const value1000 = 1000;
  const value1500 = 1500;
  const value2000 = 2000;

  const handlePlaceBet = async () => {
    setLoading(true);
    setMessage("");

    try {
      const userName = localStorage.getItem("User_Name");

      console.log("useranem", userName);
      console.log("useranem", selectedTeam);

      // console.log("useranem",selectedTeam);
      console.log("useranem", Number(inputValue));
      console.log("useranem", selectedTeamID);


      const payload = {
        userName,
        betId: selectedTeamID,
        betTeamName: selectedTeam,
        amountOfBet: Number(inputValue),
      };

      console.log("🔹 Sending payload:", payload);

      const response = await fetch("https://tossbook-api-1008064032232.asia-south1.run.app/api/v1/tossbook/place_bet", {
        // const response = await fetch("http://localhost:8080/api/v1/tossbook/place_bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("🔹 API Response:", data);

      if (response.ok) {
        setMessage("Bet placed successfully!");
        toast.success("Bet placed successfully", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });


        // 🟢 CLOSE DIALOG AFTER SHORT DELAY (for success message visibility)
        setTimeout(() => {
          closeDialog();
          handleRefresh();
        }, 300);
      } else {
        setMessage(`❌ Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      setMessage("⚠️ Network or server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      textAlign: "left", padding: "15px"

    }}>

      <div style={{
        display: "flex", padding: "15px",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1>Sarkar Toss Book</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap", // allows wrapping on small screens
            gap: "15px",
            padding: "10px 20px",
          }}
        >
          {wallet.map((item, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 150px", // responsive box sizing
                textAlign: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <p><strong></strong> {localStorage.getItem("User_Name")}</p>
              <p><strong>Balance:</strong> {item.tblWalletcol}</p>
              <p><strong>Exposure:</strong> {item.exposure}</p>
            </div>
          ))}
        </div>
        <img src={logoutImage} alt="Example" onClick={handleLogout} style={{
          padding: "10px 20px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}></img>
      </div>

      <div style={{ display: "flex", margin: "20px", gap: "25px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/bets" style={linkStyle}>Bets</Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px",
          backgroundColor: "#f3f4f6",
        }}
      >


        {bats && bats.length > 0 ? (
          bats.map((match, index) => (

            <div
              key={index}>

              <div style={{
                textAlign: "end",
                color: "#666",
                marginRight: "20px"
              }}>
                <p>
                  <b>{match.betEndTime ? (
                    <EndTimeCountdown betEndTime={match.betEndTime} />
                  )
                    : "N/A"}</b>
                </p>
              </div>


              <div style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: "20px",
                border: "2px solid #2d0ee0ff",
              }}>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#777",
                  }}
                >
                  {/* 📅 Date */}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center", // centers vertically
                      gap: "6px",           // small space between icon & text
                    }}
                  >
                    <img
                      src={calanderImage}  // ✅ make sure imported correctly
                      alt="Calendar Icon"
                      style={{
                        width: "16px",
                        height: "16px",
                        objectFit: "contain",
                        opacity: 0.7, // subtle gray tone
                      }}
                    />
                    <span style={{ color: "#444", fontSize: "14px" }}>
                      {match.betEndTime
                        ? new Date(match.betEndTime)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, "-")
                        : "N/A"}
                    </span>
                  </span>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      border: "2px solid #2d0ee0ff", // green border
                      borderRadius: "12px",
                      padding: "4px",
                    }}
                    onClick={() => openDialogImage(match)} // 👈 open dialog with this match’s data
                  >
                    <img
                      src={`http://localhost:8080${match.imageUrl}`}
                      alt="League Logo"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-logo.png";
                      }}
                    />
                  </div>

                  {/* LIVE badge */}
                  <span
                    style={{
                      background: "#e91f11ff",
                      color: "white",
                      borderRadius: "10px",
                      padding: "3px 10px",
                      fontSize: "12px",
                    }}
                  >
                    LIVE
                  </span>
                </div>


                <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                  {match.leagueName}
                </h3>

                {/* Team vs Team */}
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "15px",
                    borderRadius: "10px",
                    textAlign: "center",
                    margin: "15px 0",
                    fontWeight: "600",
                    color: "#111",
                  }}
                >
                  <h4 style={{ margin: "5px 0" }}>{match.teamAName}</h4>
                  <h4
                    style={{
                      margin: "5px 0",
                      color:
                        match.hasBet === 1
                          ? match.betTeamName === match.teamAName
                            ? "green"
                            : "red"
                          : "#111",
                    }}
                  >
                    {/* {match.hasBet === 1
                      ? (match.betTeamName === match.teamAName
                        ? `+${(match.betAmount * match.tossRate) / 100}`
                        : `-${match.betAmount}`)
                      : match.betAmount} */}
                  </h4>

                  <p
                    style={{
                      margin: "5px 0",
                      background: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                      width: "40px",
                      height: "40px",
                      lineHeight: "40px",
                      fontWeight: "bold",
                      color: "#3b1ce6",
                      border: "2px solid #e5e7eb",
                    }}
                  >
                    VS
                  </p>
                  <h4 style={{ margin: "5px 0" }}>{match.teamBName}</h4>
                  <h4
                    style={{
                      margin: "5px 0",
                      color:
                        match.hasBet === 1
                          ? match.betTeamName === match.teamBName
                            ? "green"
                            : "red"
                          : "#111",
                    }}
                  >
                    {/* {match.hasBet === 1
                      ? (match.betTeamName === match.teamBName
                        ? `+${(match.betAmount * match.tossRate) / 100}`
                        : `-${match.betAmount}`)
                      : match.betAmount} */}
                  </h4>
                </div>


                <div style={{ textAlign: "center", color: "#444" }}>
                  {/* End Time Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center", // center horizontally
                      alignItems: "center", // align vertically
                      gap: "6px",
                      marginBottom: "6px",
                    }}
                  >
                    <img
                      src={scheduleImage} // ✅ imported at top
                      alt="Calendar Icon"
                      style={{
                        width: "16px",
                        height: "16px",
                        objectFit: "contain",
                        opacity: 0.7,
                      }}
                    />
                    <span>
                      End Time:{" "}
                      <b>
                        {match.betEndTime
                          ? new Date(match.betEndTime).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "Asia/Kolkata", // convert UTC → IST
                          })
                          : "N/A"}
                      </b>
                    </span>
                  </div>

                  {/* Toss Rate Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <img
                      src={growthImage} // ✅ imported at top
                      alt="Calendar Icon"
                      style={{
                        width: "16px",
                        height: "16px",
                        objectFit: "contain",
                        opacity: 0.7,
                      }}
                    />
                    <b>Toss Rate:</b>
                    <span
                      style={{
                        background: "#fee2e2",
                        color: "#b91c1c",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {match.tossRate}
                    </span>
                  </div>
                </div>


                <div style={{ textAlign: "center", marginTop: "15px" }}>
                  {match.userHasBet === false ? (
                    <>
                      <button
                        onClick={() => openDialog(match.teamAName, match.id)}
                        style={{
                          backgroundColor: "#3b1ce6ff",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px 20px",
                          marginBottom: "10px",
                          width: "100%",
                        }}
                      >
                        BET ON {match.teamAName}
                      </button>

                      <button
                        onClick={() => openDialog(match.teamBName, match.id)}
                        style={{
                          backgroundColor: "#3b1ce6ff",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px 20px",
                          width: "100%",
                        }}
                      >
                        BET ON {match.teamBName}
                      </button>
                    </>
                  ) : (
                    <>

                    </>
                  )}

                  <ToastContainer position="top-right" autoClose={2000} theme="colored" />

                  {isOpen && (


                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "20px",
                          borderRadius: "8px",
                          width: "90%",
                          maxWidth: "400px",
                          boxSizing: "border-box",
                        }}
                      >



                        <p>{wallet.map((item, index) => (
                          <li key={index}>
                            <strong>Balance:</strong>{" "}
                            {item.tblWalletcol}
                          </li>
                        ))}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center", // center horizontally
                            alignItems: "center",     // center vertically

                          }}
                        >
                          <h4
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "4px 4px",
                              backgroundColor: "#f0f0f0",
                              border: "2px solid #3b1ce6",
                              borderRadius: "8px",
                            }}
                          >
                            <img
                              src={trophyImage}
                              alt="Trophy"
                              style={{ width: "18px", height: "18px" }}
                            />
                            Place Bet
                          </h4>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center", // center horizontally
                            alignItems: "center",     // center vertically

                          }}
                        >
                          <h4
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "4px 4px",
                              backgroundColor: "#f0f0f0",
                              border: "2px solid #3b1ce6",
                              borderRadius: "8px",
                            }}
                          >

                            {selectedTeam}
                          </h4>
                        </div>


                        <div style={{
                          display: "flex",
                          justifyContent: "center", // center horizontally
                          alignItems: "center",     // center vertically

                        }}>
                          <div
                            onClick={() => handleClick100(value100)}  // pass value on click
                            style={{
                              backgroundColor: "#f0f0f0",  // background color
                              color: "#000000",            // text color
                              padding: "12px 16px",        // spacing inside
                              borderRadius: "8px",         // rounded corners
                              border: "1px solid #3b1ce6", // optional border (stroke)
                              width: "50px",           // optional max width
                              fontSize: "16px",
                            }}
                          >
                            {value100}
                          </div>
                          <div
                            onClick={() => handleClick200(value200)}  // pass value on click
                            style={{
                              margin: "4px",
                              backgroundColor: "#f0f0f0",  // background color
                              color: "#000000",            // text color
                              padding: "12px 16px",        // spacing inside
                              borderRadius: "8px",         // rounded corners
                              border: "1px solid #3b1ce6", // optional border (stroke)
                              width: "50px",           // optional max width
                              fontSize: "16px",
                            }}
                          >
                            {value200}
                          </div>
                          <div
                            onClick={() => handleClick500(value500)}  // pass value on click
                            style={{
                              backgroundColor: "#f0f0f0",  // background color
                              color: "#000000",            // text color
                              padding: "12px 16px",        // spacing inside
                              borderRadius: "8px",         // rounded corners
                              border: "1px solid #3b1ce6", // optional border (stroke)
                              width: "50px",           // optional max width
                              fontSize: "16px",
                            }}
                          >
                            {value500}
                          </div>

                        </div>

                        <div style={{
                          display: "flex",
                          justifyContent: "center", // center horizontally
                          alignItems: "center",     // center vertically

                        }}>
                          <div
                            onClick={() => handleClick1000(value1000)}  // pass value on click
                            style={{
                              backgroundColor: "#f0f0f0",  // background color
                              color: "#000000",            // text color
                              padding: "12px 16px",        // spacing inside
                              borderRadius: "8px",         // rounded corners
                              border: "1px solid #3b1ce6", // optional border (stroke)
                              width: "50px",           // optional max width
                              fontSize: "16px",
                            }}
                          >
                            {value1000}
                          </div>
                          <div
                            onClick={() => handleClick1500(value1500)}  // pass value on click
                            style={{
                              margin: "4px",
                              backgroundColor: "#f0f0f0",  // background color
                              color: "#000000",            // text color
                              padding: "12px 16px",        // spacing inside
                              borderRadius: "8px",         // rounded corners
                              border: "1px solid #3b1ce6", // optional border (stroke)
                              width: "50px",           // optional max width
                              fontSize: "16px",
                            }}
                          >
                            {value1500}
                          </div>
                          <div
                            onClick={() => handleClick2000(value2000)}  // pass value on click
                            style={{
                              backgroundColor: "#f0f0f0",  // background color
                              color: "#000000",            // text color
                              padding: "12px 16px",        // spacing inside
                              borderRadius: "8px",         // rounded corners
                              border: "1px solid #3b1ce6", // optional border (stroke)
                              width: "50px",           // optional max width
                              fontSize: "16px",
                            }}
                          >
                            {value2000}
                          </div>

                        </div>


                        <h4>Or Enter Custom amount</h4>

                        <div>
                          <input
                            type="text"
                            placeholder="Enter amount..."
                            value={inputValue}            // bind state here
                            onChange={(e) => setInputValue(e.target.value)} // allow typing/clearing
                            style={{
                              alignItems: "center",
                              fontSize: "16px",
                              padding: "4px 4px",
                              borderRadius: "4px",
                              border: "2px solid #3700ff", // make border visible
                              backgroundColor: "#ffffff",   // white background
                              color: "#000000",             // black text for visibility
                              outline: "none",              // removes default focus outline
                            }}
                          />
                        </div>
                        {/* <button
                        onClick={closeDialog}
                        style={{
                          marginTop: "10px",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Close
                      </button> */}

                        <div style={
                          {
                            display: "flex",
                            justifyContent: "center", // center horizontally
                            alignItems: "center",     // center vertically

                          }
                        }>
                          <button
                            onClick={clearText}
                            style={{
                              backgroundColor: "#e0e0e0ff",
                              marginTop: "10px",
                              color: "black",
                              border: "none",
                              borderRadius: "8px",
                              padding: "10px 20px",
                              marginBottom: "10px",
                              width: "100%",
                            }}
                          >
                            Reset
                          </button>

                          <button
                            onClick={handlePlaceBet}
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "#3b1ce6ff",
                              marginTop: "10px",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              padding: "10px 20px",
                              marginBottom: "10px",
                              width: "100%",
                            }}
                          >
                            {/* BET ON {match.teamAName} */}
                            Place Bet
                          </button>


                        </div>

                        <div>
                          {/* 📩 Response Message */}
                          {message && (
                            <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>
                          )}

                        </div>

                      </div>
                    </div>
                  )}

                </div>

              </div>


            </div>
          ))
        ) : (
          // 🟡 Show this when no data found
          <div
            style={{
              display: "flex",
              justifyContent: "center",  // horizontal center
              alignItems: "center",      // vertical center
              height: "100vh",           // full screen height
              width: "100vw",            // full screen width
              textAlign: "center",
              color: "#000000ff",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            No Data Available
          </div>
        )}

        <ToastContainer />

        {isDialogOpen && selectedMatch && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // dark overlay
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              backdropFilter: "blur(2px)", // subtle blur effect
            }}
            onClick={closeDialogImage} // click outside to close
          >
            <div
              style={{
                backgroundColor: "#fff", // white background for dialog
                border: "2px solid rgba(45, 14, 224, 0.8)", // subtle blue border
                borderRadius: "16px",
                padding: "8px",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)", // soft shadow
                maxWidth: "90vw",
                maxHeight: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => e.stopPropagation()} // prevent close on inner click
            >
              <img
                src={`http://localhost:8080${selectedMatch.imageUrl}`}
                alt="League Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  objectFit: "contain",
                  border: "1px solid rgba(0, 0, 0, 0.1)", // thin border around image
                  backgroundColor: "#f9f9f9", // light grey background behind image
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-logo.png";
                }}
              />
            </div>
          </div>
        )}


      </div>



    </div>

  );
}

const linkStyle = {

  textDecoration: "none",
  color: "#000",
  fontWeight: "500",
  fontSize: "16px",
  cursor: "pointer",
};







function EndTimeCountdown({ betEndTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Convert betEndTime UTC to Date object
      const end = new Date(betEndTime);

      // Calculate difference in milliseconds
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [betEndTime]);

  return <b>{timeLeft}</b>;
}




export default Dashboard;
