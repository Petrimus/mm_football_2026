import { Link } from "react-router-dom";
import { useData } from "../hooks/DataContext";
import styles from "./Home.module.css";

const Home = () => {
  const { data, error } = useData();

  if (error) {
    return <div className={styles.error}>Virhe: {error}</div>;
  }

  if (!data) {
    return <div className={styles.loading}>Ladataan...</div>;
  }

  const topTwo = [...data.leaderboard].sort((a, b) => b.points - a.points).slice(0, 2);

  const lastMatches = [...data.matches]
    .filter((match) => match.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const nextMatch = data.matches
    .filter((match) => match.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  let mostCommonPrediction = null;

  if (nextMatch) {
    const predictions = data.predictions.filter((p) => p.matchId === nextMatch.id);

    const countMap = {};

    predictions.forEach((p) => {
      const key = `${p.homeScore}-${p.awayScore}`;
      countMap[key] = (countMap[key] || 0) + 1;
    });

    const entries = Object.entries(countMap) as [string, number][];

    mostCommonPrediction =
      entries.reduce((best, current) => (current[1] > best[1] ? current : best), ["", 0])[0] ||
      null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>MM-kisaveikkaus 2026</h1>
      <div className={styles.grid}>
        {/* Viimeisimmät pelit */}
        <div className={styles.card}>
          <h2 className={styles.title}>Viimeisimmät pelit</h2>

          <div className={styles.list}>
            {lastMatches.map((match) => (
              <div key={match.id} className={styles.listItem}>
                <span className={styles.small}>{new Date(match.date).toLocaleDateString()}</span>

                <span className={styles.medium}>
                  {match.home} - {match.away}
                </span>

                <span className={styles.score}>
                  {match.homeScore} - {match.awayScore}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Seuraava peli */}
        <div className={styles.card}>
          <h2 className={styles.title}>Seuraava peli</h2>

          {!nextMatch ? (
            <div className={styles.centerText}>Ei tulevia pelejä</div>
          ) : (
            <div className={styles.center}>
              <div className={styles.small}>{new Date(nextMatch.date).toLocaleDateString()}</div>

              <div className={styles.medium}>
                {nextMatch.home} - {nextMatch.away}
              </div>

              <div className={styles.bigScore}>Yleisin veikkaus: {mostCommonPrediction ?? "-"}</div>
            </div>
          )}
        </div>

        {/* Top 2 */}
        <div className={styles.card}>
          <h2 className={styles.title}>Top 2</h2>

          <div className={styles.list}>
            {topTwo.map((player, index) => (
              <div key={player.name} className={styles.row}>
                <span>
                  {index === 0 && "🥇 "}
                  {index === 1 && "🥈 "}
                  {player.name}
                </span>

                <span className={styles.score}>{player.points} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigaatio */}
        <div className={styles.card}>
          <nav className={styles.nav}>
            <Link to="/matches" className={styles.navItem}>
              Matches
            </Link>

            <Link to="/leaderboard" className={styles.navItem}>
              Leaderboard
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
