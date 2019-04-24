import React, { Component } from "react";
import axios from "axios";
import ShoppingCartIcon from "./ShoppingCartIcon.js";
import ShoppingCart from "./ShoppingCart.js";
import "./styles.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxValue: "",
      searchResults: [],
      allowTypeSearch: true,
      finalSearchId: -Infinity,
      searched: false,
      shoppingCart: [],
      total: 0
    };
  }

  componentDidMount() {
    window.addEventListener("buyItem", this.handleBuy.bind(this));
  }

  handleBuy(e) {
    const itemsToBuy = this.state.shoppingCart;
    e.detail.qtyInCart ? e.detail.qtyInCart++ : (e.detail.qtyInCart = 1);
    itemsToBuy.push(e.detail);
    this.setState({ shoppingCart: itemsToBuy }, () => {
      const newTotal = this.state.shoppingCart.reduce((acc, val) => {
        return (acc += val.price);
      }, 0);
      this.setState({ total: newTotal });
    });
  }

  handleSearchChange(e) {
    e.preventDefault();
    if (this.state.allowTypeSearch) {
      this.setState(
        { searchBoxValue: e.target.value, allowTypeSearch: false },
        () => {
          // axios.get(`http://ec2-3-17-161-19.us-east-2.compute.amazonaws.com/api/products/names/partial?name=${this.state.searchBoxValue}`)
          axios
            .get(`api/products/names/partial?name=${this.state.searchBoxValue}`)
            .then(response => {
              this.setState({
                searchResults: response.data.rows,
                allowTypeSearch: true
              });
            })
            .catch(err => console.log(err));
        }
      );
    }
  }

  handleSearch(e) {
    e.preventDefault();
    const searchParam = this.state.searchBoxValue;
    if (searchParam !== "" && this.state.searchResults.length !== 0) {
      // axios.get(`http://ec2-3-17-161-19.us-east-2.compute.amazonaws.com/api/products/names?name=${searchParam}`)
      axios
        .get(`api/products/names?name=${searchParam}`)
        .then(results => {
          this.setState({ finalSearchId: results.data.productID }, () => {
            window.dispatchEvent(
              new CustomEvent("updateProdId", {
                detail: this.state.finalSearchId
              })
            );
          });
        })
        .catch(err => console.log("error", err));
    }
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleSearch(e);
    }
  }

  handleOpenShoppingCart() {
    const isOn = document.getElementById("shopping-dropdown").style.opacity;
    if (isOn === "0" || isOn === "") {
      document.getElementById("shopping-dropdown").style.opacity = 1;
    } else {
      document.getElementById("shopping-dropdown").style.opacity = 0;
    }
  }

  handleRemoveFromCart(i) {
    let newShoppingCart = [...this.state.shoppingCart];
    newShoppingCart[i].qtyInCart--;
    newShoppingCart.splice(i, 1);
    const newTotal = newShoppingCart.reduce((acc, val) => {
      return (acc += val.price);
    }, 0);

    this.setState({ total: newTotal, shoppingCart: newShoppingCart });
  }

  render() {
    return (
      <div className="navBar">
        <div id="yeeHawEh">
          amaz<span className="eh">in</span>
        </div>
        <div className="searchField">
          <input
            className="search"
            autoComplete="off"
            list="search"
            name="search"
            type="text"
            placeholder="Search..."
            default="none"
            onChange={this.handleSearchChange.bind(this)}
            onKeyDown={this.handleEnter.bind(this)}
          />
          <datalist id="search" list="search">
            {this.state.searchResults.map(item => (
              <option value={item.name} />
            ))}
          </datalist>
          <button className="submitSearch" type="submit">
            <i
              className="fas fa-search fa-2x"
              onClick={this.handleSearch.bind(this)}
            />
          </button>
        </div>
        <ShoppingCartIcon
          handleClick={this.handleOpenShoppingCart.bind(this)}
        />
        <ShoppingCart
          shoppingCart={this.state.shoppingCart}
          itemQty={this.state.shoppingCartQty}
          total={this.state.total}
          handleRemove={this.handleRemoveFromCart.bind(this)}
        />
      </div>
    );
  }
}
