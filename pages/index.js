import prisma from '../lib/prisma'
import styles from '../styles/Home.module.css'
import { getChampionData, getMatchData } from '../data/index';

export default function Home() {
  return (
    <div className={styles.container}>
      
    </div>
  )
}

export async function getStaticProps(){

  // we're getting all champions here
  // we should be getting the matches
  const feed = await prisma.champion.findMany();

  // load the championData from csv
  const champData = await getChampionData();
  const matchData = await getMatchData();


  console.log(`Number of champions: ${champData.length}`);
  console.log(`Number of matches: ${matchData.length}`);
  
  // console.log(feed);

  return {
    props: {

    }
  }
}
