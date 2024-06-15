import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditarProduto.module.scss"
import Header from "../Header/Header";

export default function EditarProduto() {

    const params = useParams()
    const [initialData, setInitialData] = useState()
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

  function getProduto(){
    fetch(`http://localhost:5000/tabelas/` + params.id)
    .then(response => {
        if(response.ok){
            return response.json()
            }
        throw new Error()
    })
    .then(data => {
        setInitialData(data)
    })
    .catch(error => {
        alert("não consigo ler os detalhes do produto" + error)
    })
  }

  useEffect(getProduto, [params.id])

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const produto = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:5000/tabelas/'+ params.id,  {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Produto editado com sucesso!');
        navigate('/');
      } else if (response.status === 400) {
        setValidationErrors(data);
      } else {
        alert('Erro ao editar produto');
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

  return (
    <div className="container">
      <div className="row">
        <Header/>
        <div className={styles.editar}>
          <h1>Editar</h1>
          <hr/>

          <div className={styles['col-form']}>
            <h2>Edite as informações que preferir! 📝</h2>
          </div>

      <div className={styles['container-form']}>
          <div className={styles.labelcodigo}>
              <label>Código</label>
              <div>
                <input disabled readOnly className="form-control-plaintext" defaultValue={params.id} />
               
              </div>
            </div>
          {
        initialData && 
            <form onSubmit={handleSubmit}>
            <div>
              <label>Modelo da Moto</label>
              <div>
                <input className="form-control" name="modelo" defaultValue={initialData.modelo}/>
                <span>{validationErrors.modelo}</span>
              </div>
            </div>
            <div>
              <label>Cor</label>
              <div>
                <input className="form-control" name="cor" defaultValue={initialData.cor}/>
                <span>{validationErrors.cor}</span>
              </div>
            </div>
            <div>
              <label>Valor</label>
              <div>
              <input type="text" className="form-control" name="valor" defaultValue={initialData.valor} onInput={handleValueChange} />
                <span>{validationErrors.valor}</span>
              </div>
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <select className="form-control" name="status"  defaultValue={initialData.status}>
                <option value="" disabled hidden>Selecione um status</option>
                <option value="Em estoque">Em estoque</option>
                <option value="Sem estoque">Sem estoque</option>
                <option value="Em trânsito">Em trânsito</option>
              </select>
              <span>{validationErrors.status}</span>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 9L10 6M10 6L13 9M10 6L10 14M10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                ATUALUZAR</button>
            </div>
          </form>
          }
        </div>
        </div>
      </div>
    </div>
  );
}
