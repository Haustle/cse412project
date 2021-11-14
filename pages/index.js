import { getMatchData } from '../data/index';
import { PrismaClient } from '@prisma/client';
import { createTeam, createMatch, createChampions } from '../lib/parseMatchData';

export default function Index({champs, teams, matches}) {
  console.log(matches)
    return (
      <>
        {matches.map((match, i) => (
          <div className="mb-50">
            <div>
              <span className="mr-20">{match.matchId}</span>
            </div>

            <div>
              <span className="mr-20">{match.redTeam}</span>
              <span className="mr-20">{match.blueTeam}</span>
              <span className="mr-20">{match.result}</span>
            </div>
            
          </div>
        ))}
        {champs.map((champ,i) => (<div key={champ}>{champ.id} {i}</div>))}
        
        <div>Develop Heer</div>

        <style jsx>{`
          .mr-20{
            margin-right: 20px;
          }

          .mb-50{
            margin-bottom: 50px;
          }
        `}</style>
      </>
    )
}

export async function getStaticProps(){

  // making prisma connection
  const prisma = new PrismaClient()

  // dont delete this, think it may break program for some reason
  const matchData = await getMatchData();


  // check size on team Table
  const teamDB = await prisma.team.findMany();
  if(teamDB.length == 0){
    console.log('adding teams to Teams table...')
    createTeam()
  }

  // check size on match db
  const matchDB = await prisma.match.findMany();
  if(matchDB.length == 0){
    console.log('adding matches to Match table...')
    createMatch()
  }
  console.log(matchDB)
  // check size on Champions table
  const champDB = await prisma.champion.findMany();
  if(champDB.length == 0){
    console.log('adding champions to table....')
    createChampions();
  }

  // await prisma.team.deleteMany({})
  // await prisma.champion.deleteMany({})
  // await prisma.match.deleteMany({})

  // close the prisma connection
  await prisma.$disconnect()

  return {
    props: {
      champs: champDB,
      matches: matchDB,
      teams: teamDB
    }
  }
}
