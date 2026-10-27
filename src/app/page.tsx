import ShopApp from '@/components/ShopApp';
import {LanguageProvider} from '@/lib/language';
export default function HomePage() { return <LanguageProvider><ShopApp /></LanguageProvider>; }
