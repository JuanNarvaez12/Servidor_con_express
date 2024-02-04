import crypto from 'crypto'
import { promises as fs } from 'fs';
export class ProductManager {
    constructor() {
        this.path = "./products.json"
        this.cont = 0;
    };

    async addProduct(title, description, price, thumbnail, stock) {
        if (!title || !description || !price || !thumbnail ||  !stock) {
            return "Todos los campos son obligatorios.";
            return;
        };
        const  product = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const nombre = product.some(prod => prod.title === title)
        if(nombre){
            return "El producto ya existe";
        }else {
            this.cont++;
            let newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail, 
                stock: stock,
                id: this.cont,
                code : crypto.randomBytes(5).toString('hex')
            };
            product.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(product))
            return "Producto agregado exitosamente.";
        };
    }
    async getProducts (){
        const  product = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return product;
    }

    async getProductById(code){
        const  product = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = product.find(prod => prod.code === code)
        return producto;
    }
    async updateProduct (code, nuevoProducto){
        const  product = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        let update = product.findIndex(prod => prod.code === code )
        if (update != -1){
            product[update].title = nuevoProducto.title
            product[update].description = nuevoProducto.description
            product[update].price = nuevoProducto.price
            product[update].thumbnail = nuevoProducto.thumbnail
            product[update].stock = nuevoProducto.stock
            await fs.writeFile(this.path,JSON.stringify(product))
            return "Actualizado correctamente";
        }else{
            return "No se pudo actualizar el producto";
        }
        
    }

    async deleteProduct (code){
        const prod = JSON.parse(await fs.readFile(this.path,'utf-8'))
        let indice = prod.findIndex(prod => prod.code === code)
        if(indice !== -1){
            prod.splice(indice, 1)
            await fs.writeFile(this.path, JSON.stringify(prod))
            return "Borrado exitosamente";
        }else {
            return "No se pudo borrar el producto";
        }
    }
}








