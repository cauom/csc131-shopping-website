

function Product(props: {image: string, name: string, price: number}){
    return (
        <>

            <div className='product'>

                <div style={{display:"flex", justifyContent:"center", padding:"15px"}}>
                    <img className='image' src={props.image}/>
                </div>

                <div id='Text'>
                    <h2>{props.name}</h2>
                    <h3>${props.price}</h3>
                </div>

                <div id="Button">
                    <button> + Add to Cart</button>
                </div>
                
            </div>

            
        
        </>
    )
}

export default Product