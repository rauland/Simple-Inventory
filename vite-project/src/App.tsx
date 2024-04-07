import './App.css'
// My Functions
import Today from './components/title';
import GetProduct from './components/get-product';
import AddProduct from './components/add-product';

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function App() {
  
  return (
    <>
      <div className="App">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className='mt-4'>
          <ModeToggle />
        </div>
        <Today />
          <Tabs defaultValue="Add product" className="w-[350px] sm:w-[500px]">
            <TabsList>
              <TabsTrigger value="Add product">Add Product</TabsTrigger>
              <TabsTrigger value="Get product">Get Product</TabsTrigger>
            </TabsList>
            <TabsContent value="Add product">
              <AddProduct />
            </TabsContent>
            <TabsContent value="Get product">
              <GetProduct />
            </TabsContent>
          </Tabs>
        </ThemeProvider>
      </div>
    </>
  )
}

export default App
