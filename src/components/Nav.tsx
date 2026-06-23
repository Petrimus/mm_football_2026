import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        Home
      </Link>

      <button onClick={() => window.history.back()} className={styles.link}>
        Back
      </button>
    </div>
  );
};

export default Nav;
