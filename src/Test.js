import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DateTime } from "luxon";


function Test() {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");





    useEffect(() => {
        fetchBets();
    }, []);

    const fetchBets = async () => {
        try {
            // ✅ Use POST to match your backend expectation

            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            console.log("userTimeZone", userTimeZone)
            const res = await axios.post(
                "https://api.sarktossbook.com/api/v1/tossbook/getNewBet",
                { userTimeZone: userTimeZone || "Asia/Kolkata" },
                { headers: { "Content-Type": "application/json" } }
            );
            if (res.data.success) {
                console.log("User ID if ", localStorage.getItem("User_Name"));
                setBets(res.data.data || []);
            } else {
                console.log("User ID else ", localStorage.getItem("User_Name"));
                setErrorMsg(res.data.message || "Failed to load bets");
            }
        } catch (error) {
            console.log("User ID catch ", localStorage.getItem("User_Name"));
            console.error("Error fetching bets:", error);
            setErrorMsg(error.response?.data?.message || "Server Error");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "win":
                return { color: "#16a34a", bg: "#dcfce7", label: "WON 🏆" };
            case "loss":
                return { color: "#dc2626", bg: "#fee2e2", label: "LOST ❌" };
            case "cancelled":
                return { color: "#374151", bg: "#f1f3f5", label: "CANCELLED" };
            default:
                return { color: "#f59e0b", bg: "#fef3c7", label: "PENDING ⏳" };
        }
    };

    if (loading)
        return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;

    if (errorMsg)
        return (


            <div style={{ textAlign: "center", marginTop: 40, color: "red" }}>
                ⚠️ {errorMsg}
            </div>
        );

    if (bets.length === 0)
        return (
            <div style={{ textAlign: "center", marginTop: 40 }}>
                No bets found for this user.
            </div>
        );

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
                padding: "20px",
            }}
        >
            {bets.map((bet) => {

                const status = getStatusColor(bet.batStatus);
                const formattedDate = bet.timeStamp
                    ? format(new Date(bet.timeStamp), "hh:mm a yyyy-MM-dd")
                    : "";

                return (
                    <div
                        key={bet.id}
                        style={{
                            borderRadius: "12px",
                            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                            padding: "16px",
                            backgroundColor: "#fff",
                            border: `1px solid ${status.bg}`,
                            transition: "transform 0.2s ease",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: status.bg,
                                    color: status.color,
                                    borderRadius: "6px",
                                    padding: "4px 10px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                }}
                            >
                                {status.label}
                            </div>
                            <div style={{ fontSize: "12px", color: "#555" }}>
                                {formattedDate}
                            </div>
                        </div>



                        {/* Match Info */}
                        <div
                            style={{
                                textAlign: "center",
                                backgroundColor: "#f9fafb",
                                padding: "12px",
                                borderRadius: "10px",
                            }}
                        >
                            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
                                {bet.teamAname || "Team A"}
                            </h3>
                            <div style={{ fontSize: "13px", color: "#888", margin: "6px 0" }}>
                                Home
                            </div>
                            <div
                                style={{
                                    borderBottom: "1px solid #e5e7eb",
                                    margin: "8px auto",
                                    width: "80%",
                                }}
                            ></div>
                            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>
                                {bet.teamBname || "Team B"}
                            </h3>
                            <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>
                                Away
                            </div>
                        </div>

                        {/* Bet Info */}
                        <div style={{ marginTop: "14px", textAlign: "center" }}>
                            <p style={{ fontSize: "13px", margin: 0 }}>
                                You bet on:{" "}
                                <span
                                    style={{
                                        backgroundColor: "#fee2e2",
                                        padding: "2px 8px",
                                        borderRadius: "6px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {bet.batteamname || "Unknown"}
                                </span>
                            </p>
                        </div>

                        {/* Amount & Rate */}
                        <div
                            style={{
                                marginTop: "14px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            <div>
                                Amount:{" "}
                                <span style={{ fontWeight: "bold" }}>₹{bet.amountOfBat || 0}</span>
                            </div>
                            <div>
                                Rate:{" "}
                                <span style={{ fontWeight: "bold", color: "#16a34a" }}>↗ {bet.tossRate || 0}</span>
                            </div>

                            <div>
                                Time:{" "}
                                <span>
                                    {bet.betEndTimeUTC
                                        ? DateTime.fromISO(bet.betEndTimeUTC).toFormat("yyyy-MM-dd hh:mm a")
                                        : "N/A"}
                                </span>
                            </div>
                        </div>







                        {/* Footer */}

                        {bet.batStatus?.toLowerCase() === "win" && (
                            <div
                                style={{
                                    backgroundColor: "#dcfce7",
                                    color: "#166534",
                                    marginTop: "14px",
                                    textAlign: "center",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    fontSize: "13px",
                                }}
                            >
                                🎉 Congratulations! You Won!
                            </div>
                        )}
                        {bet.batStatus?.toLowerCase() === "loss" && (
                            <div
                                style={{
                                    backgroundColor: "#fee2e2",
                                    color: "#991b1b",
                                    marginTop: "14px",
                                    textAlign: "center",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    fontSize: "13px",
                                }}
                            >
                                😔 Better luck next time!
                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
}




export default Test;
