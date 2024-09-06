import React, { Component } from 'react';
import styles from './cycle.module.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      categories: [],
      searchResults: [],
      selectedCategory: null,
      params: {
        limit: 9,
        skip: 0,
      },
    };
    this.prevSkip = 0; // Track the previous skip value
  }

  async componentDidMount() {
    // Fetch categories and initial products
    await this.fetchCategories();
    await this.fetchProducts(this.state.params);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.params.skip !== prevState.params.skip) {
      await this.fetchProducts(this.state.params);
    }
    if (this.state.selectedCategory !== prevState.selectedCategory) {
      if (this.state.selectedCategory) {
        await this.fetchProductsByCategory(this.state.selectedCategory);
      } else {
        await this.fetchProducts(this.state.params);
      }
    }
  }

  async fetchProducts(params) {
    const { limit = 10, skip = 0 } = params;
    try {
      this.setState({ loading: true });
      const result = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const data = await result.json();
      this.setState({ products: data.products });
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async fetchCategories() {
    try {
      const result = await fetch('https://dummyjson.com/products/category-list');
      const data = await result.json();
      this.setState({ categories: data });
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  }

  async fetchProductsByCategory(category) {
    try {
      this.setState({ loading: true });
      const result = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await result.json();
      this.setState({ products: data.products });
    } catch (error) {
      console.log('Error fetching products by category:', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async searchProducts(query) {
    try {
      const result = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await result.json();
      this.setState({ searchResults: data.products });
    } catch (error) {
      console.log('Error searching products:', error);
    }
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  }

  handleSearch = (query) => {
    this.searchProducts(query);
  }

  handleCreateNewProduct = () => {
    // Define the action for creating a new product
    // For example, you might navigate to a new page or open a modal
    console.log('Create new product button clicked');
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <div>
          <input
            type="text"
            placeholder="Search products"
            onChange={(e) => this.handleSearch(e.target.value)}
          />
          {this.state.searchResults.length > 0 && (
            <div className={styles.productsContainer}>
              {this.state.searchResults.map((item, idx) => (
                <div key={idx} className={styles.productsItem}>
                  <img
                    className={styles.productsItemCover}
                    src={item.images?.[0]}
                    alt={`product-cover-${idx}`}
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
          {this.state.loading ? (
            "loading..."
          ) : (
            <div className={styles.productsContainer}>
              {this.state.products?.map((item, idx) => (
                <div key={idx} className={styles.productsItem}>
                  <img
                    className={styles.productsItemCover}
                    src={item.images?.[0]}
                    alt={`product-cover-${idx}`}
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.paginationContainer}>
          <button
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: Math.max(state.params.skip - 9, 0),
                },
              }))
            }
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: state.params.skip + 9,
                },
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Products;
