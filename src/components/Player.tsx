import { useParams } from "react-router-dom";
import { useData } from "../hooks/DataContext";
import Nav from "./Nav";
import styles from "./Player.module.css";

const Player = () => {
  const { name } = useParams();
  const { data, error } = useData();

  if (error) {
    return <div className={styles.error}>Virhe: {error}</div>;
  }

  if (!data) {
    return <div className={styles.loading}>Ladataan...</div>;
  }

  const decodedName = decodeURIComponent(name || "");

  const player = data.leaderboard.find((p) => p.name === decodedName);

  const playerPredictions = data.predictions.filter((p) => p.player === decodedName);

  const tournamentPrediction = data.tournamentPredictions?.find((t) => t.player === decodedName);

  if (!player) {
    return <div className={styles.loading}>Pelaajaa ei löytynyt</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{player.name}</h1>

      {/* perustiedot */}
      <div className={styles.info}>
        <div className={styles.infoItem}>
          Pisteet: <span>{player.points}</span>
        </div>
        <div className={styles.infoItem}>
          Sija: <span>{player.rank}</span>
        </div>
      </div>

      {/* veikkaukset */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Veikkaukset</h2>

        <div className={styles.list}>
          {playerPredictions.map((p, i) => {
            const match = data.matches.find((m) => m.id === p.matchId);

            return (
              <div key={i} className={styles.listItem}>
                <span>{match ? `${match.home} - ${match.away}` : `Ottelu #${p.matchId}`}</span>

                <span className={styles.score}>
                  {p.homeScore} - {p.awayScore} ({p.points !== null ? `${p.points} pts` : "-"})
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Turnausveikkaus */}
      {tournamentPrediction && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Turnausveikkaus</h2>

          <div className={styles.tournament}>
            <div>🥇 {tournamentPrediction.winner}</div>
            <div>🥈 {tournamentPrediction.second}</div>
            <div>🥉 {tournamentPrediction.third}</div>
            <div>4. {tournamentPrediction.fourth}</div>

            <div className={styles.topScorer}>
              ⚽ Maalikuningas: {tournamentPrediction.topScorer}
            </div>
          </div>
        </div>
      )}

      <Nav />
    </div>
  );
};

export default Player;
