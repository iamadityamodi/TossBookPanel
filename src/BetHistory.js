import React, { useEffect, useState } from "react";

import "./bethistory.css";

import { FaWallet } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";
import "./MenuTabs.css";


const BetHistory = () => {
    const [data, setData] = useState([]);

    const [activeTab, setActiveTab] = useState("wallet");

    const fetchData = async () => {

        const res = await fetch("http://10.118.166.2:8080/api/v1/tossbook/passbook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: localStorage.getItem("Login_type_name"),
                page: 1,
                limit: 10
            })
        });

        const result = await res.json();
        setData(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (



        <div className="walletContainer">

            <div className="menu-container">

                <div
                    className={`menu-item ${activeTab === "wallet" ? "active" : ""}`}
                    onClick={() => setActiveTab("wallet")}
                >
                    <FaWallet className="menu-icon" />
                    Wallet <span>(225)</span>
                </div>

                <div
                    className={`menu-item ${activeTab === "bets" ? "active" : ""}`}
                    onClick={() => setActiveTab("bets")}
                >
                    <MdOutlineTrendingUp className="menu-icon" />
                    Bets <span>(136)</span>
                </div>

            </div>

            <div className="walletHeader">
                <h2>Wallet Transactions</h2>

                <div className="cardTop">

                    <p>All deposits, withdrawals, and bet-related transactions</p>

                    <div className="sortBtn">⇅ Sort by Date</div>

                </div>

            </div>

            {data.map((item, index) => {

                const date = new Date(item.timeStamp);

                const dateStr = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                });

                const timeStr = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit"
                });

                return (

                    <div className="transactionCard" key={index}>

                        <div className="cardTop">

                            <div className="desc">
                                {item.transactionDescription}
                            </div>

                            <div className={`amount ${item.transactionType}`}>
                                {item.transactionType === "credit" ? "+" : "-"}₹{item.transactionAmount}
                            </div>

                        </div>

                        <div className="dateTime">
                            {dateStr} • {timeStr}
                        </div>

                        <div className="cardBottom">

                            <div className="team">
                                Your Bet: {item.betTeamName}
                            </div>

                            <div className="balance">
                                Balance: ₹{item.balance}
                            </div>

                        </div>

                    </div>

                );
            })}

        </div>
    );
};

export default BetHistory;