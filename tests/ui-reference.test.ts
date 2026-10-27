import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const read=(path:string)=>readFileSync(join(process.cwd(),path),'utf8');
describe('Reference mobile UI essentials',()=>{
  it('keeps a customer-free navigation with central billing shortcut',()=>{
    const src=read('src/components/ShopApp.tsx');
    expect(src).not.toMatch(/id:'customers'/);
    expect(src).toContain("id:'billing',label:'sale'");
    expect(src).toContain('ref-bottom-primary');
    expect(src).toContain('openAddToken');
  });
  it('keeps product edits and pricing visible',()=>{
    const src=read('src/components/Products.tsx');
    expect(src).toContain('ref-edit-product-btn');
    expect(src).toContain('ref-photo-input');
    expect(src).toContain("language==='ml'?'malayalamName':'englishName'");
  });
  it('allows a sale without a receipt and preserves optional PDF',()=>{
    const src=read('src/components/Billing.tsx');
    expect(src).toContain('finalize(false)');
    expect(src).toContain('finalize(true)');
  });
  it('uses safe-area aware small-screen styles',()=>{
    const css=read('src/app/reference-ui.css');
    expect(css).toContain('safe-area-inset-bottom');
    expect(css).toContain('@media(max-width:390px)');
    expect(css).toContain('.ref-billing-products');
  });
});
