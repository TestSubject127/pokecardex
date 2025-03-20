import { LanguageSwitcher, useLanguage } from '@/i18n';

export default function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-red-600 text-xl font-bold">P</span>
          </div>
          <h1 className="text-xl font-bold">{t('app.title')}</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:underline">{t('nav.home')}</a>
          <a href="#" className="hover:underline">{t('nav.cards')}</a>
          <a href="#" className="hover:underline">{t('nav.sets')}</a>
          <a href="#" className="hover:underline">{t('nav.prices')}</a>
          <a href="#" className="hover:underline">{t('nav.portfolio')}</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
