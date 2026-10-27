#!/usr/bin/env python3
"""Generate lightweight, photo-backed product *illustrations* for every preset.
The underlying AI-generated source photo set is indicative, NOT an official branded pack shot.
Override a catalog item's image with a merchant-uploaded real photo inside the PWA.
"""
import json, re
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

ROOT=Path(__file__).resolve().parents[1]
BOARD=ROOT/'scripts'/'seed-product-photos.png'
OUT=ROOT/'public'/'products'
GENERATED=ROOT/'src'/'lib'/'catalog-image-map.ts'
DATA=ROOT/'data'/'catalog-image-manifest.json'
VEG=ROOT/'src/lib/vegetables.ts'
FOOD=ROOT/'src/lib/food-catalog.ts'
BRAND=ROOT/'src/lib/branded-catalog.ts'

# ImageGen-created contact sheet: 6 sections x 3 product photographs x 2 rows.
# Crop only the product photos; no screenshots, icons, app UI or copyrighted stock imagery.
SECTION=[(20,267,'foods'),(287,509,'vegetables'),(529,759,'fruits'),(783,1007,'beverages'),(1027,1257,'household'),(1272,1528,'personal-care')]
PHOTO_SEEDS={}
for x0,x1,category in SECTION:
  w=(x1-x0)/3
  for row in range(2):
    for col in range(3):
      x=int(x0+w*(col+.5)); y=622 if row==0 else 675
      PHOTO_SEEDS[f'{category}-{row*3+col}']=(x-30,y-28,x+30,y+27)
# Additional non-branded bakery/bag photo crops from ImageGen-made mockup
PHOTO_SEEDS.update({'bread':(400,518,476,587),'oil':(250,344,370,415),'cheese':(1322,624,1390,690),'butter':(1415,624,1495,690)})

# Crop mapping for a product family, not a claim about exact appearance / barcode / packaging.
PHOTO_KEYWORDS=[
 ('banana','fruits-0'),('plantain','fruits-0'),('nendran','fruits-0'),('apple','fruits-1'),('grape','fruits-2'),('orange','fruits-3'),('lime','fruits-3'),('lemon','fruits-3'),('mango','fruits-4'),('watermelon','fruits-5'),('melon','fruits-5'),
 ('tomato','vegetables-0'),('onion','vegetables-1'),('shallot','vegetables-1'),('potato','vegetables-2'),('cabbage','vegetables-3'),('carrot','vegetables-4'),('bean','vegetables-5'),('chilli','vegetables-5'),('pepper','vegetables-5'),
 ('rice','foods-0'),('flour','foods-0'),('atta','foods-0'),('rava','foods-0'),('sugar','foods-3'),('jaggery','foods-3'),('dal','foods-2'),('lentil','foods-2'),('gram','foods-4'),('pea','foods-2'),('pasta','foods-5'),('noodle','foods-5'),
 ('milk','beverages-0'),('buttermilk','beverages-0'),('tea','beverages-1'),('coffee','beverages-2'),('juice','beverages-3'),('drink','beverages-4'),('soda','beverages-4'),('water','beverages-5'),('coconut','beverages-5'),
 ('bread','bread'),('bun','bread'),('toast','bread'),('biscuit','bread'),('cookie','bread'),('cake','bread'),('puff','bread'),('pastry','bread'),('halwa','foods-3'),('laddu','foods-3'),('ladoo','foods-3'),('sweet','foods-3'),('candy','foods-3'),('toffee','foods-3'),('chocolate','foods-3'),('chips','foods-5'),('mixture','foods-5'),
 ('oil','oil'),('ghee','butter'),('butter','butter'),('paneer','cheese'),('cheese','cheese'),('soap','personal-care-1'),('tooth','personal-care-2'),('shampoo','personal-care-0'),('detergent','household-0'),('cleaner','household-1'),('dish','household-3'),('scrub','household-3'),('bucket','household-4'),('mop','household-5'),('paper','household-4')
]

# Pull exactly the same 850 product IDs used by the source-code preset collections.
vegetables=[]
for m in re.finditer(r"\['([^']+)',\s*'([^']+)',\s*'(?:pcs|kg|ltr|m|bundle)'\]",VEG.read_text()):
 ml,english=(m.group(1).split(' / ',1)+[''])[:2]
 vegetables.append({'id':f'kerala-veg-{len(vegetables)+1:03d}','malayalamName':ml,'englishName':english,'category':'Vegetables / പച്ചക്കറി','brand':''})
fruits=[]; foods=[]
rows_section=None
for line in FOOD.read_text().splitlines():
 if line.startswith('const fruitRows'): rows_section='fruits'
 if line.startswith('const foodRows'): rows_section='foods'
 match=re.search(r'^\s*\["([^"]+)",\s*"([^"]+)",\s*"[^"]+",\s*"(?:kg|pcs|ltr|m|bundle)",\s*"([^"]+)"\]',line)
 if match and rows_section:
  target=fruits if rows_section=='fruits' else foods
  target.append({'id':f'kerala-{"fruit" if rows_section=="fruits" else "food"}-{len(target)+1:03d}','malayalamName':match.group(1),'englishName':match.group(2),'category':match.group(3),'brand':''})
branded=json.loads(BRAND.read_text().split('= [',1)[1].rsplit('] as const',1)[0].join(['[',']']))
all_items=vegetables+fruits+foods+branded
assert len(vegetables)==50,(len(vegetables))
assert len(fruits)==60,len(fruits)
assert len(foods)==240,len(foods)
assert len(branded)==500,len(branded)
assert len(all_items)==850,len(all_items)

# Generate 320 x 320 thumbnails with the generated photo prominent + a product title.
# New merchants' photos are always saved to IndexedDB and take precedence over these files.
BOARD_IMAGE=Image.open(BOARD).convert('RGB')
OTHER_SOURCE=Image.open(ROOT/'scripts'/'seed-shop-ui.png').convert('RGB')
DAIRY_SOURCE=Image.open(ROOT/'scripts'/'seed-category-photos.png').convert('RGB')
FALLBACK_COLOR={'vegetables':'#e7f8e7','fruits':'#fff6de','foods':'#f8f2e7','bakery':'#fff4dc','sweets':'#fceeea','brands':'#eaf1ff'}
SEED_FAMILY={'vegetables':'vegetables-0','fruits':'fruits-0','foods':'foods-0','bakery':'bread','sweets':'foods-3','brands':'foods-2'}
ROOT.mkdir(exist_ok=True)

def folder(item):
 cat=item['category'].lower()
 if cat.startswith('vegetables'):return 'vegetables'
 if cat.startswith('fruits'):return 'fruits'
 if cat.startswith('bakery'):return 'bakery'
 if cat.startswith('sweets'):return 'sweets'
 if cat.startswith('branded'):return 'brands'
 return 'foods'

def best_photo(item,fam):
 content=(item['englishName']+' '+item.get('brand','')).casefold()
 for key,photo in PHOTO_KEYWORDS:
  if key in content:return photo
 return SEED_FAMILY[fam]

def font(name, size):
 search=[
  '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
 ]
 for item in search:
  if Path(item).exists():return ImageFont.truetype(item,size)
 return ImageFont.load_default()

TITLE_FONT=font('display',22)
SMALL_FONT=font('small',13)
image_map={}; rows=[]; photo_counts={}
for item in all_items:
 fam=folder(item)
 photo=best_photo(item,fam)
 photo_counts[photo]=photo_counts.get(photo,0)+1
 product_id=item['id']
 path=f'/products/{fam}/{product_id}.webp'
 dst=OUT/fam/(product_id+'.webp')
 dst.parent.mkdir(parents=True,exist_ok=True)
 background=FALLBACK_COLOR[fam]
 cover=Image.new('RGB',(320,320),'#ffffff')
 draw=ImageDraw.Draw(cover)
 draw.rounded_rectangle((5,5,315,315),radius=22,fill='#ffffff',outline='#e2e8e4',width=2)
 draw.rounded_rectangle((13,13,307,249),radius=16,fill=background)
 # Photo crop (from the user-requested ImageGen product photograph sheets): never claim exact packet picture.
 src_box=PHOTO_SEEDS[photo]
 source=OTHER_SOURCE if photo in ('bread','oil') else DAIRY_SOURCE if photo in ('cheese','butter') else BOARD_IMAGE
 src_photo=source.crop(src_box)
 src_photo=ImageEnhance.Contrast(src_photo).enhance(1.05)
 src_photo=src_photo.resize((280,215),Image.Resampling.LANCZOS)
 cover.paste(src_photo,(20,23))
 draw.line((18,259,302,259),fill='#e9eeec',width=2)
 title=item['englishName']
 # Multiline, right-size rather than leave blank product text. Brand indicated as text only, not a fabricated logo.
 if len(title)>29: size=18
 elif len(title)>23:size=20
 else:size=22
 title_font=font('title',size)
 if len(title)>30:
  title=title[:29].rstrip()+'…'
 draw.text((18,267),title,font=title_font,fill='#172a24')
 short_brand=(item.get('brand') or '').strip()
 if short_brand and short_brand!='Unbranded / Local':
  draw.text((19,294),short_brand[:34],font=SMALL_FONT,fill='#63786c')
 else:
  draw.text((19,294),fam.upper(),font=SMALL_FONT,fill='#63786c')
 cover.save(dst,'WEBP',quality=66,method=5)
 image_map[product_id]=path
 rows.append({'id':product_id,'path':path,'photoFamily':photo,'photoType':'illustrative-ai-generated','verifiedSKUPhoto':False,'category':fam})

# For new products without a known image use a real-photo generic image instead of an emoji icon.
shutil=None
from shutil import copyfile
copyfile(OUT/'foods'/'kerala-food-001.webp',OUT/'no-photo.webp')
DATA.parent.mkdir(exist_ok=True)
DATA.write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
GENERATED.write_text('''/** Generated mapping for the 850 starter product templates. Photos are illustrative, not verified SKU packaging. */
export const CATALOG_IMAGES: Readonly<Record<string,string>> = '''+json.dumps(image_map,ensure_ascii=False,indent=2)+''' as const;

/** Merchants' personal photos stored in IndexedDB always override this static photo. */
export function getCatalogPhoto(id: string): string | undefined {
  return CATALOG_IMAGES[id];
}
''',encoding='utf-8')
size=sum(f.stat().st_size for f in OUT.rglob('*.webp'))
print(f'Created {len(image_map)} individual WebP product images, {size/1024/1024:.1f} MiB total')
print('Photo sources used:',photo_counts)
