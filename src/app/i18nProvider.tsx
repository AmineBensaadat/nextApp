'use client';

import { appWithTranslation } from 'next-i18next';
import i18n from './i18n'; // Import the i18next instance

// Wrap your application with the translation context
const I18nProvider = appWithTranslation(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

export default I18nProvider;
