import styles from './Header.module.css';

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header className={styles.header}>
      <h1>{children}</h1>
    </header>
  )
}