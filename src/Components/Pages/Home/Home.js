import Header from "../Header/Header";
import ListaDeProdutos from "../ListaDeProdutos/ListaDeProdutos";

export default function Home(){
    return (
        <div className="container">
            <Header/>
            <ListaDeProdutos/>
        </div>
    )
}