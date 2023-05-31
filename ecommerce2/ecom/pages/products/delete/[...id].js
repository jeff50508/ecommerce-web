import Layout from "../../../components/layout";
import {useRouter} from "next/router"
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo,setProductInfo] = useState();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get ('/api/products?id=' + id).then(response => {
        setProductInfo(response.data)
      })
    }
  },[id])
  function goBack() {
    router.push('/products');
  }
  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id);
    goBack()
  }
  return (
    <Layout>
      <h1 className="text-center ">你確定要刪除產品:&nbsp;"{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>是</button>
        <button className="btn-default"onClick={goBack}>否</button>
      </div>
    </Layout>
  )
}