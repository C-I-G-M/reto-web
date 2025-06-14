import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import DefaultLayout from "../layout/defaultlayout";
import { useState } from "react";
import { API_URL } from "../Auth/constants";
import type { AuthResponseError } from "../types/types";

export default function Login(){

     const [Username, setUserName] = useState("");
      const [Password, setPassword] = useState("");
      const auth = useAuth();
      const [errorResponse, setErrorResponse] = useState("");
      const goTo = useNavigate();

      async function handlesubmit (e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

     try{
            const response = await fetch(`${API_URL}/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username,
                Password,
                

            }),
        });

        if (response.ok) {
            console.log("Usuario validado exitosamente");
            setErrorResponse("");

            goTo("/");
        }
        else {
            console.log("Algo salio mal al registrar el usuario");
            const json = await response.json() as AuthResponseError;
            setErrorResponse(json.body.error);
            return;
        }
    }catch(error){
            console.log(error);
        }

      }



      if (auth.IsAuthenticated){
        return <Navigate to = "/Dashboard"/>

      }

      

    return(
        <DefaultLayout>
        <form className="form" onSubmit={handlesubmit}>
        <h1>Iniciar Sesion</h1>
        { !! errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Nombre de Usuario</label>
        <input type="text" value={Username} onChange={(e)=> setUserName (e.target.value)} />

        <label>Contraseña</label>
        <input type="password" value={Password} onChange={(e)=> setPassword (e.target.value)}/>
        <button>Iniciar sesion</button>
        </form>
        </DefaultLayout>
   
    );
}