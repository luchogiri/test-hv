import styles from './Houses.module.css';
import House from '../components/House';
import useHouses from '../hooks/useHouses';
import useScrollObserver from '../hooks/useScrollObserver';

export default function Houses() {

  const { houses, loading, error, initialLoading, nextPage } = useHouses();
  const { observer } = useScrollObserver(() => {
    if (!loading && !initialLoading) nextPage()
  });

  return (
    <section className={styles.houses}>
      {initialLoading && (
        <>
          <House loading />
          <House loading />
          <House loading />
          <House loading />
        </>
      )}

      {!!houses.length && houses.map(house => (
        <House key={house.id} {...house} />
      ))}

      <div ref={observer} />

      {loading && !initialLoading && <House loading />}
     
      {error && (
        <div style={{ color: 'red', textAlign: 'center', padding: '1rem' }}>
          Error fetching houses&nbsp;
          <a href='/'>reload</a>
        </div>
      )}
    </section>
  )
}
