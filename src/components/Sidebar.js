const Sidebar = ({ setPage }) => {
  return (
    <div className="sidebar">
      <h2>IRON-MAN TOSS</h2>
      <p>Balance: ₹1500</p>

      <button onClick={() => setPage("Dashboard")}>Dashboard</button>
      <button onClick={() => setPage("bets")}>Bets</button>
      <button onClick={() => setPage("passbook")}>Passbook</button>
      <button>Schedule</button>
      <button>Rules</button>
      <button>Deposit / Withdraw</button>
      <button className="logout">Logout</button>
    </div>
  );
};

export default Sidebar;
