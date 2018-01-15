'use strict';

const Product = require('./../models/product');

function getProduct (req, res) {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realiza la peticion ${productId}` });
        if (!product) return res.status(404).send({ message: `El producto no existe`});
        
        return res.status(200).send({ product });
    })
}

function getProducts (req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realiza la peticion.` });
        if (!products) return res.status(404).send({ message: `No existen producto`});
        
        res.status(200).send({ products: products });  
    })
}
function saveProduct (req, res) {

  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description
  
  product.save((err, productStore) => {
    if (err) res.status(500).send({message: 'Error al salvar en la base de datos'});

    res.status(200).send({ product: productStore});
  });
}

function updateProduct (req, res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el producto ${productId}`})

        return res.status(200).send({ message: 'Producto actualizado', product: productUpdated})
    })
}


function deleteProduct (req, res) {
    let productId = req.params.productId;
    console.log('productId', productId)
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al borrar el producto ${productId}`});
        console.log('product', product);
        if (product !== undefined && product !== null) {
            product.remove(err => {
                if (err) return res.status(500).send({ message: `Error al borrar el producto ${productId}`});
                return res.status(200).send({ message: 'Producto eliminado'})
            })
        } else {
            return res.status(200).send({ message: 'No se encuentra el producto'})
        }

    })
}


module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}