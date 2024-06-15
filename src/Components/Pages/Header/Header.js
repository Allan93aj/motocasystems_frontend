import styles from'./Header.module.scss'
import home from '../../../assets/img/home.png'
import user from '../../../assets/img/user.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={styles.header}>
        <div className={styles.icons}>
            <Link to="/">
                <img src={home} alt='home'/>
            </Link>
            <img src={user} alt='user'/>
        </div>
    </div>
  )
}

export default Header