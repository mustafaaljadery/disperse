import Container from '../../components/Container';
import { getAllPosts } from '../../lib/mdx';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PostProps {
  value: any;
  index: number;
}

function formatDate(value: any) {
  const date = new Date(value);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month.toUpperCase()} ${day}, ${year}`;
}

function Post({ value, index }: PostProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div key={index} className="px-1 py-4 md:p-4 w-full md:w-1/2">
      <Link href={'/blog/' + value?.slug} legacyBehavior>
        <button
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          className="flex flex-col"
        >
          <Image
            src={value?.coverImage}
            alt={value?.coverImageAlt}
            className=""
          />
          <div className="mt-3 flex flex-row space-x-3">
            <p className="text-black text-[10px] md:text-[11px] silka-semibold">
              {formatDate(value?.date)}
            </p>
            <p className="text-black text-[10px] md:text-[11px] silka-semibold">
              &middot;
            </p>
            <p className="text-black text-[10px] md:text-[11px] silka-semibold">
              {value?.author?.toUpperCase()}
            </p>
          </div>
          <h2
            className={
              'text-2xl xl:text-3xl text-start text-[#363636] silka-bold mt-2.5 ' +
              (hovered && 'underline')
            }
          >
            {value?.title.length > 32
              ? value?.title.slice(0, 32) + '...'
              : value?.title}
          </h2>
          <p className="mt-2 md:mt-3 silka-regular text-start text-gray-600 text-xs xl:text-sm">
            {value?.excerpt?.length > 150
              ? value?.excerpt.slice(0, 150) + '...'
              : value?.excerpt}
          </p>
        </button>
      </Link>
    </div>
  );
}

export default function Blog({ posts, prevPosts, nextPOsts }: any) {
  return (
    <Container
      title="Content Creation - Disperse Blog"
      description="Learn more from the Disperse team, from out blog posts."
    >
      <div className="flex flex-col">
        <div className="py-10 md:py-12 flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-4/5 lg:w-[70%] xl:w-[60%]">
            <h1 className="text-3xl md:text-4xl silka-bold text-[#363636]">
              Blog
            </h1>
            <p className="mt-4 silka-regular text-gray-500 text-sm md:text-base">
              Learn more from the Disperse Team.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-24">
          <div className="flex flex-row flex-wrap w-[90%] md:w-4/5 lg:w-[70%] xl:w-[60%]">
            {posts.map((value: any, index: number) => {
              return <Post index={index} value={value} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'coverImageAlt',
    'coverImageHeight',
    'coverImageWidth',
    'excerpt',
    'draft',
  ]);

  const startIndex = 0;
  const endIndex = 6;
  const prevPosts = null;
  const nextPosts = endIndex >= posts.length ? null : 2;

  return {
    props: {
      posts: posts,
      prevPosts,
      nextPosts,
    },
  };
}
