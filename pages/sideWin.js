import { PrismaClient } from "@prisma/client";
import { useState, useRef } from "react";

const SideWR = ({ teamDB, matchDB }) => {
  const teamHistory = new Map();

  matchDB.forEach((match) => {
    const matchId = match.matchId;
    let winner = match.result == 0 ? "red" : "blue";

    // adding wins for champs on winning team
    if (!teamHistory.has(match.blueTeam)) {
      teamHistory.set(match.blueTeam, { blueW: 0, blueL: 0, redW: 0, redL: 0 });
    }
    if (!teamHistory.has(match.redTeam)) {
      teamHistory.set(match.redTeam, { blueW: 0, blueL: 0, redW: 0, redL: 0 });
    }

    if (winner == "blue") {
      teamHistory.get(match.blueTeam).blueW += 1;
      teamHistory.get(match.redTeam).redL += 1;
    } else {
      teamHistory.get(match.blueTeam).blueL += 1;
      teamHistory.get(match.redTeam).redW += 1;
    }
  });

  // get names of all champions (the names are keys)
  const uniqueTeams = [...teamHistory.keys()];

  // get object of stats based off champ name
  const getStats = (team) => {
    const bluewins = teamHistory.get(team).blueW;
    const bluelosses = teamHistory.get(team).blueL;
    const redwins = teamHistory.get(team).redW;
    const redlosses = teamHistory.get(team).redL;
    const bluepercentage = Math.round(
      (bluewins / (bluewins + bluelosses)) * 100
    );
    const redpercentage = Math.round((redwins / (redwins + redlosses)) * 100);
    return {
      team,
      bluewins,
      bluelosses,
      redwins,
      redlosses,
      bluepercentage,
      redpercentage,
    };
  };

  // new array with more stats per team
  let TeamWinPercentage = uniqueTeams.map((champ) => {
    return getStats(champ);
  });
  let TeamWinRed = uniqueTeams.map((champ) => {
    return getStats(champ);
  });
  // sorting for the highest win percentage (blue)
  TeamWinPercentage.sort((a, b) => b.bluepercentage - a.bluepercentage);

  TeamWinRed.sort((a, b) => b.redpercentage - a.redpercentage);
  // state for maintaining what champs are shown
  const [teamList, setTeamList] = useState(TeamWinPercentage);
  const [value, setValue] = useState("blue");

  const changeSort = (event) => {
    setValue(event.target.value);
    if (value == "blue") {
      setTeamList(TeamWinRed);
    } else {
      setTeamList(TeamWinPercentage);
    }
  };
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div>
        <select onChange={changeSort}>
          <option selected value="blue">
            Blue
          </option>
          <option value="red">Red</option>
        </select>
        <table style={{ textAlign: "left" }}>
          <thead style={{}}>
            <th style={{ width: "30ch", paddingBottom: "50px" }}>Team Name</th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Blue Wins
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Blue Losses
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Blue Percentage
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Red Wins
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Red Losses
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Red Percentage
            </th>
          </thead>
          <tbody>
            {teamList.map((team, i) => (
              <tr key={team.team}>
                <td>{team.team}</td>
                <td>{team.bluewins}</td>
                <td>{team.bluelosses}</td>
                <td>{team.bluepercentage}%</td>
                <td>{team.redwins}</td>
                <td>{team.redlosses}</td>
                <td>{team.redpercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <style jsx>{`
        tr:nth-child(even) {
          background-color: #393838;
        }
        td,
        th {
          border: 1px solid #393838;
        }
      `}</style>
      </div>
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

export default SideWR;
