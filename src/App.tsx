import { useState, useEffect } from "react";
import heroImg from './assets/hero.png'
import './App.css'
import './Product.css'
import Product from './Product';

// CAUOM WORK / EDITS

// For the db testing
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// client is created which is an object that lets us communicate with the db
// <Schema> allows us to read models such as Todo and Product which was created and tested before integrating it.
const client = generateClient<Schema>();

function App() {
  // Products loaded from db
  const [products, setProducts] = useState<Array<Schema["Product"]["type"]>>([]);
  // What the user types in the search bar
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState<number>(9000);
  const [category, setCategory] = useState("");
  
  // Runs this when the page is opened and reads the Product table from the DynamoDB
  useEffect(() => {
    client.models.Product.observeQuery().subscribe({
      next: (data) => setProducts([...data.items]),
    });
  }, []);

  // Is the processing logic; It keeps only the products whose name contains the search text and ignores uppercase / lowercase
  const shown = products.filter((p) => (p.name.toLowerCase().startsWith(search.toLowerCase()) && Number(p.price) <= Number(price) && p.category?.includes(category)));

  // useEffect(() => {
  //   fetch("https://csc131-shopping-website-production.up.railway.app/")
  //   .then(response => response.json())
  //   .then(data => setTitle(data))
  // })

// CAUOM WORK / EDITS

  return (
    <main>

      {/* Filter Menu */}
      <div id="filter-menu">
        <form action="">
          {/* Price Range Input */}
          <label htmlFor="">Price Range (1-9000)</label><br />
          <label htmlFor="">$ </label>
          
          <input type="number" name="" id="" defaultValue={price} min={1} max={9000} onChange={(e) => {
            setPrice(Number(e.target.value))
            }}/><br />


          <label htmlFor="">Category</label><br />
          {/* Category Options */}
          <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
            <option value="Electronics">Electronics</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
          </select>
        </form>
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        <h1 style={{width:"fit-content", paddingTop:"0px", fontFamily:"Arial"}} >Shopping Website</h1>
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        <input onChange={(e) => setSearch(e.target.value)} id='yolo' type='search' placeholder='Search' style={{width:'25%', border:'2px solid black', borderRadius:'20px', padding:'8px'}}></input>
      </div>

      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:"99px", marginTop:"60px"}}>
        {shown.map((p) => <Product key={p.id} image={heroImg} name={p.name} price={p.price} category={p.category} stock={p.stock}/>)}
        {shown.length == 0 && <p>No products found.</p>}
      </div>

    </main>
  );
}

export default App;
