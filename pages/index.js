import React, { Component } from 'react'
import prisma from '../lib/prisma'
import styles from '../styles/Home.module.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { getChampionData } from '../data';

export default class extends Component {
  render () {
    return (
      <>
      <div>Develop Heer</div>
      </>
    )
  }
}

export async function getStaticProps(){

  // we're getting all champions here
  // we should be getting the matches
  const feed = await prisma.champion.findMany();
  // getChampionData();
  
  console.log(feed);

  return {
    props: {

    }
  }
}
