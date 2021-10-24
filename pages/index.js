import prisma from '../lib/prisma'
import styles from '../styles/Home.module.css'
import { getChampionData } from '../data';

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
  getChampionData();
  
  console.log(feed);

  return {
    props: {

    }
  }
}
