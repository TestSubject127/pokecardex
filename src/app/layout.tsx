import { LanguageProvider, HtmlLangUpdater } from '@/i18n';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <LanguageProvider defaultLanguage="de">
          <HtmlLangUpdater />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
