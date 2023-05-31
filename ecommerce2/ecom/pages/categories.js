import { useState,useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios"
import { withSwal } from 'react-sweetalert2';
function Categories ({swal}) {
  const [name,setName] = useState('');
  const [parentCategory,setParentCategory] = useState('')
  const [categories,setCategories] = useState([])
  const [editedCategory,setEditedCategory] = useState(null)
  const [properties,setProperties] = useState([])
  useEffect(() => {
    fetchCategories();
  },[])
  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    
    const data = {
      name,
      parentCategory,
      properties:properties.map(p =>({
        name:p.name,
        values:p.values.split(','),
      }))
    }
    // console.log(data)
    if(editedCategory) {
      data._id = editedCategory._id
      await axios.put('/api/categories',data)
      setEditedCategory(null)
    } else {
      await axios.post ('/api/categories', data);
    }
    setName('');
    setParentCategory('')
    setProperties([])
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id)
    setProperties(category.properties.map(({name,values}) => ({
      name,
      values:values.join(','),
    })))
  }
  function deleteCategory(category) {
    swal.fire({
      title: '你確定嗎？',
      text: `你確定要刪除${category.name}嗎？`,
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '是的，刪除',
      confirmButtonColor: '#d55',
      reverseButtons:true
  }).then(async result => {
      if(result.isConfirmed) {
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id)
        fetchCategories();
      }
      console.log({result})
  });
  }
  function addProperty() {
    setProperties(prev => {
      return [...prev,{name:'',values:''}]
    });
  }
  function handlePropertyNameChange(index,property,newName) {
    console.log({index,property,newName})
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    })
  }
  function handlePropertyValuesChange(index,property,newValues) {
    console.log({index,property,newValues})
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    })
  }
  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return[...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      })  
    })
  }
  return (
    <Layout>
      <h1>分類</h1>
      <label>{editedCategory ? `編輯分類${editedCategory.name}`:"建立新分類"}</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text" placeholder={'分類名稱'}
            onChange={ev => setName(ev.target.value)}
            value={name}/>
          <select onChange={ev => setParentCategory(ev.target.value)}value={parentCategory}>
            <option value="">no parent</option>
            {categories.length > 0 && categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">特色</label>
          <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">
              增加新的特色
          </button>
          {properties.length > 0 && properties.map((property,index) => (
            <div className="flex gap-1 mb-2">
              <input className="mb-0" type="text" onChange={ev =>handlePropertyNameChange(index,property,ev.target.value)}value={property.name}placeholder="特性名稱(例如:顏色)"/>
              <input className="mb-0" type="text" onChange={ev =>handlePropertyValuesChange(index,property,ev.target.value)} value={property.values}placeholder="數值，以逗號分隔"/>
              <button type="button" onClick={() =>removeProperty(index)} className="btn-red w-28">移除</button>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button type="button" onClick={() => {
              setEditedCategory(null);
              setName('');
              setParentCategory('')
              setProperties([])
              }}
              className="btn-default">取消  
            </button>
          )}
          <button type="submit" className="btn-primary py-1">儲存</button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>分類名稱</td>
              <td>類別</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 && categories.map(category => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button onClick={() => editCategory(category)}className="btn-default mr-1">編輯</button>
                  <button onClick={() => deleteCategory(category)}className="btn-red">刪除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}
export default withSwal (({swal}, ref) => (
  <Categories swal={swal}/>
  )
)