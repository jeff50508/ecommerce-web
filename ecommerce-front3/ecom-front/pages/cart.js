import Header from '../components/Header';
import Center from '../components/Center';
import { styled } from 'styled-components';
import Button from '../components/Button';
import { CartContext } from '../components/CartContext';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Input from '../components/Input';
const ColumnsWrapper = styled.div`
  display:grid;
  grid-template-columns:1fr;
  @media screen and (min-width:768px) {
    grid-template-columns:1.2fr .8fr;
  }
  gap:40px;
  margin-top:40px;
`;

const Box = styled.div`
  background-color:#fff;
  border-radius:10px;
  padding:30px;
`

const ProductInfoCell = styled.td`
  padding:10px 0;
`;

const ProductImageBox = styled.div`
  width:70px;
  height:100px;
  padding:2px;
  border:1px solid rgba(0,0,0,0.1);
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  img{
    max-width:60px;
    max-height:60px;
  }
  @media screen and (min-width:768px) {
    padding:10px;
    width:100px;
    height:100px;
    img{
      max-width:80px;
      max-height:80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding:0 15px;
  display:block;
  text-align:left;
  @media screen and (min-width:768px) {
    display:inline-block;
    padding:0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap:5px;
`;

export default function CartPage() {
  const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
  const [products,setProducts] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }



  if (isSuccess) {
    return (
      <>
        <Header/>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>感謝您的購物</h1>
              <p>商品寄出後我們將會寄信件通知您</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    )
  }

  return (
    <>
      <Header/>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>購物車</h2>
            {!cartProducts?.length && (
              <div>您的購物車是空的</div>
            )}
            {products?.length>0 && (
              <Table>
                <thead>
                  <tr>
                    <th>產品</th>
                    <th>數量</th>
                    <th>價格</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}  
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id ===product._id).length}  
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        NT${cartProducts.filter(id => id ===product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>NT${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>訂單資訊</h2>
              <Input type='text' placeholder='姓名' 
                name="name"
                value={name} 
                onChange={ev => 
                setName(ev.target.value)}/>
              <Input type='text' placeholder='信箱' 
                name="email"
                value={email} 
                onChange={ev => 
                setEmail(ev.target.value)}/>
              <Input type='text' placeholder='國家' 
                name="country"
                value={country} 
                onChange={ev => 
                setCountry(ev.target.value)}/>
              <CityHolder>
                <Input type='text' placeholder='城市' 
                  name="city"
                  value={city} 
                  onChange={ev => 
                  setCity(ev.target.value)}/>
                <Input type='text' placeholder='郵遞區號' 
                  name="postalCode"
                  value={postalCode} 
                  onChange={ev => 
                  setPostalCode(ev.target.value)}/>
              </CityHolder>
              <Input type='text' placeholder='地址'
                name="streetAddress"
                value={streetAddress} 
                onChange={ev => 
                setStreetAddress(ev.target.value)}/>
              {/* <input type='hidden' name="products" value={cartProducts.join(',')}/> */}
              <Button black block={1} 
                onClick={goToPayment}>
                前往付款
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  )
}