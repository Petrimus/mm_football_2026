import { useData } from "../hooks/DataContext";
import Nav from "./Nav";
import styles from "./Matches.module.css";

const Matches = () => {
  const { data, error } = useData();

  if (error) {
    return <div className={styles.error}>Virhe: {error}</div>;
  }

  if (!data) {
    return <div className={styles.loading}>Ladataan...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Matches</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pvm</th>
              <th>Ottelu</th>
              <th className={styles.center}>Tulos</th>
              <th className={styles.center}>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.matches.map((match) => {
              const hasScore = match.homeScore !== null && match.awayScore !== null;

              return (
                <tr key={match.id} className={styles.row}>
                  <td>{match.date}</td>

                  <td>
                    {match.home} - {match.away}
                  </td>

                  <td className={`${styles.center} ${styles.bold}`}>
                    {hasScore ? `${match.homeScore} - ${match.awayScore}` : "-"}
                  </td>

                  <td className={`${styles.center} ${styles.small}`}>{match.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Nav />
    </div>
  );
};

export default Matches;
