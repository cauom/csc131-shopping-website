

function Product(props: {image: string, name: string, price: number, category?: string | null, stock?: number}){
    return (
        <>
            // This is the card template containing the product's image, name, cost, category, and stock amount
            <div className='product'>
                // Image Section
                <div style={{display:"flex", justifyContent:"center", padding:"15px"}}>
                    <img className='image' src={props.image}/>
                </div>

                // Text Section
                <div id='Text'>
                    <h2>{props.name}</h2>
                    <h3>${props.price}</h3>
                    <p>Category: {props.category}</p>
                    <p>Stock: {props.stock}</p>
                </div>

                // Add-to-Cart Button
                <div id="Button">
                    <button> + Add to Cart</button>
                </div>
                
            </div>

            
        
        </>
    )
}

export default Product
