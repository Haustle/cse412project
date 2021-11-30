import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="nav">
      <div>
        <span style={{ marginRight: "20px" }}>
          <Link href="/">
            <a>Matches</a>
          </Link>
        </span>

        <span style={{ marginRight: "20px" }}>
          <Link href="/champWin">
            <a>Champ Win</a>
          </Link>
        </span>

        <span style={{ marginRight: "20px" }}>
          <Link href="/sideWin">
            <a>Team Win Percentage</a>
          </Link>
        </span>

        <span style={{ marginRight: "20px" }}>
          <Link href="/roleCount">
            <a>Most Played Champions</a>
          </Link>
        </span>

        <span style={{ marginRight: "20px" }}>
          <Link href="/teamChampion">
            <a>Team's Most Played Champions</a>
          </Link>
        </span>
      </div>

      <style jsx>{`
        span {
          padding: 10px;
          border-radius: 10px;
          background-color: #2c2c2c;
          transition: 0.2s all;
        }

        span:hover {
          background-color: #212121;
        }

        .nav {
          margin-bottom: 50px;
          margin-top: 60px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
