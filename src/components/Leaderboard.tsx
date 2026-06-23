import Nav from "../components/Nav";
import { useData } from "../hooks/DataContext";
import { useNavigate } from "react-router-dom";
import styles from "./Leaderboard.module.css";

const Leaderboard = () => {
  const { data, error } = useData();
  const navigate = useNavigate();

  if (error) {
    return <div className={styles.error}>Virhe: {error}</div>;
  }

  if (!data) {
    return <div className={styles.loading}>Ladataan...</div>;
  }

  const sorted = [...data.leaderboard].sort((a, b) => b.points - a.points);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Pelaaja</th>
              <th className={styles.right}>Pisteet</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((player, index) => (
              <tr
                key={player.name}
                className={styles.row}
                onClick={() => navigate(`/player/${encodeURIComponent(player.name)}`)}
              >
                <td className={styles.cell}>{index + 1}</td>

                <td className={styles.cell}>
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {index === 2 && "🥉 "}
                  {player.name}
                </td>

                <td className={`${styles.cell} ${styles.right}`}>{player.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Nav />
    </div>
  );
};

export default Leaderboard;
