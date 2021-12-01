// import { getMatchData } from '../data/index';
import { PrismaClient } from "@prisma/client";
// import { createTeam, createMatch, createChampions } from '../lib/parseMatchData';
import { useState, useRef } from "react";
import { Match } from "../components/match";

export default function Index({ teams, matches }) {
  let teamSet = new Set();
  matches.forEach((element) => {
    const redTeam = element.redTeam;
    const blueTeam = element.blueTeam;

    teamSet.add(redTeam);
    teamSet.add(blueTeam);
  });
  // matches = matches.slice(1, 50);
  // Remove all items from set and place inside of array
  const teamArray = [...teamSet];
  let teamRef = useRef();
  const [teamName, setTeamName] = useState("All");

  const onTeamUpdate = () => {
    const selectedTeam = teamRef.current.value;
    setTeamName(selectedTeam);
  };

  console.log(teamArray);

  return (
    <div className="wrapper">
      <div className="container">
        <select onChange={() => onTeamUpdate()} ref={teamRef}>
          <option>All</option>
          {teamArray.map((team, i) => (
            <option>{team}</option>
          ))}
        </select>
        {matches.map((match, i) =>
          match.blueTeam == teamName ||
          match.redTeam == teamName ||
          teamName == "All" ? (
            <div className="mb-50" key={match.matchId}>
              <Match
                redTeam={match.redTeam}
                blueTeam={match.blueTeam}
                matchId={match.matchId}
                table={teams}
                result={match.result}
              />
            </div>
          ) : null
        )}
      </div>

      <style jsx>{`
        .container {
        }
        .wrapper {
          display: flex;
          justify-content: center;
          margin-top: 100px;
        }
        .mr-20 {
          margin-right: 20px;
        }

        .mb-50 {
          margin-bottom: 25px;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  // making prisma connection
  const prisma = new PrismaClient();

  // dont delete this, think it may break program for some reason
  // const matchData = await getMatchData();

  // check size on team Table
  const teamDB = await prisma.team.findMany();
  if (teamDB.length == 0) {
    console.log("adding teams to Teams table...");
    createTeam();
  }

  // check size on match db
  const matchDB = await prisma.match.findMany();
  if (matchDB.length == 0) {
    console.log("adding matches to Match table...");
    createMatch();
  }
  // console.log(matchDB)
  // check size on Champions table
  const champDB = await prisma.champion.findMany();
  if (champDB.length == 0) {
    console.log("adding champions to table....");
    createChampions();
  }

  // await prisma.team.deleteMany({})
  // await prisma.champion.deleteMany({})
  // await prisma.match.deleteMany({})

  // close the prisma connection
  await prisma.$disconnect();

  return {
    props: {
      // champs: champDB,
      matches: matchDB,
      teams: teamDB,
    },
  };
}
