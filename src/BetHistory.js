import React, { useEffect, useState } from "react";

import "./bethistory.css";
import api from "./api";

const BetHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [sortDesc, setSortDesc] = useState(true);

    useEffect(() => {
        //  const userName = localStorage.getItem("User_Name");
        //    console.log("userName", userName);
        fetchBets();
    }, []);

    const fetchBets = async () => {
        // try {
        //     const userName = localStorage.getItem("User_Name");
        //     const res = await getBetTransactions(userName);
        //     // ⚠️ adjust based on actual API response
        //     // Example: res.data OR res.result
        //     setBets(res.data || res);
        // } catch (error) {
        //     console.error("API Error:", error);
        // } finally {
        //     setLoading(false);
        // }

        const body = {
            betId: "",
            user_name: localStorage.getItem("User_Name")
        };

        // Tossbook.getAllBats(body)
        api.post("getBetTransaction", body)
            .then((response) => {
                console.log("API Response:", response.data);
                console.log(localStorage.getItem("User_ID"));

                setTransactions(response.data?.data || []);
                // setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching bats:", err.response || err);

                // setLoading(false);
            });
    };

    const sortByDate = () => {
        const sorted = [...transactions].sort((a, b) =>
            sortDesc
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );
        setTransactions(sorted);
        setSortDesc(!sortDesc);
    };

    const toNumber = (val) => {
        const n = Number(val);
        return isNaN(n) ? 0 : n;
    };


    const money = (val) => {
        return toNumber(val).toFixed(2);
    };


    return (
        <div className="wallet-container">
            <div className="wallet-header">
                <div>
                    <h2>Wallet Transactions</h2>
                    <p>All deposits, withdrawals, and bet-related transactions</p>
                </div>


                <button onClick={sortByDate} className="sort-btn">
                    ↕ Sort by Date
                </button>
            </div>


            <table className="wallet-table">
                <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Description</th>
                        <th className="right">Amount</th>
                        <th className="right">Balance</th>
                    </tr>
                </thead>


                <tbody>
                    {transactions.map((tx, index) => {
                        const isCredit = tx.amount > 0;


                        return (
                            <tr key={index}>
                                <td>
                                    <div className="date">
                                        {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </div>
                                    <div className="time">
                                        {new Date(tx.createdAt).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </div>
                                </td>


                                <td>
                                    <div className="desc-title">{tx.description}</div>
                                    {tx.teamName && (
                                        <div className="desc-sub">Team: {tx.teamName}</div>
                                    )}
                                </td>


                                <td className={`right amount ${isCredit ? "credit" : "debit"}`}>
                                    {isCredit ? "+" : "-"}₹{money(tx.amountOfBat)}
                                </td>


                                <td className="right balance">
                                    ₹{money(tx.balance)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BetHistory;