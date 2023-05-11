import styles from './Header.module.css'
import igniteLogo from "../assents/Ignite-Logo.svg";

export function Header() { 
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logo tipo" /> 
            <span>Ignite Feed</span>
        </header>
    )

}