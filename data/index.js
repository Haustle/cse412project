import fs from 'fs';
import neatCsv from 'neat-csv';

const matchFile = "matches2020.csv"
const championFile = "champion_stats.csv"

export function getMatchData(){
    fs.readFile(`./data/${matchFile}`, async (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(await neatCsv(data))
    })
}

export function getChampionData(){
    fs.readFile(`./data/${championFile}`, async (err, data) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log(await neatCsv(data))
    })
}
