import Container from '../../components/Container';
import { getAllPosts, getPostBySlug } from '../../lib/mdx';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import Image from 'next/image';

function readingTime(content: string) {
  const text = content;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  if (time > 60) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours} hr ${minutes} min read`;
  }

  return `${time} min read`;
}

function formatSchemaDate(value: any) {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function formatDate(value: any) {
  const date = new Date(value);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month.toUpperCase()} ${day}, ${year}`;
}

const ptComponents = {
  list: {
    bullet: ({ children }: any) => {
      return <ul className="list-disc">{children}</ul>;
    },
  },
  listItem: {
    bullet: ({ children }: any) => {
      return (
        <li className="ml-5 lg:ml-10 mt-1.5 lg:mt-2 text-sm lg:text-base silka-regular text-[#636363]">
          {children}
        </li>
      );
    },
  },
  h2: ({ children }: any) => {
    return (
      <h2 className="silka-semibold mt-10 lg:mt-12 text-xl lg:text-2xl text-gray-800">
        {children}
      </h2>
    );
  },
  p: ({ children }: any) => {
    return (
      <p className="silka-regular mt-5 lg:mt-7 text-sm lg:text-base text-[#636363]">
        {children}
      </p>
    );
  },
  h3: ({ children }: any) => {
    return (
      <h3 className="silka-semibold mt-10 lg:mt-12 text-lg lg:text-xl text-gray-800">
        {children}
      </h3>
    );
  },
};

export default function Post({ post, mdxSource }: any) {
  return (
    <Container
      title={post?.title + ' - Disperse'}
      description={post?.excerpt}
    >
      <article
        itemScope
        itemType="http://schema.org/Article"
        className="w-full flex flex-col justify-center items-center"
      >
        <section
          id="article-info"
          className="w-[90%] md:w-1/2 xl:w-2/5 flex flex-col mt-12 md:mt-16"
        >
          <h1
            itemProp="name"
            className="silka-bold text-3xl md:text-4xl text-[#363636]"
          >
            {post?.title}
          </h1>
          <p
            itemProp="author"
            className="mt-2.5 text-[#363636] text-sm md:text-base silka-medium"
          >
            Written by {post?.author}
          </p>
          <div className="flex mt-2 flex-row space-x-1">
            <span
              itemProp="datePublished"
              //@ts-ignore
              content={formatSchemaDate(post?.date)}
              className="text-[10px] md:text-[11px] silka-regular text-gray-500"
            >
              {formatDate(post?.date)}
            </span>
            <span className="text-[10px] md:text-[11px] silka-regular text-gray-500">
              &middot;
            </span>
            <span className="text-[10px] md:text-[11px] silka-regular text-gray-500">
              {readingTime(post?.content)}
            </span>
          </div>
        </section>
        {post?.coverImage && (
          <Image
            itemProp="image"
            className="w-[90%] mt-12 md:mt-16 h-fit md:w-[55%]"
            alt={post?.coverImageAlt}
            src={post?.coverImage}
          />
        )}
        <main className="w-[90%] md:w-1/2 xl:w-2/5">
          <MDXRemote {...mdxSource} components={ptComponents} />
        </main>
        <section id="share-article" className="mt-16 mb-20">
          <div className="flex flex-col justify-center items-center">
            <p className="silka-semibold text-[#363636] text-xs">
              Share this post
            </p>
            <div className="mt-6 flex flex-row space-x-5">
              <a
                href={`https://twitter.com/intent/tweet?text=https://trydisperse.com/blog/${post?.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all ease-in-out delay-100 hover:opacity:80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="my-auto mt-0.5"
                >
                  <path
                    fill="#363636"
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://trydisperse.com/blog/${post?.slug}title=${post?.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all ease-in-out delay-100 hover:opacity:80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="my-auto"
                >
                  <path
                    fill="#363636"
                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                  />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer.php?u=https://trydisperse.com/blog/${post?.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all ease-in-out delay-100 hover:opacity:80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="my-auto"
                >
                  <path
                    fill="#363636"
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
              </a>
            </div>
            <Link href="/blog" legacyBehavior>
              <button className="flex flex-row space-x-2.5 transition-all ease-in-out delay-100 hover:space-x-4 mt-16">
                <svg
                  height="15"
                  width="15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="my-auto text-sm md:text-base silka-medium text-[#363636]">
                  Back to Blog
                </p>
              </button>
            </Link>
          </div>
        </section>
      </article>
    </Container>
  );
}

export async function getStaticProps({ params }: any) {
  const post: any = getPostBySlug(params.slug, [
    'title',
    'excerpt',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'coverImageAlt',
    'coverImageHeight',
    'coverImageWidth',
    'draft',
  ]);

  const mdxSource = await serialize(`${post?.content}`);

  return {
    props: { post, mdxSource },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post: any) => {
      return {
        params: { ...post },
      };
    }),
    fallback: false,
  };
}
