import fs from 'fs';
import neatCsv from 'neat-csv';

const matchFile = "matches2020.csv"
const championFile = "champion_stats.csv"

export async function getMatchData(){
    const matchData = fs.readFileSync(`./data/${matchFile}`)
    return await neatCsv(matchData)
}

export async function getChampionData(){
    const champData = fs.readFileSync(`./data/${championFile}`);
    return await neatCsv(champData);
    
}
