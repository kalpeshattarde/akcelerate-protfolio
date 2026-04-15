import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

const SITE = "AKcelerate";
const DEFAULT_DESC = "AKcelerate delivers AI consulting, data analytics, and digital transformation solutions for enterprise growth.";

const SEOHead = ({ title, description, path }: SEOHeadProps) => {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — AI & Digital Solutions`;
  const desc = description || DEFAULT_DESC;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {path && <link rel="canonical" href={`https://akcelerate.lovable.app${path}`} />}
    </Helmet>
  );
};

export default SEOHead;
