import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Spinner from './spinners'
import {ReactSortable} from 'react-sortablejs';
import { useEffect } from "react";
import { Category } from "../models/category";
export default function ProductForm ({
  _id,
  title:existingTitle,
  description:existingDescription,
  price:existingPrice,
  images:existingImages,
  category:assignedCategory,
  properties:assignedProperties,
}) {
  const [title,setTitle] = useState(existingTitle || "")
  const [description,setDescription] = useState(existingDescription || '')
  const [category,setCategory] = useState(assignedCategory || '')
  const [price,setPrice] = useState(existingPrice || '')
  const [goToProducts,setGoToProducts] = useState(false);
  const [images,setImages] = useState(existingImages || []);
  const [isuploading,setIsUploading] = useState(false);
  const [productProperties,setProductProperties] = useState(assignedProperties||{});
  const [categories,setCategories] =useState([])
  const router = useRouter();
  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data)
    })
  },[])

  async function saveProduct (ev) {
    ev.preventDefault()
    const data = {title,description,price,images,category,properties:productProperties};
    if(_id) {
      await axios.put('/api/products', {...data,_id})
    } else {
      await axios.post('/api/products', data)
    }
    setGoToProducts(true)
  }
  if (goToProducts) {
    router.push('/products')
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if(files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file',file);
      }
      console.log({data});
      const res = await axios.post('/api/upload',data)
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      })
      setIsUploading(false)
    }
  }
  function updateImagesOrder(images) {
    setImages(images)
  }
  function setProductProp(propname,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev}
      newProductProps[propname] = value;
      return newProductProps
    })
  }
  const propertiesToFill = [];
  if(categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id ===category)
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
  return (
    <form onSubmit={saveProduct}>
      <label>產品名稱</label>
      <input type="text" placeholder="產品名稱" value={title} onChange={ev => setTitle(ev.target.value)}/>
      <label>分類</label>
      <select value={category} onChange={ev => setCategory(ev.target.value)}>
        <option value="">未分類</option>
        {categories.length > 0 && categories.map(c => (
          <option value={c._id}>{c.name}</option>
        ))}
      </select>
      {propertiesToFill.length>0 && propertiesToFill.map(p => (
        <div className="">
          <label>
            {p.name}
          </label>
          <div>
            <select value={productProperties[p.name]}onChange={ev => setProductProp(p.name,ev.target.value)}>
              {p.values.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <label>照片</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable 
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}>
          {!!images?.length && images.map(link => (
            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt=""className="rounded-lg"/>
            </div>
          ))}
        </ReactSortable>
        {isuploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="cursor-pointer w-24 h-24 text-center  flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-white shadow-sm rounded-sm border border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
          </svg>
          上傳
          <input type="file" className="hidden" onChange={uploadImages}/>
        </label>
      </div>
      <textarea placeholder="介紹" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
      <input type="number" placeholder="價格" value={price} onChange={ev => setPrice(ev.target.value)}/>
      <button type="submit"className="btn-primary">儲存</button>
    </form>
  )
}