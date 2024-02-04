import express from 'express'
import { ProductManager } from './config/main.js'

const app = express()
const PORT = 8000
const productManager = new ProductManager()



app.get('/products', async (req,res) => {
    const { limit } = req.query
    const prod = await productManager.getProducts()
    if (parseInt(limit)){
        const prodLimit = prod.slice(0 , limit)
        res.send(prodLimit)
    }else{
        res.send(prod)
    }
})


app.get('/product/:pcode', async (req,res)=>{
    const codeProducto = req.params.pcode
    const prod = await productManager.getProductById(codeProducto)
    if (prod){
        res.send(prod) 
    }else {
        res.send("El producto no existe")
    }
    
})

app.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`)
})