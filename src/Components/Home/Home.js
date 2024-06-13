import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from "./Home.module.scss"


function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
       axios.get('http://localhost:5000/tabelas')
       .then(res => {
        setData(res.data);
       })
       .catch(error => {
        console.error('Houve um erro ao buscar os dados:', error);

      });
      }, []);
        
  return (
    <div>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>
                        <h2>Tabela de Motos</h2>
                    </th>
                    <th>
                        <input placeholder='Buscar por código, nome e cor'/>
                    </th>
                    
                    <th>
                        <Link to="/novoregistro">
                            + NOVO REGISTRO
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody className='container-fluid'>
                {
                     data.map((d, i)=> {
                        return (
                            <div>
                                <tr>
                                    <td>{d.codigo.startsWith('#') ? d.codigo : `#${d.codigo}`}</td>
                                    <td>{d.modelo}</td>
                                    <td>{d.cor}</td>
                                    <td>{d.valor}</td>
                                    <td>{d.status}</td>
                                    <td>
                                        <button>excluir</button>
                                    </td>
                                    <td>
                                        <button>Editar</button>
                                    </td>
                                </tr>
                            </div>
                            
                        )
                     })
                }
            </tbody>

        </table>
    </div>
  )
}

export default Home