import { PrismaClient } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import { leagueChampPath } from "../lib/componentSnips";

export default function roleCount({ teamDB }) {
  let topArr = [];
  let jungleArr = [];
  let midArr = [];
  let adcArr = [];
  let supportArr = [];

  let topMap = new Map();
  let jungleMap = new Map();
  let midMap = new Map();
  let adcMap = new Map();
  let supportMap = new Map();

  teamDB.forEach((element) => {
    const { top, jungle, mid, adc, support } = element;

    topArr.push(top);
    jungleArr.push(jungle);
    midArr.push(mid);
    adcArr.push(adc);
    supportArr.push(support);
  });

  topArr.forEach((champion) => {
    if (!topMap.has(champion)) {
      topMap.set(champion, { count: 0 });
    }
    topMap.get(champion).count += 1;
  });

  jungleArr.forEach((champion) => {
    if (!jungleMap.has(champion)) {
      jungleMap.set(champion, { count: 0 });
    }
    jungleMap.get(champion).count += 1;
  });

  midArr.forEach((champion) => {
    if (!midMap.has(champion)) {
      midMap.set(champion, { count: 0 });
    }
    midMap.get(champion).count += 1;
  });

  adcArr.forEach((champion) => {
    if (!adcMap.has(champion)) {
      adcMap.set(champion, { count: 0 });
    }
    adcMap.get(champion).count += 1;
  });

  supportArr.forEach((champion) => {
    if (!supportMap.has(champion)) {
      supportMap.set(champion, { count: 0 });
    }
    supportMap.get(champion).count += 1;
  });

  let [champList, setChampList] = useState([]);
  let category = useRef();

  const getCounts = (champ, selectedMap) => {
    const uses = selectedMap.get(champ).count;
    return { champ, uses };
  };

  // get object of stats based off champ name
  const processChoice = (userInput) => {
    let uniqueChamps = [...topMap.keys()];
    let ChampRoleUse = uniqueChamps.map((champ) => {
      return getCounts(champ, topMap);
    });

    if (userInput == "Top") {
      uniqueChamps = [...topMap.keys()];
      ChampRoleUse = uniqueChamps.map((champ) => {
        return getCounts(champ, topMap);
      });
    } else if (userInput == "Jungle") {
      uniqueChamps = [...jungleMap.keys()];
      ChampRoleUse = uniqueChamps.map((champ) => {
        return getCounts(champ, jungleMap);
      });
    } else if (userInput == "Mid") {
      uniqueChamps = [...midMap.keys()];
      ChampRoleUse = uniqueChamps.map((champ) => {
        return getCounts(champ, midMap);
      });
    } else if (userInput == "Adc") {
      uniqueChamps = [...adcMap.keys()];
      ChampRoleUse = uniqueChamps.map((champ) => {
        return getCounts(champ, adcMap);
      });
    } else {
      uniqueChamps = [...supportMap.keys()];
      ChampRoleUse = uniqueChamps.map((champ) => {
        return getCounts(champ, supportMap);
      });
    }

    return ChampRoleUse;
  };

  const changeCat = () => {
    const userInput = category.current.value;

    let chosenRole = processChoice(userInput);

    chosenRole.sort((a, b) => b.uses - a.uses);

    setChampList(chosenRole);
  };

  useEffect(() => {
    changeCat();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <select ref={category} onChange={() => changeCat()}>
          <option>Top</option>
          <option>Jungle</option>
          <option>Mid</option>
          <option>Adc</option>
          <option>Support</option>
        </select>
        <table style={{ textAlign: "left" }}>
          <thead style={{}}>
            <th style={{ width: "50px", paddingBottom: "10px" }}></th>
            <th style={{ width: "30ch", paddingBottom: "10px" }}>Name</th>
            <th style={{ paddingBottom: "10px" }}>uses</th>
          </thead>
          <tbody>
            {champList.map((champ, i) => (
              <tr key={champ.champ}>
                <td>
                  <img
                    className="champ-img"
                    src={leagueChampPath(champ.champ)}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{champ.champ}</td>
                <td>{champ.uses}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <style jsx>{`
          tr:nth-child(even) {
            background-color: #393838;
          }
        `}</style>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const teamDB = await prisma.team.findMany();

  await prisma.$disconnect();

  return {
    props: {
      teamDB,
    },
  };
}
