
import "../layout/layout.css";
import Switch from '../components/boton';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="nav-left">
                    
                    </div>
                    <div className="nav-right">
                        <Switch />
                    </div>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </>
    );
}