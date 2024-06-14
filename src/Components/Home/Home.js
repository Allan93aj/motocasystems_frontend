import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from "./Home.module.scss";
import Busca from '../Busca/Busca';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../Utils/Utils';
import Editar from "../../assets/img/editar.png"
import Excluir from "../../assets/img/deletar.png"

function Home() {
  const [data, setData] = useState([]);
  const query = useSelector((state) => state.search.query.toLowerCase());

  useEffect(() => {
    axios.get('http://localhost:5000/tabelas')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os dados:', error);
      });
  }, []);

  const filteredData = data.filter(d =>
    d.codigo.toLowerCase().includes(query) ||
    d.modelo.toLowerCase().includes(query) ||
    d.cor.toLowerCase().includes(query)
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'Em estoque':
        return styles['in-stock'];
      case 'Sem estoque':
        return styles['out-of-stock'];
      case 'Em trânsito':
        return styles['in-transit'];
      default:
        return '';
    }
  };

  return (
    <div>
      <table className={styles.tabela}>
        <thead className={styles.thead}>
          <tr className={styles.trow}>

            {/* texto logo */}
            <th className={styles.logo}>
              <h2>Tabela de Motos</h2>
            </th>
            
            {/* input de busca */}
            <Busca className={styles.busca}  />

            {/* Botão para fazer um novo registro */}
            <th className={styles.registro}>
              <Link to="/novoregistro" className={styles.registrobtn}>
              <FontAwesomeIcon icon={faPlus} /> NOVO REGISTRO
              </Link>
            </th>

          </tr>
        </thead>
        <hr/>

        {/* tabela com os cards dos produtos */}
        <tbody className={styles.tbody}>
          {
            filteredData.map((t) => (
              <tr className={styles.tcard}>
                <td className={styles.codigo}>{t.codigo.startsWith('#') ? t.codigo : `#${t.codigo}`}</td>
                <td className={styles.modelo}>{t.modelo}</td>
                <td className={styles.cor}>{t.cor}</td>
                <td className={styles.valor}>{formatCurrency(parseFloat(t.valor.replace(/\./g, '').replace(',', '.')))}</td>
                <td className={`${styles.status} ${getStatusClass(t.status)}`}>{t.status}</td>
                <td className={styles.excluir}>
                  <button>
                    <img src={Excluir}/>
                  </button>
                </td>
                <td className={styles.editar}>
                  <button>
                  <img src={Editar}/>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;
