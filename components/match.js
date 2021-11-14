import { getTeamComp, leagueChampPath } from "../lib/componentSnips"


export const Match = ({ redTeam, blueTeam, matchId, table}) => {

    const blueComp = getTeamComp(matchId, blueTeam, table);

    const redComp = getTeamComp(matchId, redTeam, table);

    return(
        <>
            <div className="flex">
                <div className="blueTeam">
                    {blueComp.map(champ => (<img className="champ-img" src={leagueChampPath(champ.name)}/>))}
                    <div>{blueTeam}</div>
                </div>
                <div className="redTeam">
                    <div>{redTeam}</div>
                    {redComp.map(champ => (<img className="champ-img" src={leagueChampPath(champ.name)} />))}
                </div>
                {matchId}
            </div>
            <style jsx>{`
                .champ-img{
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                }
                .flex{
                    display: flex;
                }
                .redTeam, .blueTeam{
                    display: flex;
                }
                .redTeam {
                    margin-left: 20px;
                }
            `}</style>
        </>
    )
}