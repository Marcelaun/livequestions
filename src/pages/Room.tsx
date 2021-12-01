import { FormEvent, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as LogoImg } from "../assets/images/livequestions-logo2.svg";
import exitImg from "../assets/images/log-out.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function Room() {
  const Filter = require("bad-words");
  const filter = new Filter();
  const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  const [questionLimit, setQuestionLimit] = useState<number>(0);
  const [newQuestion, setNewQuestion] = useState("");

  const { title, questions } = useRoom(roomId);

  const newBadWords = [
    "Anus",
    "Baba-ovo",
    "Babaovo",
    "Babaca",
    "Bagos",
    "Baitola",
    "Bebum",
    "Besta",
    "Bicha",
    "Bisca",
    "Bixa",
    "Boazuda",
    "Boceta",
    "Boco",
    "Boiola",
    "Bolagato",
    "Boquete",
    "Bolcat",
    "Bosseta",
    "Bosta",
    "Bostana",
    "Brioco",
    "Bronha",
    "Buceta",
    "Bunda",
    "Bunduda",
    "Burra",
    "Burro",
    "Busseta",
    "Cadela",
    "Caga",
    "Cagado",
    "Cagao",
    "Cagona",
    "Canalha",
    "Caralho",
    "Casseta",
    "Cassete",
    "Checheca",
    "Chereca",
    "Chibumba",
    "Chibumbo",
    "Chifruda",
    "Chifrudo",
    "Chota",
    "Chochota",
    "Chupada",
    "Chupado",
    "Clitoris",
    "Cocaina",
    "Coco",
    "Corna",
    "Corno",
    "Cornuda",
    "Cornudo",
    "Cretina",
    "Cretino",
    "Cruz-credo",
    "Cu",
    "Culhao",
    "Curalho",
    "Cuzao",
    "Cuzuda",
    "Cuzudo",
    "Debil",
    "Debiloide",
    "Defunto",
    "Difunto",
    "Doida",
    "Doido",
    "Egua",
    "Escrota",
    "Escroto",
    "Fedida",
    "Fedido",
    "Fedorenta",
    "Feiosa",
    "Feioso",
    "Feioza",
    "Feiozo",
    "Felacao",
    "Foda",
    "Fodao",
    "Fode",
    "Fodida",
    "Fodido",
    "Fornica",
    "Fudendo",
    "Fudecao",
    "Fudida",
    "Fudido",
    "Furão",
    "Furnica",
    "Furnicar",
    "Furona",
    "Gaiata",
    "Gaiato",
    "Gay",
    "Gonorrea",
    "Gonorreia",
    "Gosma",
    "Gosmenta",
    "Gosmento",
    "Grelinho",
    "Grelo",
    "Idiota",
    "Imbecil",
    "Iscrota",
    "Iscroto",
    "Ladra",
    "Ladroeira",
    "Ladrona",
    "Lalau",
    "Leprosa",
    "Leproso",
    "Lésbica",
    "Macaca",
    "Macaco",
    "Machona",
    "Machorra",
    "Manguaca",
    "Mangua",
    "Masturba",
    "Meleca",
    "Merda",
    "Mija",
    "Mijada",
    "Mijado",
    "Mijo",
    "Mocrea",
    "Mocreia",
    "Moleca",
    "Moleque",
    "Mondronga",
    "Mondrongo",
    "Naba",
    "Nadega",
    "Olhota",
    "Otaria",
    "Ot-ria",
    "Otario",
    "Ot-rio",
    "Paca",
    "Paspalha",
    "Paspalhao",
    "Paspalho",
    "Pau",
    "Peia",
    "Peido",
    "Pemba",
    "Pênis",
    "Pentelha",
    "Pentelho",
    "Perereca",
    "Peru",
    "Pica",
    "Picao",
    "Pilantra",
    "Piranha",
    "Piroca",
    "Piroco",
    "Piru",
    "Porra",
    "Prega",
    "Prostibulo",
    "Prost-bulo",
    "Prostituta",
    "Prostituto",
    "Punheta",
    "Punhetao",
    "Pus",
    "Pustula",
    "Puta",
    "Puto",
    "Puxa-saco",
    "Puxasaco",
    "Rabao",
    "Rabo",
    "Rabuda",
    "Rabudao",
    "Rabudo",
    "Rabudona",
    "Racha",
    "Rachada",
    "Rachadao",
    "Rachadinha",
    "Rachadinho",
    "Rachado",
    "Ramela",
    "Remela",
    "Retardada",
    "Retardado",
    "Ridícula",
    "Rola",
    "Rolao",
    "Roludo",
    "Roluda",
    "Roludona",
    "Roludao",
    "Rolinha",
    "Rosca",
    "Sacana",
    "Safada",
    "Safado",
    "Safadona",
    "Safadao",
    "Sapatao",
    "Sifilis",
    "Siririca",
    "Tarada",
    "Taradona",
    "Taradao",
    "Tarado",
    "Tezao",
    "Tezuda",
    "Tezudo",
    "Trocha",
    "Trolha",
    "Troucha",
    "Trouxa",
    "Troxa",
    "Vaca",
    "Vagabunda",
    "Vagabundo",
    "Vagina",
    "Veada",
    "Veadao",
    "Veado",
    "Viada",
    "Víado",
    "Viadao",
    "Xavasca",
    "Xerereca",
    "Xexeca",
    "Xibiu",
    "Xibumba",
    "Xota",
    "Xochota",
    "Xoxota",
    "Xana",
    "Xaninha",
  ];

  filter.addWords(...newBadWords);

  filter.clean(
    "AnusBaba-ovoBabaovoBabacaBacuraBagosBaitolaBebumBestaBichaBiscaBixaBoazudaBocetaBocoBoiolaBolagatoBoqueteBolcatBossetaBostaBostanaBrechaBrexaBriocoBronhaBucaBucetaBundaBundudaBurraBurroBussetaCachorraCachorroCadelaCagaCagadoCagaoCagonaCanalhaCaralhoCassetaCasseteChechecaCherecaChibumbaChibumboChifrudaChifrudoChotaChochotaChupadaChupadoClitorisCocainaCocoCornaCornoCornudaCornudoCorruptaCorruptoCretinaCretinoCruz-credoCuCulhaoCuralhoCuzaoCuzudaCuzudoDebilDebiloideDefuntoDemonioDifuntoDoidaDoidoEguaEscrotaEscrotoEsporradaEsporradoEsporroEstupidaEstupidezEstupidoFedidaFedidoFedorFedorentaFeiaFeioFeiosaFeiosoFeiozaFeiozoFelacaoFendaFodaFodaoFodeFodidaFodidoFornicaFudendoFudecaoFudidaFudidoFuradaFuradoFurãoFurnicaFurnicarFuroFuronaGaiataGaiatoGayGonorreaGonorreiaGosmaGosmentaGosmentoGrelinhoGreloHomo-sexualHomossexualHomossexualIdiotaIdioticeImbecilIscrotaIscrotoJapaLadraLadraoLadroeiraLadronaLalauLeprosaLeprosoLésbicaMacacaMacacoMachonaMachorraManguacaMangua¦aMasturbaMelecaMerdaMijaMijadaMijadoMijoMocreaMocreiaMolecaMolequeMondrongaMondrongoNabaNadegaNojeiraNojentaNojentoNojoOlhotaOtariaOt-riaOtarioOt-rioPacaPaspalhaPaspalhaoPaspalhoPauPeiaPeidoPembaPênisPentelhaPentelhoPererecaPeruPicaPicaoPilantraPiranhaPirocaPirocoPiruPorraPregaProstibuloProst-buloProstitutaProstitutoPunhetaPunhetaoPusPustulaPutaPutoPuxa-sacoPuxasacoRabaoRaboRabudaRabudaoRabudoRabudonaRachaRachadaRachadaoRachadinhaRachadinhoRachadoRamelaRemelaRetardadaRetardadoRidículaRolaRolinhaRoscaSacanaSafadaSafadoSapataoSifilisSiriricaTaradaTaradoTestudaTezaoTezudaTezudoTrochaTrolhaTrouchaTrouxaTroxaVacaVagabundaVagabundoVaginaVeadaVeadaoVeadoViadaVíadoViadaoXavascaXererecaXexecaXibiuXibumbaXotaXochotaXoxotaXanaXaninha"
  );
  console.log(filter.isProfane(newQuestion));

  useEffect(() => {
    setQuestionLimit(Number(window.localStorage.getItem("questionLimit")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("questionLimit", String(questionLimit));
  }, [questionLimit]);

  useEffect(() => {
    const interval = 300000;

    function reset() {
      console.log("passei por aqui");
      localStorage.endTime = +new Date() + interval;
      console.log("passei por aqui");
    }

    if (questionLimit === 5) {
      if (!localStorage.endTime) {
        reset();
      }

      const setIntervalId = setInterval(function () {
        let remaining = localStorage.endTime - Number(new Date());
        if (remaining >= 0) {
          console.log(Math.floor(remaining / 1000));
        } else {
          setQuestionLimit(0);
          reset();
          clearInterval(setIntervalId);
        }
      }, 100);
    }
  }, [questionLimit]);
  console.log("limite de questões", questionLimit);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    if (!user) {
      await signInWithGoogle();
    }

    history.push(`/rooms/${roomId}`);
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("Você precisar entrar com sua conta google!");
    }

    const question = {
      author: {
        name: user.name,
        avatar: user.avatar,
        id: user.id,
      },
      content: newQuestion,
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
    setQuestionLimit(questionLimit + 1);
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <LogoImg className="logo-img" />
          <RoomCode code={params.id} />
          <img
            src={exitImg}
            alt="Sair da sala"
            id="exit"
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            maxLength={170}
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          {questionLimit === 5 ? (
            <p className="question-warning">
              Wow! você perguntou bastante!, mas para organizar melhor, aguarde
              5 min para que outros também possam perguntar!
            </p>
          ) : null}

          {filter.isProfane(newQuestion) ? (
            <p className="profane-warning">
              Ops! nada de palavrão nas perguntas!
            </p>
          ) : null}

          <div className="form-footer">
            {user?.isLoggedIn ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar ou interagir com uma pergunta,{" "}
                <button onClick={handleSignIn}>faça seu login</button>.
              </span>
            )}

            <Button
              type="submit"
              disabled={
                !user?.isLoggedIn ||
                questionLimit === 5 ||
                filter.isProfane(newQuestion)
              }
            >
              Enviar Pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                userId={user?.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`like-button ${question.likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                    disabled={!user?.isLoggedIn}
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
