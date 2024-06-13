import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Novoregistro.module.scss' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function Novoregistro() {
    const [inputData, setInputData] = useState({
        codigo: "",
        modelo: "",
        cor: "",
        valor: "",
        status: ""
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/tabelas', inputData)
        .then(res => {
            alert('Criado com sucesso')
            navigate('/')
        })
    }

  return (
    <div className="body-registro">
    <div className={styles.registros}>
        <h2>Registro de Motos</h2>
        <hr />
        <div className={styles['col-form']}>
            <h2>Preencha as informações a baixo para registrar uma Moto 🏍️</h2>
            <div className={styles["container-form"]}>
                <form onSubmit={handleSubmit}>
                <label htmlFor="codigo">Código</label>
                <input type="text" name="codigo" className="form-control" placeholder="#" required
                onChange={e => setInputData({...inputData, codigo: e.target.value})}/>

                <label for="modelo">Modelo da Moto</label>
                <input type="text" name="modelo" className="form-control" required 
                 onChange={e => setInputData({...inputData, modelo: e.target.value})} />

                <label for="cor">Cor</label>
                <input type="text" name="cor" className="form-control" required
                 onChange={e => setInputData({...inputData, cor: e.target.value})}/>

                <label for="valor">Valor</label>
                <input type="text" name="valor" className="form-control" required
                 onChange={e => setInputData({...inputData, valor: e.target.value})}/>

                <label for="status">Status</label>
                <select name="status" className="form-control" required
                onChange={e => setInputData({...inputData, status: e.target.value})}>
                     <option value="" disabled hidden>
                  Selecione um status
                </option>
                <option value="Em estoque">Em estoque</option>
                <option value="Sem estoque">Sem estoque</option>
                <option value="Em trânsito">Em trânsito</option>
                </select>

                <button>
                <FontAwesomeIcon icon={faPlus} /> REGISTRAR
                </button>

                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Novoregistro