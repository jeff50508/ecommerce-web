import Layout from "../../../components/layout";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../../components/productform";

export default function EditProductPage () {
  const [productInfo, setProductsInfo] = useState(null)
  const router = useRouter();
  const {id} =router.query;
  useEffect(() => {
    if(!id) {
      return ;
    }
    axios.get('/api/products?id=' +id).then(response => {
      setProductsInfo(response.data)
    })
  },[id])
  return (
    <Layout>
      <h1>編輯產品</h1>
      {productInfo && (
        <ProductForm {...productInfo}/>
      )}
    </Layout>
  )
}