import path from 'path'

export const getTeamComp = (matchId,team, table) => {

    // filter the table by the two keys
    const teamComp = table.filter(comp => comp.teamName == team && matchId == comp.matchID)[0];

    // Each of the roles below is returning the champion name
    const { top, jungle, mid, adc, support } = teamComp
    return [ 
        { name: top, role: 'Top'} , 
        { name: jungle, role: 'Jungle'},
        { name: mid, role: 'Mid'},
        { name: adc, role: 'Adc'},
        { name: support, role: 'Support'},
 ]
}


export const leagueChampPath = (initName) => {
    const imageFolder = "ChampSquares";
    const newName = initName.replace(' ', '_')
        .replace('`', '_')
        .replace("'","_")
     + "Square.png";
    return path.join(imageFolder,newName)
}
