import React, { Component } from 'react';
import './App.css';

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }
];

class App extends Component {
  state = {
    productList: initialProductList
  }

  handleChange = (e) => {
    const productsTmp = this.state.productList
    const quantity = e.target.value ? parseInt(e.target.value) : ''
    const index = productsTmp.findIndex(p => p.id === parseInt(e.target.id))
    if (quantity === 0) {
      const remove = window.confirm("Êtes-vous sûre de vouloir supprimer cet article ?")
      remove && productsTmp.splice(index, 1)
    } else {
      productsTmp[index].quantity = quantity
    }
    this.setState({ productsList: productsTmp })
  }

  getTotal = () => {
    return this.state.productList.reduce((acc, product) => acc + (product.price * product.quantity), 0)
  }

  handleNewProduct = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addProduct = (e) => {
    e.preventDefault()
    const productsTmp = this.state.productList
    const newProduct = {
      name: this.state.newProductName,
      price: this.state.newProductPrice,
      quantity: 1,
      id: this.state.productList.reduce((acc, initVal) => acc + initVal.id + Math.floor(Math.random() * 10), 0)
    }
    productsTmp.push(newProduct)
    this.setState({ productList: productsTmp })
  }

  render() {
    const { productList } = this.state
    return (
      <div className='App'>
        <h1>Ma commande</h1>
        <table>
          <thead>
            <tr>
              <td>Produit</td>
              <td>Prix unitaire</td>
              <td>Quantité</td>
              <td>Prix total</td>
            </tr>
          </thead>
          <tbody>
            {
              productList.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <input
                      id={p.id}
                      type="number"
                      onChange={this.handleChange}
                      value={p.quantity}
                    />
                  </td>
                  <td>{p.price * p.quantity}</td>
                </tr>
              ))
            }
            <tr>
              <td>nouveau produit</td>
              <td> €</td>
              <td><input type="number" /></td>
              <td> €</td>
            </tr>
          </tbody>
        </table>
        <p>{`Montant de la commande ${this.getTotal()} €`}</p>
        <form onSubmit={this.addProduct}>
          <h2>Ajouter un produit</h2>
          <div className="field">
            <label>Nom</label>
            <input
              type="text"
              id="name"
              name="newProductName"
              onChange={this.handleNewProduct}
              require
            />
          </div>
          <div className="field">
            <label>Prix</label>
            <input
              type="number"
              id="price"
              name="newProductPrice"
              onChange={this.handleNewProduct}
              require
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    );
  }
}

export default App;
