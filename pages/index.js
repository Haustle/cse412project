
import styles from '../styles/Home.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getChampionData, getMatchData } from '../data/index';
import { PrismaClient } from '@prisma/client';


export default function Index() {
    return (
      <>
        <div>Develop Heer</div>
      </>
    )
}

export async function getStaticProps(){

  // making prisma connection
  const prisma = new PrismaClient()

  // grabbing rows from champion table
  const champDB = await prisma.champion.findMany();

  
  // check to size of champion table
  if (champDB.length == 0){
    const champData = await getChampionData();

    // adding champions to the database (INSERT)
    champData.forEach(async (champ) => 
      await prisma.champion.create({
        data: {
          title: champ.id,
          content: 'im cute'
        }
      })
    )
  }
  console.log(champDB)

  // load the match from csv
  const matchData = await getMatchData();

  // close the prisma connection
  await prisma.$disconnect()

  return {
    props: {

    }
  }
}
