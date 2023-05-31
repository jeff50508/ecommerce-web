import Center from "./Center"
import styled from "styled-components" 
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import { useContext } from "react";
const Bg = styled.div`
  background-color:#222;
  color:#fff;
  padding:50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width:768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap:40px;
  img{
    max-width:100%;
    max-height:200px;
    display: block;
    margin:0 auto;
  }
  div:nth-child(1) {
    order:2;
  }

  @media screen and (min-width:768px) {
    grid-template-columns: 1.1fr .9fr;
    div:nth-child(1) {
      order:0;
    }
    img{
      max-width:100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;
export default function Featured({product}) {
  const {addProduct} = useContext(CartContext)
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/'+product._id} white={1} outline={1}>閱讀更多</ButtonLink>
                <Button white primary={1} onClick={addFeaturedToCart}>
                  <CartIcon/>
                  加入購物車
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://tpc.googlesyndication.com/simgad/17822582884491141340/14763004658117789537" alt=""/>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}