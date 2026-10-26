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
  
  // Runs this when the page is opened and reads the Product table from the DynamoDB
  useEffect(() => {
    client.models.Product.observeQuery().subscribe({
      next: (data) => setProducts([...data.items]),
    });
  }, []);

  // Is the processing logic; It keeps only the products whose name contains the search text and ignores uppercase / lowercase
  const shown = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  // const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

    
  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id })
  // }

// CAUOM WORK / EDITS

  return (
    <main>

      <div style={{display:'flex', justifyContent:'center'}}>
        <h1 style={{width:"fit-content", padding:"10px", fontFamily:"consolas"}} >Shop Prototype</h1>
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        <input onChange={(e) => setSearch(e.target.value)} id='yolo' type='search' placeholder='Search' style={{width:'25%', border:'2px solid black', borderRadius:'20px', padding:'8px'}}></input>
      </div>

      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:"99px", marginTop:"60px"}}>
        {shown.map((p) => <Product key={p.id} image={heroImg} name={p.name} price={p.price} category={p.category} stock={p.stock}/>)}
        {shown.length == 0 && <p>No products found.</p>}
      </div>

      {/* <h1>My todos</h1>
      <h2>I like pizza</h2>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)} key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div> */}
    </main>
  );
}

export default App;
