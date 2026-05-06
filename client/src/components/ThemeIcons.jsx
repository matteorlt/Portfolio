import { Helmet } from 'react-helmet';

/** Icône unique onglet / mobile — inchangée selon le thème (logo noir sur fond clair d’onglet). */
const SITE_ICON = '/logos/logo_black.jpg';

export default function ThemeIcons() {
  return (
    <Helmet>
      <link rel="icon" type="image/jpeg" href={SITE_ICON} />
      <link rel="apple-touch-icon" href={SITE_ICON} />
    </Helmet>
  );
}
