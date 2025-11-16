import React, { useState, useEffect } from "react";

const betmodel = ({ balance, teamName, rate, onClose, onPlaceBet }) => {
  const [stake, setStake] = useState(0);
  const [profit, setProfit] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);

  useEffect(() => {
    const profitValue = (stake * rate) / 100;
    setProfit(profitValue);
    setReturnAmount(stake + profitValue);
  }, [stake, rate]);

  const handlePlaceBet = () => {
    if (stake <= 0) {
      alert("Please enter a valid stake amount.");
      return;
    }

    if (stake > balance) {
      alert("Insufficient balance!");
      return;
    }

    const betData = {
      teamName,
      stake,
      rate,
      profit,
      totalReturn: returnAmount,
      timestamp: new Date().toISOString(),
    };

    onPlaceBet(betData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[400px] p-5 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600 font-medium">
            Balance: ₹{balance.toFixed(2)}
          </p>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>

        {/* Team Info */}
        <h2 className="text-center text-xl font-semibold mb-1">{teamName}</h2>
        <p className="text-center text-green-600 font-semibold mb-4">Rate: {rate}</p>

        {/* Stake Input */}
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(Number(e.target.value) || 0)}
          placeholder="Enter stake amount"
          className="w-full border rounded-md p-2 mb-4"
        />

        {/* Summary */}
        <div className="bg-gray-50 border rounded-lg p-3 mb-4">
          <h3 className="font-semibold mb-2">Bet Summary</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>Stake:</span> <span>₹{stake}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Profit:</span> <span className="text-green-600">₹{profit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Return:</span> <span>₹{returnAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setStake(0)}
            className="w-1/2 bg-gray-200 text-gray-800 rounded-md p-2 font-semibold hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            onClick={handlePlaceBet}
            className="w-1/2 bg-red-600 text-white rounded-md p-2 font-semibold hover:bg-red-700"
          >
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default betmodel;
