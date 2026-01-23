const CardResumo = ({ titulo, valor }) => {
    return (
      <div className="card-resumo">
        <h3>{titulo}</h3>
        <p>{valor}</p>
      </div>
    );
  };
  
  export default CardResumo;
  