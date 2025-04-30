// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unescaped-entities */
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';

export const meta: MetaFunction = () => {
  return [{title: 'Your Name | Podcast & Personal Brand'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Load featured products for the home page
  const featuredProducts = args.context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
  };
}

export default function Homepage() {
  const {featuredProducts} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-brand-navy to-gray-900 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                  Insights & Inspiration
                </h1>
                <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
                  Join me weekly as we explore meaningful conversations with
                  industry leaders and dive deep into topics that matter in the
                  world of business and creativity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#latest-episodes"
                    className="bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-3 px-8 rounded-md text-center transition-all"
                  >
                    Latest Episodes
                  </a>
                  <a
                    href="#subscribe"
                    className="border border-white text-white hover:bg-white hover:text-brand-navy font-bold py-3 px-8 rounded-md text-center transition-all"
                  >
                    Subscribe Now
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="/images/podcast-image.jpeg"
                    alt="Podcast Host"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episodes Section */}
      <section id="latest-episodes" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-center mb-12">
            Latest Episodes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Episode Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/image.jpeg"
                  alt="Episode 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  Episode #42 • May 15, 2025
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">
                  Growth Strategies for Digital Entrepreneurs
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn proven strategies to scale your online business and
                  reach new audiences in today's digital marketplace.
                </p>
                <a
                  href="/"
                  className="text-brand-navy font-medium hover:underline"
                >
                  Listen Now →
                </a>
              </div>
            </div>

            {/* Episode Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/image2.jpeg"
                  alt="Episode 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  Episode #41 • May 1, 2025
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">
                  Building a Personal Brand That Resonates
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover the power of authentic storytelling and how to create
                  a personal brand that truly connects with your audience.
                </p>
                <a
                  href="/episodes/41"
                  className="text-brand-navy font-medium hover:underline"
                >
                  Listen Now →
                </a>
              </div>
            </div>

            {/* Episode Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/podcast-image2.jpeg"
                  alt="Episode 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  Episode #40 • April 15, 2025
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-2">
                  The Future of Work: Remote Teams and Global Talent
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore how remote work is reshaping our professional
                  landscape and creating opportunities for global collaboration.
                </p>
                <a
                  href="/episodes/40"
                  className="text-brand-navy font-medium hover:underline"
                >
                  Listen Now →
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="/episodes"
              className="inline-block border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors duration-300 font-medium py-2 px-6 rounded-md"
            >
              View All Episodes
            </a>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-6">
              Subscribe to the Podcast
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Never miss an episode. Subscribe on your favorite platform.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="https://podcasts.apple.com/podcast/your-podcast"
                className="bg-[#7D4698] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg flex items-center transition-all"
              >
                <span className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.536 14.01A8.47 8.47 0 0 0 8.012 10.3a8.47 8.47 0 0 0-3.527 3.71 8.564 8.564 0 0 0 7.05 0Zm1.276-.203A8.54 8.54 0 0 1 8 16a8.54 8.54 0 0 1-4.813-2.194a8.518 8.518 0 0 1-.507-.527A7.568 7.568 0 0 1 0 8a8 8 0 1 1 16 0a7.57 7.57 0 0 1-3.188 6.193a8.555 8.555 0 0 1-.499.535Z" />
                    <path d="M10.273 2.513a7.55 7.55 0 0 0-3.384.364a7.55 7.55 0 0 0-5.012 7.128a7.59 7.59 0 0 0 1.931 4.489c.16.193.338.34.338.34a8.505 8.505 0 0 1 1.12.646a8.495 8.495 0 0 1 3.715.873a8.51 8.51 0 0 1 2.01-.057a8.53 8.53 0 0 1 1.834-.41a9.836 9.836 0 0 0 .535-.538a7.57 7.57 0 0 0 1.64-4.698a7.55 7.55 0 0 0-3.727-6.54Z" />
                  </svg>
                </span>
                Apple Podcasts
              </a>

              <a
                href="https://open.spotify.com/show/your-podcast"
                className="bg-[#25D366] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg flex items-center transition-all"
              >
                <span className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 8 0C3.582 0 0 3.582 0 8a7.852 7.852 0 0 0 1.17 4.127l-1.13 3.373L4.05 13.95c.364.17.756.31 1.164.416A7.863 7.863 0 0 0 8 16c4.418 0 8-3.582 8-8a7.851 7.851 0 0 0-2.399-5.674z" />
                    <path d="M8 14.036c-3.343 0-6.034-2.69-6.034-6.035 0-3.344 2.69-6.035 6.034-6.035 3.344 0 6.035 2.69 6.035 6.035 0 3.344-2.691 6.035-6.035 6.035z" />
                  </svg>
                </span>
                Spotify
              </a>

              <a
                href="https://podcasts.google.com/feed/your-podcast"
                className="bg-[#FF8A00] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg flex items-center transition-all"
              >
                <span className="mr-2">
                  <svg
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-1a.5.5 0 0 0-.4.2L9.05 2h-2.1L5.15.2a.5.5 0 0 0-.4-.2zm0 1h1l1.5 1.5a.5.5 0 0 0 .4.2h2.7a.5.5 0 0 0 .4-.2L11.25 1h1l2.5 3H1.2zm-.2 4h11a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5" />
                  </svg>
                </span>
                Google Podcasts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-center mb-12">
            Featured Products
          </h2>

          <Suspense fallback={<div>Loading products...</div>}>
            <Await resolve={featuredProducts}>
              {(response) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {response
                    ? response.products.nodes
                        .slice(0, 4)
                        .map((product) => (
                          <ProductItem key={product.id} product={product} />
                        ))
                    : null}
                </div>
              )}
            </Await>
          </Suspense>

          <div className="text-center mt-10">
            <Link
              to="/collections/all"
              className="inline-block bg-brand-navy hover:bg-brand-navy/90 text-white font-medium py-3 px-8 rounded-md transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
