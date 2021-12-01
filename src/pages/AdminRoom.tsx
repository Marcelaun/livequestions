import { useHistory, useParams } from "react-router-dom";

import { ReactComponent as LogoImg } from "../assets/images/livequestions-logo2.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { database } from "../services/firebase";
import { Button } from "../components/Button";
import { AdminQuestion } from "../components/AdminQuestion";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

import "../styles/admin-room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <LogoImg className="logo-img" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((admquestion) => {
            return (
              <AdminQuestion
                key={admquestion.id}
                content={admquestion.content}
                author={admquestion.author}
                isAnswered={admquestion.isAnswered}
                isHighlighted={admquestion.isHighlighted}
              >
                {!admquestion.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleCheckQuestionAsAnswered(admquestion.id)
                      }
                    >
                      <img
                        src={checkImg}
                        title="Marcar Pergunta como Respondida"
                        alt="Marcar pergunta como respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(admquestion.id)}
                    >
                      <img
                        src={answerImg}
                        title="Dar destaque a pergunta"
                        alt="Dar destaque à pergunta"
                      />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(admquestion.id)}
                >
                  <img
                    src={deleteImg}
                    title="Remover a pergunta"
                    alt="Remover pergunta"
                  />
                </button>
              </AdminQuestion>
            );
          })}
        </div>
      </main>
    </div>
  );
}
