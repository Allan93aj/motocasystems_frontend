// src/components/Busca/Busca.js
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../../redux/actions/searchActions';
import styles from './Busca.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Busca = () => {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.search.query);
  
    const handleInputChange = (e) => {
      dispatch(setSearchQuery(e.target.value));
    };
  
    return (
      <div className={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} />
        <input 
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar por código, modelo ou cor"
          className={styles.searchInput}
        />
      </div>
    );
  };

export default Busca;
