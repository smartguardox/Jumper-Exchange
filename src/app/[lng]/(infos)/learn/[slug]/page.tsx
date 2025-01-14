import { getArticleBySlug } from '../../../../lib/getArticleBySlug';
import { getArticlesByTag } from '../../../../lib/getArticlesByTag';
import { getCookies } from '../../../../lib/getCookies';
import LearnArticlePage from '@/app/ui/learn/LearnArticlePage';
import type { BlogArticleAttributes, BlogArticleData } from '@/types/strapi';
import type { Metadata } from 'next';
import { sliceStrToXChar } from '@/utils/splitStringToXChar';
import { siteName } from '@/app/lib/metadata';
import { getFeaturedArticle } from '@/app/lib/getFeaturedArticle';
import { getArticles } from '@/app/lib/getArticles';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);

    if (!article.data || !article.data.data?.[0]) {
      throw new Error();
    }

    const articleData = article.data.data?.[0]
      .attributes as BlogArticleAttributes;

    const openGraph: Metadata['openGraph'] = {
      title: `Jumper Learn | ${sliceStrToXChar(articleData.Title, 45)}`,
      description: `${sliceStrToXChar(articleData.Subtitle, 60)}`,
      siteName: siteName,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/learn/${params.slug}/`,
      images: [
        {
          url: `${article.url}${articleData.Image.data.attributes?.url}`,
          width: 900,
          height: 450,
          alt: 'banner image',
        },
      ],
      type: 'article',
    };

    return {
      title: `Jumper Learn | ${sliceStrToXChar(articleData.Title, 45)}`,
      description: articleData.Subtitle,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.slug}/`,
      },
      twitter: openGraph,
      openGraph,
    };
  } catch (err) {
    return {
      title: `Jumper Learn | ${sliceStrToXChar(params.slug.replaceAll('-', ' '), 45)}`,
      description: `This is the description for the article "${params.slug.replaceAll('-', ' ')}".`,
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  const { activeThemeMode } = getCookies();

  const currentTags = (
    article.data as BlogArticleData
  ).attributes?.tags.data.map((el) => el?.id);

  const relatedArticles = await getArticlesByTag(
    article.data[0]?.id,
    currentTags,
  );

  return (
    <LearnArticlePage
      article={article.data.data}
      url={article.url}
      articles={relatedArticles.data}
      activeThemeMode={activeThemeMode}
    />
  );
}

export async function generateStaticParams() {
  const articles = await getArticles();

  const data = articles.data.map((article) => ({
    slug: article.attributes.Slug,
  }));

  return data;
}
