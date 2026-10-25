import { useState } from "react";
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import coast from './assets/coast.jpg'
import './App.css'
import './Product.css'
import Product from './Product';
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

function App() {
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

  const [color, setColor] = useState("")

  function enterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter"){
      setColor(e.currentTarget.value);
    }
  }

  return (
    <main>

      <div style={{display:'flex', justifyContent:'center'}}>
        <h1 style={{width:"fit-content", padding:"10px", backgroundColor:`${color}`, fontFamily:"consolas"}} >Shop Prototype</h1>
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        <input onKeyDown={enterKey} id='yolo' type='search' placeholder='Search' style={{width:'25%', border:'2px solid black', borderRadius:'20px', padding:'8px'}}></input>
      </div>

      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:"99px", marginTop:"60px"}}>
        <Product image={heroImg} name="Bob the Block" price={12}/>
        <Product image={viteLogo} name="Eric the Block" price={15}/>
        <Product image={reactLogo} name="Josh the Block" price={21}/>
        <Product image={coast} name="Julian the Block" price={9000}/>
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
