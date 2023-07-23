import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {ReactComponent as RefreshIcon } from '../../../../Resources/Icons/refresh.svg'
import {ReactComponent as EditIcon } from '../../../../Resources/Icons/edit.svg'
import {ReactComponent as AddIcon } from '../../../../Resources/Icons/add.svg'
import { PreduContext } from "../../../../PreduContext";
import axios from "axios";

const AdminProducts = () => {
  const location = useLocation()
  const { api_path, categories, updateCategories, brands, updateBrands, shop, updateShop, getAccessToken } = useContext(PreduContext)

  const [ categorySearch, setCategorySearch ] = useState("")
  const [ brandSearch, setBrandSearch ] = useState("")
  const [ productSearch, setProductSearch ] = useState("")

  const [ currentSelect, setCurrentSelect ] = useState(null)
  const [ currentType, setCurrentType ] = useState("")
  const [ modalAdd, setModalAdd ] = useState(false)
  const [ modalEdit, setModalEdit ] = useState(false)

  const [ name, setName ] = useState("")
  const [ description, setDescription ] = useState("")

  function selectEditCategory(object) {
    setCurrentSelect(object)
    setCurrentType("category")
    setName(object.name)
    setDescription(object.description)
    setModalEdit(true)
  }

  function selectEditBrand(object) {
    setCurrentSelect(object)
    setCurrentType("brand")
    setName(object.name)
    setDescription(object.description)
    setModalEdit(true)
  }

  function closeModal() {
    setCurrentSelect(null)
    setCurrentType("")
    setName("")
    setDescription("")
    setModalEdit(false)
  }

  const update = async() => {
    if (currentSelect !== null) {
      if (currentType === "category") {
        const update_api = api_path + "/api/categories/" + String(currentSelect.id)
        try {
          const updated_select = {
            name: name,
            description: description
          }
          const response = await axios.patch(update_api, updated_select, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
          window.alert(response.data.message)
        } catch (e)  {
          window.alert(e.response.data.detail)
        }
      }
      else if (currentType === "brand") {
        const update_api = api_path + "/api/brands/" + String(currentSelect.id)
        try {
          const updated_select = {
            name: name,
            description: description
          }
          const response = await axios.patch(update_api, updated_select, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
          console.log(response)
        } catch (e)  {
          console.log(e)
        }
      }

      
      refresh()
      closeModal()
    }
  }

  const deleteSelected = async() => {
    if (window.confirm("Delete?")) {
      if (currentSelect !== null) {
        if (currentType === "category") {
          const delete_api = api_path + "/api/categories/" + String(currentSelect.id)
          try {
            const response = await axios.delete(delete_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
            window.alert(response.data.message)
          } catch (e)  {
            window.alert(e.response.data.detail)
          }
        }
        else if (currentType === "brand") {
          const delete_api = api_path + "/api/brands/" + String(currentSelect.id)
          try {
            const response = await axios.delete(delete_api, {headers: {"Authorization" : `Bearer ${getAccessToken()}`}})
            window.alert(response.data.message)
          } catch (e)  {
            window.alert(e.response.data.detail)
          }
        }
      }
    }

    refresh()
    closeModal()
    
    
  }

  function formatDate(dateString) {
    if (dateString === null) {
      return "N/A";
    }

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if day is a single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is a single digit
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  const _getNameByID = (array, id) => {
    for (let i in array) {
      if (array[i]["id"] === id) {
        return array[i]["name"]
      }
    }
    return ""
  }

  const refresh = async() => {
    const categories_refresh = await (await axios.get(api_path + "/api/categories/")).data
    const brands_refresh = await (await axios.get(api_path + "/api/brands/")).data
    const products_refresh = await (await axios.get(api_path + "/api/products/")).data

    for (let i in categories_refresh) {
      let brand_ids = await (await axios.get(api_path + "/api/categories/brands/" + String(categories_refresh[i]["id"]))).data;
      categories_refresh[i]["brand_ids"] = brand_ids
      let brands = []
      for (let n in brand_ids) {
        brands.push(_getNameByID(brands_refresh, brand_ids[n]))
      }
      categories_refresh[i]["brands"] = brands    
    }

    for (let i in products_refresh) {
      products_refresh[i]["category"] = _getNameByID(categories_refresh, products_refresh[i]["category_id"]);
      products_refresh[i]["brand"] = _getNameByID(brands_refresh, products_refresh[i]["brand_id"])
    }

    updateCategories(categories_refresh)
    updateBrands(brands_refresh)
    updateShop(products_refresh)
  }

  return (
    <div className="admin-products">
      <div className="categories">
        <h1>Categories ({categories.length})</h1>

        <input type="text" className="search-bar" placeholder="Search ..." value={categorySearch} onChange={(e)=>{setCategorySearch(e.target.value)}}/>
      
        <div className="table-container">
          <table>
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Create</th>
                <th>Update</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category)=>{
                if ((String(category.id) + " " +
                  String(category.name)).toLowerCase().includes(categorySearch.toLowerCase())) {
                    return (
                      <tr key={category.id}>
                        <td className="center">{category.id}</td>
                        <td className="left">{category.name}</td>
                        <td className="left">{category.description}</td>
                        <td className="right">{formatDate(category.created_at)}</td>
                        <td className="right">{formatDate(category.updated_at)}</td>
                        <td className="center">
                          <button onClick={()=>{selectEditCategory(category)}}>
                            <EditIcon className="icon"/>
                          </button>
                        </td>
                      </tr>
                    )
                  }
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="btns-container">
        <button>
          <AddIcon className="icon"/>
        </button>
        <button onClick={refresh}>
          <RefreshIcon className="icon"/>
        </button>
      </div>

      <div className="seperator"></div>

      <div className="brands">
        <h1>Brands ({brands.length})</h1>

        <input type="text" className="search-bar" placeholder="Search ..." value={brandSearch} onChange={(e)=>{setBrandSearch(e.target.value)}}/>
      
        <div className="table-container">
          <table>
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Create</th>
                <th>Update</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {brands.map((brand)=>{
                if ((String(brand.id) + " " +
                  String(brand.name)).toLowerCase().includes(brandSearch.toLowerCase())) {
                    return (
                      <tr key={brand.id}>
                        <td className="center">{brand.id}</td>
                        <td className="left">{brand.name}</td>
                        <td className="left">{brand.description}</td>
                        <td className="right">{formatDate(brand.created_at)}</td>
                        <td className="right">{formatDate(brand.updated_at)}</td>
                        <td className="center" onClick={()=>{selectEditBrand(brand)}}>
                          <button><EditIcon className="icon"/></button>
                        </td>
                      </tr>
                    )
                  }
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="btns-container">
        <button>
          <AddIcon className="icon"/>
        </button>
        <button onClick={refresh}>
          <RefreshIcon className="icon"/>
        </button>
      </div>

      <div className="seperator"></div>

      <div className="products">
        <h1>Products ({shop.length})</h1>

        <input type="text" className="search-bar" placeholder="Search ..." value={productSearch} onChange={(e)=>{setProductSearch(e.target.value)}}/>
      
        <div className="table-container">
          <table>
            <thead>
              <tr className="table-header">
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Category ID</th>
                <th>Brand</th>
                <th>Brand ID</th>
                <th>Description</th>
                <th>In Stock</th>
                <th>Cost</th>
                <th>Create</th>
                <th>Update</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {shop.map((product)=>{
                if ((String(product.id) + " " +
                  String(product.name) + " " +
                  String(product.category) + " " +
                  String(product.brand) + " " +
                  String(product.description) + " " +
                  String(product.stock) + " " +
                  String(product.cost)).toLowerCase().includes(productSearch.toLowerCase())) {
                    return (
                      <tr key={product.id}>
                        <td className="center">{product.id}</td>
                        <td className="center">
                          <img src={product.image} alt="Image" />
                        </td>
                        <td className="left">{product.name}</td>
                        <td className="center">{product.category}</td>
                        <td className="center">{product.category_id}</td>
                        <td className="center">{product.brand}</td>
                        <td className="center">{product.brand_id}</td>
                        <td className="left">{product.description}</td>
                        <td className="right">{product.stock_quantity}</td>
                        <td className="right">{product.cost_per_unit.toLocaleString("en-US")} VND</td>
                        <td className="right">{formatDate(product.created_at)}</td>
                        <td className="right">{formatDate(product.updated_at)}</td>
                        <td className="center">
                          <button><EditIcon className="icon"/></button>
                        </td>
                      </tr>
                    )
                  }
              })}
            </tbody>
          </table>
        </div>
      
      </div>

      <div className="btns-container">
        <button>
          <AddIcon className="icon"/>
        </button>
        <button onClick={refresh}>
          <RefreshIcon className="icon"/>
        </button>
      </div>

      {modalEdit && (
        <div className="modal">
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <h2>Edit {currentType} {currentSelect.id}</h2>
            
            <form>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}
              placeholder={currentSelect.name}/>
              <label htmlFor="description">Description</label>
              <input type="text" id="description" value={description} onChange={(e)=>setDescription(e.target.value)}
              placeholder={currentSelect.description}/>
            </form>

            <div className="buttons-container">
              <button className="update" onClick={update}>Update</button>
              <button className="delete" onClick={deleteSelected}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) 
}

export default AdminProducts