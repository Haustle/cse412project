import fs from 'fs';
import path from 'path'
import neatCsv from 'neat-csv';

// file name
const newFile = "2021_LoL_esports_match_data_from_OraclesElixir_20210504.csv"
const currentPath = process.cwd();




export async function getMatchData() {
    const regions = ['KeSPA', 'LPL', 'LCK', 'LCS']
    const globalPath = path.join(currentPath, "data", newFile)
    const champData = fs.readFileSync(globalPath);
    const formatted = await neatCsv(champData);
    const majorRegions = formatted.filter(match => regions.includes(match.league) && match.gameid && match.t1p1_team && match.t2p1_team)
    return majorRegions;

}

