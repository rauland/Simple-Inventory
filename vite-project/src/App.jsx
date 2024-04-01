import './App.css'
import Today from './components/title';
import GetProduct from './components/getproduct';
import AddProduct from './components/addproduct';

function App() {
  
  return (
    <div className="App">
      <Today />
      <AddProduct />
      <GetProduct />
    </div>
  )
}

export default App
