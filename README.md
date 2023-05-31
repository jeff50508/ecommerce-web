# ecommerce-web
simple ecommerce-web made by next.js

__使用套件如下__  
import styled,{css} from "styled-components"   
import {mongooseConnect} from '../lib/mongoose'  
import axios from 'axios';  
const stripe = require('stripe')(process.env.STRIPE_SK);  
import NextAuth,{getServerSession} from 'next-auth'  
import GoogleProvider from 'next-auth/providers/google'  
import {MongoDBAdapter} from '@next-auth/mongodb-adapter'  
import clientPromise from '../../../lib/mongodb'  

  
  __本專案由Next.js@13.0.1製作分為購物網站及後台兩部份，購物網站使用styled-component切版後台則使用tailwind，具備RWD效果。利用axios串接，next-auth進行google驗證，兩個部份的資料利用mongodb交換，可及時獲得最新資訊__  
  
  ## 後台
  
  # GoogleOath登入  
  ![1](https://github.com/jeff50508/ecommerce-web/assets/111333990/cff16e54-0bff-48a9-9e21-8173927a81d3)
  
  
  # 登入後頁面，包含登出功能
  ![2](https://github.com/jeff50508/ecommerce-web/assets/111333990/11978ceb-7a77-4b69-b1d9-b32e89acf2e8)


  # 點擊左側導覽列中產品選項即可選擇新增、刪除、增加新產品
  ![3](https://github.com/jeff50508/ecommerce-web/assets/111333990/44cbc75f-670d-4af8-9ee6-064fc86b4308)
  ![5](https://github.com/jeff50508/ecommerce-web/assets/111333990/2bc28152-7639-4550-b277-67dfbf591922)
  ![4](https://github.com/jeff50508/ecommerce-web/assets/111333990/1a78c8ab-7a9d-4a2b-a4e2-2d127c657bd5)

  
  # 點擊左側導覽列中分類選項即可選擇新增、刪除、增加新分類
  ![6](https://github.com/jeff50508/ecommerce-web/assets/111333990/c80e71f4-75ec-4347-b6b0-bb453e515230)
  ![7](https://github.com/jeff50508/ecommerce-web/assets/111333990/88042cbc-095f-4cce-a127-c4a2ff0b7e87)
  ![8](https://github.com/jeff50508/ecommerce-web/assets/111333990/c9205ac8-1253-4d82-8132-fbb91150e200)

  
  # 點擊左側導覽列中分類選項，可獲取目前所有訂單狀況(包含消費者資訊、商品內容、刷卡授權時間)
  ![10](https://github.com/jeff50508/ecommerce-web/assets/111333990/851ef008-21aa-4d47-8c04-f7e13d49f808)
  
  
  
  ## 購物網站
  
  # 顯示目前最新產品，由時間排序第一個商品即為最新。點擊閱讀更多或商品圖能進入商品頁面，點擊加入購物車則會將商品加入購物車
  ![11](https://github.com/jeff50508/ecommerce-web/assets/111333990/b193a234-0455-46d7-92bf-4b341417e56c)
  ![12](https://github.com/jeff50508/ecommerce-web/assets/111333990/d8852b77-4a25-41e8-9fbf-b90d9386c0ac)
  ![13](https://github.com/jeff50508/ecommerce-web/assets/111333990/f85da8ce-9f9d-4431-b974-679ef5f69170)
  
  
  # 點擊上方導覽列中所有產品選項則能看到目前所有已上價商品
  ![14](https://github.com/jeff50508/ecommerce-web/assets/111333990/b4732703-5697-4f2f-87bb-ea88a8e3ee68)
  
  
  # 點擊上方導覽列中購物車選項則能看到目前已選商品，可更改商品數量，填入個人資料後即可進入刷卡頁面
  ![15](https://github.com/jeff50508/ecommerce-web/assets/111333990/ed59fdda-03d8-4940-9fc8-747837f655ce)
  ![16](https://github.com/jeff50508/ecommerce-web/assets/111333990/a205bf82-8237-4ef9-ad3a-e49e7c01066f)
  
  
  # 付款成功頁面
  ![17](https://github.com/jeff50508/ecommerce-web/assets/111333990/0526bb13-2810-4e07-bb16-d625f5507c44)
