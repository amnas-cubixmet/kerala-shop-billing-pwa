'use client';
import {useState} from 'react';
import type { Product } from '@/types/models';
import {getCatalogPhoto} from '@/lib/catalog-image-map';

export default function ProductVisual({product,large=false}: {product: Pick<Product,'name'|'imageDataUrl'> & Partial<Pick<Product,'id'>>;large?:boolean}) {
  const preferred = product.imageDataUrl || (product.id ? getCatalogPhoto(product.id) : undefined) || '/products/no-photo.webp';
  const [failedSource,setFailedSource] = useState('');
  const src=preferred===failedSource?'/products/no-photo.webp':preferred;
  // User-uploaded photos are local and always take priority; preset photos come from /public/products.
  return <span className={`vegetable-visual ${large?'large':''}`} aria-label={product.name}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={product.name} title={product.imageDataUrl?'Uploaded by this shop':'Illustrative catalog image — confirm packet details'} loading="lazy" onError={()=>setFailedSource(preferred)} />
  </span>;
}
