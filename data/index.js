import fs from 'fs';
import path from 'path'
import neatCsv from 'neat-csv';

// file names and paths
const matchFile = "matches2020.csv"
const championFile = "champion_stats.csv"
const currentPath = process.cwd();


export async function getMatchData(){
    const globalPath = path.join(currentPath, "data", matchFile)
    const matchData = fs.readFileSync(globalPath)
    return await neatCsv(matchData)
}

export async function getChampionData(){
    const globalPath = path.join(currentPath, "data", championFile)
    const champData = fs.readFileSync(globalPath);
    return await neatCsv(champData);
    
}
