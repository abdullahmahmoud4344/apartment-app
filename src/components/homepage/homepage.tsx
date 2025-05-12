import classes from "./homepage.module.css";
export default function HomePage() {
  return (
    <section className={classes.homepageContentWrapper} title="Apartments">
      <div className={classes.mainSearchWrap}>
        <h1 className={classes.mainTile}>Discover Your New Home</h1>
        <p>Helping 100 million renters find their perfect fit.</p>
        <input
          type="text"
          placeholder="Search for apartments"
          className={classes.searchInput}
        />
      </div>
    </section>
  );
}
