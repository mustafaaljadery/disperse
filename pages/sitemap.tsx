import Container from '../components/Container';
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

export default function SiteMap({ posts }: any) {
  return (
    <Container
      title="Disperse Outline Sitemap - Disperse"
      description="Learn more about Disperse's Outline Sitemap."
    >
      <div className="flex flex-col">
        <div className="flex flex-col py-12 justify-center items-center">
          <div className="w-4/5 flex flex-col">
            <h1 className="text-4xl silka-bold text-[#363636]">
              Sitemap
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-12">
          <div className="w-4/5 flex flex-col">
            <h2 className="text-2xl silka-semibold text-[#363636]">
              Pages
            </h2>
            <div className="flex mt-4 flex-row flex-wrap">
              {links?.map((value: any, index: number) => {
                return (
                  <div key={index} className="w-1/4 p-3">
                    <a
                      href={`${value.link}`}
                      className="text-base silka-medium text-gray-500 hover:underline"
                    >
                      {value.title}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-12">
          <div className="w-4/5">
            <h2 className="text-3xl silka-semibold text-[#363636]">
              Blog Posts
            </h2>
            <div className="flex mt-4 flex-row flex-wrap">
              {posts.map((value: any, index: number) => {
                return (
                  <div key={index} className="w-1/4 p-3">
                    <a
                      href={`/blog/${value.slug}`}
                      className="text-base silka-medium text-gray-500 hover:underline"
                    >
                      {value.title}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug']);

  return {
    props: {
      posts: posts,
    },
  };
}
