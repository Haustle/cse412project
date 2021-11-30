import { getTeamComp, leagueChampPath } from "../lib/componentSnips"


export const Match = ({ redTeam, blueTeam, matchId, table}) => {

    // get the comps of redteam and blueteam
    // returns array of {name: ChampionName, role: ChampionRole}
    
    const blueComp = getTeamComp(matchId, blueTeam, table);
    const redComp = getTeamComp(matchId, redTeam, table);

    return(
        <div className="match-wrapper">
            <div className="container">

                <div className="blueTeam">
                    {blueComp.map(champ => 
                        (<img className="champ-img" src={leagueChampPath(champ.name)}/>)
                    )}
                    <div>{blueTeam}</div>
                </div>
                
                
                <div className="redTeam">
                    <div>{redTeam}</div>
                    
                    {redComp.map(champ => 
                        (<img className="champ-img" src={leagueChampPath(champ.name)} />)
                    )}
                </div>
            </div>


            <style jsx>{`
                .container{
                    display: flex;
                    justify-content: space-between;
                }
                .match-wrapper{
                    border: 1px solid white;
                    width: 900px;
                    border-radius: 10px;
                    padding: 10px;

                }
                .champ-img{
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                }
                .redTeam, .blueTeam{
                    display: flex;
                    align-items: center;
                }
                .redTeam {
                    margin-left: 20px;
                    just
                }
            `}</style>
        </div>
    )
}