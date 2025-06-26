import { Link } from "react-router-dom";
import React, { type MouseEvent } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { API_URL } from "../Auth/constants";
import "../layout.css"

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.log(error);
    }
  }
   return (
    <>
      <header style={{ backgroundColor: "#1e1e1e", padding: "0.75rem 1.5rem" }}>
  <nav style={{ display: "flex", justifyContent: "flex-end" }}>
    <ul style={{
      listStyle: "none",
      display: "flex",
      gap: "1.5rem",
      margin: 0,
      padding: 0,
      alignItems: "center"
    }}>
      <li>
        <Link to="/dashboard" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/me" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Profile
        </Link>
      </li>
      <li>
        <Link to="/me" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          {auth.getUser()?.username ?? ""}
        </Link>
      </li>
      <li>
        <a
          href="#"
          onClick={handleSignOut}
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          Sign out
        </a>
      </li>
    </ul>
  </nav>
</header>

      <main>{children}</main>
    </>
  );
}