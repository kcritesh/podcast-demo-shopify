import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link} from '@remix-run/react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `${data?.product.title ?? ''} | Podcast Store`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  context,
  params,
  request,
}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: LoaderFunctionArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml, vendor} = product;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-5">
        <ol className="flex text-sm">
          <li className="mr-2">
            <Link to="/" className="text-gray-500 hover:text-brand-navy">
              Home
            </Link>
          </li>
          <li className="mx-2 text-gray-500">/</li>
          <li className="mr-2">
            <Link
              to="/collections/all"
              className="text-gray-500 hover:text-brand-navy"
            >
              Shop
            </Link>
          </li>
          <li className="mx-2 text-gray-500">/</li>
          <li>
            <span className="text-gray-800">{title}</span>
          </li>
        </ol>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="sticky top-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <ProductImage image={selectedVariant?.image} />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              {vendor && <p className="text-gray-500 text-sm mb-2">{vendor}</p>}
              <h1 className="font-playfair font-bold text-3xl md:text-4xl mb-4">
                {title}
              </h1>
              <div className="mb-4 text-2xl font-medium">
                <ProductPrice
                  price={selectedVariant?.price}
                  compareAtPrice={selectedVariant?.compareAtPrice}
                />
              </div>
            </div>

            <div className="mb-8">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="font-playfair font-semibold text-xl mb-4">
                Product Description
              </h2>
              <div
                className="prose prose-lg prose-gray max-w-none"
                dangerouslySetInnerHTML={{__html: descriptionHtml}}
              />
            </div>

            {/* Podcast Connection Section */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-playfair font-medium text-lg mb-3">
                As Featured In Our Podcast
              </h3>
              <p className="text-gray-700 mb-4">
                This product was discussed in episode #38 &ldquo;Tools for
                Creative Success&rdquo; where we explored essential resources
                for productivity and creativity.
              </p>
              <Link
                to="/episodes/38"
                className="text-brand-navy hover:text-brand-navy/90 font-medium flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Listen to the episode
              </Link>
            </div>

            {/* Customer Support */}
            <div className="mt-8 flex items-center text-gray-600 text-sm">
              <svg
                className="w-5 h-5 mr-2 text-brand-navy"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>
                Questions about this product? Email us at{' '}
                <span className="font-medium text-brand-navy">
                  support@yourpodcast.com
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Related Products - Coming Soon */}
        <div className="mt-20">
          <h2 className="font-playfair font-bold text-2xl text-center mb-4">
            You Might Also Like
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Other merchandise from our podcast collection
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Placeholder for related products - would be populated dynamically in a full implementation */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="h-48 flex items-center justify-center mb-3">
                <span className="text-gray-400">Coming Soon</span>
              </div>
              <h3 className="font-medium">Related Product</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="h-48 flex items-center justify-center mb-3">
                <span className="text-gray-400">Coming Soon</span>
              </div>
              <h3 className="font-medium">Related Product</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="h-48 flex items-center justify-center mb-3">
                <span className="text-gray-400">Coming Soon</span>
              </div>
              <h3 className="font-medium">Related Product</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="h-48 flex items-center justify-center mb-3">
                <span className="text-gray-400">Coming Soon</span>
              </div>
              <h3 className="font-medium">Related Product</h3>
            </div>
          </div>
        </div>
      </div>
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
