import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ListaDeProdutos.module.scss"
import { useSelector } from 'react-redux';
import Busca from "../Busca/Busca";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../../Utils/Utils';
import Editar from "../../../assets/img/editar.png";
import Excluir from "../../../assets/img/deletar.png";

export default function ListaDeProdutos(){
    const [produtos, setProdutos] = useState([])
    const query = useSelector((state) => {
        const searchQuery = state.search.query;
        return searchQuery ? searchQuery.toLowerCase() : '';
      });

    function getProdutos(){
        fetch('http://localhost:5000/tabelas')
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error()
        })
        .then(data => {
            setProdutos(data)
        })
        .catch(error => {
            console.log("não foi possível obter os dados", error)
        })
    }

    useEffect(getProdutos, [])

    function deletarProduto(id){
        fetch(`http://localhost:5000/tabelas/`+ id,{
            method: 'DELETE',        
        })
        .then(response => {
            if(!response.ok){
                throw new Error()
            }

            getProdutos()
        })
        .catch(error =>{
            console.log("não foi possível deletar o produto", error)
        })
    }
    

    const filteredData = produtos.filter(d =>
        (d.id?.toLowerCase() ?? '').includes(query) ||
        (d.modelo?.toLowerCase() ?? '').includes(query) ||
        (d.cor?.toLowerCase() ?? '').includes(query)
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
        <div className={styles["lista-produtos"]}>
            {/* PARTE DE CIMA */}
            <div className={styles.nav}>
                <div className={styles.logo}>
                <h2>Tabela de Motos</h2>
                </div>

                {/* input de busca */}
                <div className="">
                    <Busca className={styles.busca}  />
                </div>

                {/* Botão para fazer um novo registro */}
                <div className={styles.registro}>
                    <Link to="/novoregistro" className={styles.registrobtn}>
                    <FontAwesomeIcon icon={faPlus} />
                        Novo registro
                    </Link>
                </div>
                
            </div>
            <hr/>

            {/* PARTE DE BAIXO COM O CARD DOS PRODUTOS */}
            <table className={styles.table}>
                <tbody className={styles.tbody}>
                    {
                        filteredData.map((produto, index) => {
                            return(
                                <tr key={index} className={styles.tcard}>
                                    <td className={styles.codigo}>{produto.id.startsWith('#') ? produto.id : `#${produto.id}`}</td>
                                    <td className={styles.modelo}>{produto.modelo}</td>
                                    <td className={styles.cor}>Cor: {produto.cor.toUpperCase()}</td>
                                    <td className={styles.valor}>Valor: {formatCurrency(parseFloat(produto.valor.replace(/\./g, '').replace(',', '.')))}</td>
                                    <td className={`${styles.status} ${getStatusClass(produto.status)}`}>{produto.status}</td>
                                    <td className={styles.excluir}>
                                        <button className={styles.excluir} onClick={()=> deletarProduto(produto.id)}>
                                            <img src={Excluir} alt="excluir"/>
                                        </button>
                                    </td>
                                    <td className={styles.editar}>
                                        <Link to={"/editar/" + produto.id}>
                                            <img src={Editar} alt="editar"/>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}