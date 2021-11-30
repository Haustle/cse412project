import { PrismaClient } from "@prisma/client";
import { useState, useRef } from "react";
import { leagueChampPath } from "../lib/componentSnips";

const TeamChapmion = ({ teamDB, matchDB }) => {
  const teamHistory = new Map();

  matchDB.forEach((match) => {
    const matchId = match.matchId;
    let winner = match.result == 0 ? "red" : "blue";

    // adding wins for champs on winning team
    if (!teamHistory.has(match.blueTeam)) {
      teamHistory.set(match.blueTeam, {});
    }
    if (!teamHistory.has(match.redTeam)) {
      teamHistory.set(match.redTeam, {});
    }

    let redCompList = teamDB.filter(
      (team) => team.matchID == matchId && team.teamName == match.redTeam
    )[0];
    let blueCompList = teamDB.filter(
      (team) => team.matchID == matchId && team.teamName == match.blueTeam
    )[0];

    redCompList = Object.values(redCompList).slice(-5);
    blueCompList = Object.values(blueCompList).slice(-5);

    redCompList.forEach((champ) => {
      if (!teamHistory.get(match.redTeam)[champ]) {
        teamHistory.get(match.redTeam)[champ] = 1;
      } else {
        teamHistory.get(match.redTeam)[champ]++;
      }
    });
    blueCompList.forEach((champ) => {
      if (!teamHistory.get(match.blueTeam)[champ]) {
        teamHistory.get(match.blueTeam)[champ] = 1;
      } else {
        teamHistory.get(match.blueTeam)[champ]++;
      }
    });
  });

  // get names of all teams (the names are keys)
  const uniqueTeams = [...teamHistory.keys()];

  // get object of stats based off team name
  const getStats = (team) => {
    let firstChamp = "";
    let firstChampCount = 0;
    for (const [key, value] of Object.entries(teamHistory.get(team))) {
      if (value > firstChampCount) {
        firstChamp = key;
        firstChampCount = value;
      }
    }
    return {
      team,
      firstChamp,
      firstChampCount,
    };
  };

  let TeamChampRate = uniqueTeams.map((team) => {
    return getStats(team);
  });
  // state for maintaining what champs are shown
  const [teamList, setTeamList] = useState(TeamChampRate);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <table style={{ textAlign: "left" }}>
          <thead style={{}}>
            <th style={{ width: "30ch", paddingBottom: "50px" }}>Team Name</th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Champion Icon
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Most Used Champ
            </th>
            <th style={{ paddingBottom: "50px", paddingRight: "10px" }}>
              Play Count
            </th>
          </thead>
          <tbody>
            {teamList.map((team, i) => (
              <tr key={team.team}>
                <td>{team.team}</td>
                <td>
                  <img
                    className="champ-img"
                    src={leagueChampPath(team.firstChamp)}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{team.firstChamp}</td>
                <td>{team.firstChampCount}</td>
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

export default TeamChapmion;
