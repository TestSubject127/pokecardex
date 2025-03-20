import { useLanguage } from '@/i18n';

export default function Example() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
}
