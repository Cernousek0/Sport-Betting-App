import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";
import { signIn, useSession} from "next-auth/react";
import { signOut } from "next-auth/react";
import Nav from "~/common/modules/components/Nav/Nav";
import { getToken } from "next-auth/jwt";

const Test: NextPage = () => {
    const { data } = useSession();


    const [name, setName] = useState("lakatos");
    const [email, setEmail] = useState("mamka@kar.cz");
    const [password, setPassword] = useState("j");

    const [kar, setKar] = useState("");

    const {mutateAsync, error} = api.user.register.useMutation();

    const signUp = async () =>{
        
        const response = await mutateAsync({
            email: email, 
            password: password,
            name: name,
          });
    }

    const SignIn = async () => {
        const result = await signIn('credentials', {
          email: email,
          password: password,
          redirect: false,
        });
        if (result?.ok) {
          return alert('Logged in!');
        }
        return alert('Failed to log in');
      }

      

    return (
        <>
        <Nav></Nav>    
        <div className="flex justify-center items-center h-full flex-col">
            <h1 className="text-blue-800">Login</h1>
            <div className="flex flex-col">
                <input className="border border-black rounded" type="text" placeholder="email" />
                <input className="border border-black rounded" type="text" placeholder="password" />
                <button className="border border-yellow-300" onClick={async () => {await SignIn()}}>Log In</button>
            </div>
            <h1 className="text-blue-800">Register</h1>
            <div className="flex flex-col">
                <input className="border border-black rounded" type="text" placeholder="email" />
                <input className="border border-black rounded" type="text" placeholder="password" />
                <button className="border border-yellow-300" onClick={async () => {await signUp()}}>Register</button>
            </div>
            Vitejte {data?.user.name}

            <button onClick={async () => { await signOut({ callbackUrl: 'http://localhost:3000/signoutpagesos' }) }}>Log out</button>
            
          </div>
          </>
        )
}

export default Test;