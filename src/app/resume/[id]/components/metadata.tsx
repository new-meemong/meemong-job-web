interface Props {
  seoTitle?: string;
  seoDescription?: string;
  ogType?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
}

export default function Metadata({
  seoTitle = "미몽 - 구인구직",
  seoDescription = "헤어 디자이너 구인구직 플랫폼",
  ogType = "website",
  ogImage = "",
  ogTitle = "미몽 - 구인구직",
  ogDescription = "헤어 디자이너 구인구직 플랫폼",
  ogUrl = "https://meemong.com/",
  ogSiteName = "미몽",
  ogLocale = "ko_KR"
}: Props) {
  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={ogLocale} />
    </>
  );
}
