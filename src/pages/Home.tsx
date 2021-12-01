import { useHistory } from "react-router-dom";
import { FormEvent } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { ReactComponent as LogoImg2 } from "../assets/images/livequestions-logo2.svg";

import googleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { database } from "../services/firebase";
import { Logout } from "../components/Logout";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("A sala não existe!");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Sala fechada!.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua aundiência em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          {user ? (
            <nav className="log-out">
              <div className="main-container">
                <span className="informer">Atualmente logado(a) como</span>
                <div className="logout-info">
                  <div className="user-info">
                    <img src={user?.avatar} alt={user?.name} />
                    <span>{user?.name}</span>
                  </div>
                </div>
              </div>
              <Logout />
            </nav>
          ) : null}

          {/* <img src={Img} alt="Livequestions" /> */}
          <LogoImg2 />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
