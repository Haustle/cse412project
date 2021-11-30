import { PrismaClient } from "@prisma/client";
import { useState, useRef } from "react";
import { leagueChampPath } from "../lib/componentSnips";

const Champ = ({ teamDB, matchDB }) => {
  const champHistory = new Map();

  matchDB.forEach((match) => {
    const matchId = match.matchId;
    let winner;
    let loser;
    winner = match.result == 0 ? match.redTeam : match.blueTeam;
    loser = match.result == 0 ? match.blueTeam : match.redTeam;

    const winComp = teamDB.filter(
      (team) => team.matchID == matchId && team.teamName == winner
    )[0];
    const loseComp = teamDB.filter(
      (team) => team.matchID == matchId && team.teamName == loser
    )[0];

    // comps of winning and losing team
    const winCompList = Object.values(winComp).slice(-5);
    const loseCompList = Object.values(loseComp).slice(-5);

    // adding wins for champs on winning team
    winCompList.forEach((champ) => {
      if (!champHistory.has(champ)) {
        champHistory.set(champ, { win: 0, lose: 0 });
      }
      champHistory.get(champ).win += 1;
    });

    // add losses for champs on losing team
    loseCompList.forEach((champ) => {
      if (!champHistory.has(champ)) {
        champHistory.set(champ, { win: 0, lose: 0 });
      }
      champHistory.get(champ).lose += 1;
    });
  });

  // get names of all champions (the names are keys)
  const uniqueChamps = [...champHistory.keys()];

  // get object of stats based off champ name
  const getStats = (champ) => {
    const wins = champHistory.get(champ).win;
    const losses = champHistory.get(champ).lose;
    const percentage = Math.round((wins / (wins + losses)) * 100);
    return { champ, wins, losses, percentage, total: wins + losses };
  };

  // new array with more stats per champ
  let ChampWinPercentage = uniqueChamps.map((champ) => {
    return getStats(champ);
  });

  // sorting for the highest win percentage
  ChampWinPercentage.sort((a, b) => b.percentage - a.percentage);

  // state for maintaining what champs are shown
  const [champList, setChampList] = useState(ChampWinPercentage);
  let searchRef = useRef();

  const sortByInput = () => {
    const userInput = searchRef.current.value;
    if (userInput) {
      const filterList = ChampWinPercentage.filter((champ) =>
        champ.champ.toLowerCase().startsWith(userInput.toLowerCase())
      );
      setChampList(filterList);
    } else {
      setChampList(ChampWinPercentage);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "30px",
      }}
    >
      <input
        type="search"
        ref={searchRef}
        onChange={() => sortByInput()}
        style={{ marginBottom: "30px" }}
      />
      <table style={{ textAlign: "left" }}>
        <thead style={{}}>
          <th style={{ paddingBottom: "50px" }}>Name</th>
          <th style={{ width: "30ch", paddingBottom: "50px" }}></th>
          <th style={{ paddingBottom: "50px" }}>Wins</th>
          <th style={{ paddingBottom: "50px" }}>Loss</th>
          <th style={{ paddingBottom: "50px" }}>Percentage</th>
        </thead>
        <tbody>
          {champList.map((champ, i) => (
            <tr key={champ.champ}>
              <td>
                <img
                  className="champ-img"
                  src={leagueChampPath(champ.champ)}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{champ.champ}</td>

              <td>{champ.wins}</td>
              <td>{champ.losses}</td>
              <td>{champ.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        tr:nth-child(even) {
          background-color: #393838;
        }
      `}</style>
    </div>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const teamDB = await prisma.team.findMany();
  const matchDB = await prisma.match.findMany();

  // console.log(champHistory)

  // console.log(matchDB)

  await prisma.$disconnect();

  return {
    props: {
      teamDB,
      matchDB,
    },
  };
}

export default Champ;
