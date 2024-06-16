import { useEffect, useState } from "react"; // Importa hooks do React
import { Link } from "react-router-dom"; // Importa o componente Link do React Router
import styles from "./ListaDeProdutos.module.scss"; // Importa o módulo de estilos SCSS
import { useSelector } from 'react-redux'; // Importa o hook useSelector do Redux
import Busca from "../Busca/Busca"; // Importa o componente Busca
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente de ícones FontAwesome
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone específico de adição
import { formatCurrency } from '../../Utils/Utils'; // Importa uma função de utilidade para formatação de moeda
import Editar from "../../../assets/img/editar.png"; // Importa a imagem de editar
import Excluir from "../../../assets/img/deletar.png"; // Importa a imagem de deletar
import Loader from '../../../assets/img/loader.png' // importa a imagem de load ao deletar um item

export default function ListaDeProdutos(){
    const [produtos, setProdutos] = useState([]); // Estado para armazenar a lista de produtos
    const [deletingId, setDeletingId] = useState(null); // Estado para rastrear o ID do produto sendo excluído

    // Seleciona a query de busca do estado global usando Redux
    const query = useSelector((state) => {
        const searchQuery = state.search.query;
        return searchQuery ? searchQuery.toLowerCase() : '';
    });

    // Função para buscar os produtos da API
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

    // Hook useEffect para buscar os produtos quando o componente é montado
    useEffect(getProdutos, [])

    // Função para deletar um produto
    function deletarProduto(id){
        setDeletingId(id); // Definir o id do produto sendo excluído
        setTimeout(() => {
            fetch(`http://localhost:5000/tabelas/`+ id, {
                method: 'DELETE',        
            })
            .then(response => {
                if(!response.ok){
                    throw new Error()
                }

                getProdutos(); // Atualiza a lista de produtos após a exclusão
            })
            .catch(error =>{
                console.log("não foi possível deletar o produto", error)
            })
            .finally(() => {
                setDeletingId(null); // Limpar o id do produto sendo excluído
            });
        }, 1000); // Atraso de 1 segundos
    }
    
    // Filtra os produtos com base na query de busca
    const filteredData = produtos.filter(d =>
        (d.id?.toLowerCase() ?? '').includes(query) ||
        (d.modelo?.toLowerCase() ?? '').includes(query) ||
        (d.cor?.toLowerCase() ?? '').includes(query)
    );

    // Retorna a classe CSS com base no status do produto
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
            {/* Cabeçalho */}
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <h2>Tabela de Motos</h2>
                </div>

                 {/* Campo de busca */}
                <div className={styles.containerbusca}>
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

            {/* Tabela de produtos */}
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
                                        <button className={styles.excluir} onClick={() => deletarProduto(produto.id)} disabled={deletingId === produto.id}>
                                            {deletingId === produto.id ? <img className={styles.loader} src={Loader} alt="loader"/> : <img src={Excluir} alt="excluir"/>}
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
