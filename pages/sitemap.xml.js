import { getAllPosts } from '../lib/mdx';

const links = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Integrations',
    link: '/integrations',
  },
  {
    title: 'Creator',
    link: '/creator',
  },
  {
    title: 'Business',
    link: '/business',
  },
  {
    title: 'Enterprise',
    link: '/enterprise',
  },
  {
    title: 'Blog',
    link: '/blog',
  },
  {
    title: 'Contact',
    link: '/contact',
  },
  {
    title: 'Terms of Service',
    link: '/terms-of-service',
  },
  {
    title: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    title: 'Cookie Policy',
    link: '/cookie-policy',
  },
];

const EXTERNAL_DATA_URL =
  'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map((value) => {
         return `
       <url>
           <loc>${`${value}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const blog = await getAllPosts(['title', 'date', 'slug']);

  const blogUrls = blog.map((post) => {
    return `https://trydisperse.com/blog/${post.slug}`;
  });

  // blogUrls and links link
  const allUrls = [
    ...blogUrls,
    ...links.map((link) => {
      return 'https://trydisperse.com' + link?.link;
    }),
  ];

  // We generate the XML sitemap with the posts data
  const sitemap = await generateSiteMap(allUrls);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
