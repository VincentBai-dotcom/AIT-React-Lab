
function Card(prop){

    return(
        <div className= {["card",prop.show ? prop.face : "cardBack"].join(" ")} onClick = {prop.hold ? () => {} : prop.toggleCard}>
        
        </div>
    )
}

export default Card;