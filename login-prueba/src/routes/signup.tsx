import { useState } from "react";
import DefaultLayout from "../layout/defaultlayout";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate} from "react-router-dom";
import { API_URL } from "../Auth/constants";
import type { AuthResponseError } from "../types/types";

export default function Signup(){
    const [name, setName] = useState("");
     const [Username, setUserName] = useState("");
     const [Lastname, setLastName] = useState("");
      const [Password, setPassword] = useState("");
      const [PasswordConfirm, setPasswordconfirm] = useState("");
      const [FechaNac, setFechaNac] = useState("");
      const [email, setEmail] = useState("");
      const [sexo,setSexo] = useState("");
      const [errorResponse, setErrorResponse] = useState("");

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSexo(event.target.value);
  };

      const auth = useAuth();
      const goTo = useNavigate();
       async function handlesubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                Lastname,
                Username,
                Password,
                PasswordConfirm,
                FechaNac,
                email,
                sexo

            }),
        });

        if (response.ok) {
            console.log("Usuario registrado exitosamente");
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
        <h1>Registro</h1>
        { !! errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>

        <label>Apellidos</label>
        <input type="text" value={Lastname} onChange={(e)=> setLastName(e.target.value)} />
            <p>
         <label>Sexo</label>
          <input type="radio" name="myRadio" value="M" checked ={sexo ==='M'} onChange ={handleChange} />
          Masculino
        <input type="radio" name="myRadio" value="F" checked ={sexo === 'F'} onChange={handleChange}/>
          Femenino
            </p>
        <label>E-Mail</label>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} />

        <label>Fecha de nacimiento</label>
        <input type="date" value={FechaNac} onChange={(e)=> setFechaNac(e.target.value)} />

        <label>Nombre de Usuario</label>
        <input type="text" value={Username} onChange={(e)=> setUserName (e.target.value)}/>

        <label>Contraseña</label>
        <input type="password" value={Password} onChange={(e)=> setPassword (e.target.value)} />
        

        <label>Confirmar Contraseña</label>
        <input type="password" value={PasswordConfirm} onChange={(e)=> setPasswordconfirm (e.target.value)} />
        <button>Registrame</button>
        </form>
        </DefaultLayout>
        
        );
       
}