import { PrismaClient } from "@prisma/client";
import { getMatchData } from "../data";


// import match data
const matchData = await getMatchData();

export const createMatch = async () => {
    // matchId     String @id
    // redTeam     String
    // blueTeam    String
    // result      Int

    const prisma = new PrismaClient();
    const mapData = matchData.map((match) => {
        return {
            matchId: match.gameid,
            blueTeam: match.t1p1_team,
            redTeam: match.t2p1_team,
            result: match.t1_result == '1' ? 1 : 0

        }
    })

    // adding the data to the database
    await prisma.match.createMany({
        data: mapData
    })

    // release the prisma connection
    await prisma.$disconnect()
    
}


export const createTeam = async () => {
    // teamName    String
    // matchID     String 
    // top         String
    // jungle      String
    // mid         String
    // adc         String
    // support     String
    // @@id [teamName, matchID]
    let teamList = []
    const prisma = new PrismaClient();

    for(const match of matchData) {
        const {

            // team names
            gameid,
            t1p1_team,
            t2p1_team,

            // team 1 champion names
            t1p1_champion,
            t1p2_champion,
            t1p3_champion,
            t1p4_champion,
            t1p5_champion,

            // team 2 champion names
            t2p1_champion,
            t2p2_champion,
            t2p3_champion,
            t2p4_champion,
            t2p5_champion
        } = match

        if (gameid && t2p1_team && t1p1_team) {

            // adding team one
            teamList.push({
                matchID: gameid,
                teamName: t1p1_team,
                top: t1p1_champion,
                jungle: t1p2_champion,
                mid: t1p3_champion,
                adc: t1p4_champion,
                support: t1p5_champion
            })

            // adding team two
            teamList.push({
                matchID: gameid,
                teamName: t2p1_team,
                top: t2p1_champion,
                jungle: t2p2_champion,
                mid: t2p3_champion,
                adc: t2p4_champion,
                support: t2p5_champion,

            })
        }
    }

    await prisma.team.createMany({
        data: teamList
    })
    
    await prisma.$disconnect()
}


export const createChampions = async () => {

    // id          String
    // matchId     String
    // totalGold   Int
    // minionKills Int
    // kills       Int
    // deaths      Int
    // assists     Int
    // visionscore Int

    // @@id([id, matchId])

    let champList = []
    const prisma = new PrismaClient();

    // aggregating champion data in champion table schema
    for(const match of matchData){
        for (let x = 1; x <= 2; x++) {
            for (let y = 1; y <= 5; y++) {
                const player = `t${x}p${y}`
                champList.push({
                    id: match[`${player}_champion`],
                    matchId: match.gameid,
                    totalGold: parseInt(match[`${player}_totalgold`]),
                    minionKills: parseInt(match[`${player}_minionkills`]),
                    kills: parseInt(match[`${player}_kills`]),
                    deaths: parseInt(match[`${player}_deaths`]),
                    assists: parseInt(match[`${player}_assists`]),
                    visionscore: parseInt(match[`${player}_visionscore`])

                })
            }
        }
    }

    // insert data into DB
    await prisma.champion.createMany({
        data: champList
    })

    await prisma.$disconnect()
    // return champList
}