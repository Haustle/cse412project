
import styles from '../styles/Home.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getMatchData } from '../data/index';
import { PrismaClient } from '@prisma/client';
import { createTeam, createMatch, createChampions } from '../lib/parseMatchData';

export default function Index({champs, teams, matches}) {
    return (
      <>
        {champs.map((champ,i) => (<div>{champ.id} {i}</div>))}
        <div>Develop Heer</div>
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
      mathes: matchDB,
      teams: teamDB
    }
  }
}
