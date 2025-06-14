import'../layout/layout.css';
import { Link } from "react-router-dom";
import DarkModeToggle from "../layout/darkmode";

interface DefaultLayoutProps {
    children: React.ReactNode;
}
export default function DefaultLayout({children}: DefaultLayoutProps){
return(

    
    <>
    <header>
        <nav>
            <ul>
                <li>
                <Link to="/">Iniciar sesion</Link>
                </li>
                <li>
                <Link to="/signup">Registro</Link>
                </li>
                <li>
                <Link to="/dashboard">Pagina Principal</Link>
                </li>
                <DarkModeToggle />                
            </ul>
        </nav>

    </header>

    <main>
        {children}
    </main>
    </>
);

}