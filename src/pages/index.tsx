import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Router from "next/router";

import Layout from "~/common/modules/components/Layout/layout";
import LatestBets from "~/common/modules/components/Bets/LatestBets";
import AllGames from "~/common/modules/components/Games/AllGames";
import MyBets from "~/common/modules/components/Bets/MyBets";
import { useState } from "react";


export default function Home() {

  const { data } = useSession();

  const id = "erfhurzh14erweio";
  const gameById = api.game.getGameById.useQuery(id);

  const betMutation =  api.bet.createBet.useMutation();
  const gameMutation = api.game.createGame.useMutation();

  const [showMyBets, setShowMyBets] = useState(false);


  const userId = data?.user?.id ?? "-";


 

  const createGame = async () => {
    const sport = "Soccer";
    const team1Name = "Team 1";
    const team2Name = "Team 2";
    const startTime = new Date().toISOString();
    const odds = 1.5;

    const response = await gameMutation.mutateAsync({
      sport: sport,
      team1Name: team1Name,
      team2Name: team2Name,
      startTime: startTime,
      odds: odds,
    });
    Router.reload();
  }
  return (
    <>
      <Head>
        <title>Chcípni ty zmrde</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/OBROVSKY-DICK-RAMBONE.jpg" />
      </Head>

    <Layout>
        <div>
          {showMyBets ?
          <>
            <LatestBets></LatestBets>
            <AllGames></AllGames> 
          </>
     
            :
            <MyBets></MyBets>
        }
    
          <button onClick={async () => { await createGame()}}>Create game</button> 
          <br></br>
          <button onClick={() => { setShowMyBets(!showMyBets) }}>My Bets Toggle</button>
        </div>
    </Layout>
    </>
  );
}
