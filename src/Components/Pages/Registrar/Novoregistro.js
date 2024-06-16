import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Novoregistro.module.scss' 
import Header from "../Header/Header";

export default function Novoregistro() {
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  async function checkIfIdExists(id) {
    try {
      const response = await fetch(`http://localhost:5000/tabelas/${id}`);
      return response.ok;
    } catch (error) {
      console.error('Erro ao verificar ID:', error);
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const produto = Object.fromEntries(formData.entries());

    const idExists = await checkIfIdExists(produto.id);
    if (idExists) {
      setValidationErrors({ id: 'ID já existe. Escolha outro ID.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/tabelas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalVisible(true);
      } else if (response.status === 400) {
        setValidationErrors(data);
      } else {
        alert('Erro ao cadastrar produto');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      alert("Erro ao conectar com o servidor");
    }
  }

  function formatCurrency(value) {
    return value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
      .replace(/(\d)(\d{2})$/, '$1,$2') // Adiciona a vírgula antes dos últimos 2 dígitos
      .replace(/(?=(\d{3})+(\D))\B/g, '.') // Adiciona o ponto como separador de milhar
  }

  function handleValueChange(e) {
    const { value } = e.target;
    e.target.value = formatCurrency(value);
  }
  function closeModal() {
    setIsModalVisible(false);
    navigate('/');
  }


  return (
    <div className="container">
      <Header/>
      <div className={styles.registros}>
        <div>
          <h2>Registro de Motos</h2>
          <hr/>

          <div className={styles['col-form']}>
          <h2>Preencha as informações abaixo para registrar uma Moto 🏍️</h2>
          </div>

          <div className={styles["container-form"]}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Código</label>
              <div>
                <input className="form-control" name="id" placeholder="#" required/>
                <span className={styles.idexiste}>{validationErrors.id}</span>
              </div>
            </div>
            <div>
              <label>Modelo da Moto</label>
              <div>
                <input className="form-control" name="modelo" />
                <span>{validationErrors.modelo}</span>
              </div>
            </div>
            <div>
              <label>Cor</label>
              <div>
                <input className="form-control" name="cor" />
                <span>{validationErrors.cor}</span>
              </div>
            </div>
            <div>
              <label>Valor</label>
              <div>
              <input type="text" className="form-control" name="valor"  onInput={handleValueChange} />
                <span>{validationErrors.valor}</span>
              </div>
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <select name="status" className="form-control" required>
                <option value="" enable hidden>Selecione um status</option>
                <option value="Em estoque">Em estoque</option>
                <option value="Sem estoque">Sem estoque</option>
                <option value="Em trânsito">Em trânsito</option>
              </select>
              <span>{validationErrors.status}</span>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">Registrar</button>
            </div>
          </form>
          </div>
          
        </div>
      </div>
      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Produto cadastrado com sucesso!</h2>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
