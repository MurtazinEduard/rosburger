import React, { FC } from "react"
import ContentLoader from "react-content-loader"

const ProductItemLoader: FC = () => (
  <ContentLoader 
    speed={2}
    width={300}
    height={450}
    viewBox="0 0 300 450"
    backgroundColor="#ededed"
    foregroundColor="#ecebeb"
  >
    <circle cx="144" cy="119" r="91" /> 
    <rect x="4" y="223" rx="0" ry="0" width="295" height="67" /> 
    <rect x="4" y="308" rx="0" ry="0" width="299" height="20" /> 
    <rect x="3" y="346" rx="0" ry="0" width="305" height="21" /> 
    <rect x="11" y="408" rx="0" ry="0" width="134" height="30" /> 
    <rect x="199" y="409" rx="0" ry="0" width="43" height="29" /> 
    <rect x="254" y="410" rx="0" ry="0" width="41" height="28" />
  </ContentLoader>
)

export default ProductItemLoader