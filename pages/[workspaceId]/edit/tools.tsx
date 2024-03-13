import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PageHead } from '../../../layouts/PageHead';
import DashboardLayout from '../../../layouts/Dashboard';
import { EditMenu } from '../../../components/edit/EditMenu';
import Router from 'next/router';

const aiTools = [
  {
    image: '/images/edit/ai-clips.png',
    name: 'AI Generate Clips',
    description:
      'Generate clips from your long videos automatically.',
    route: 'get-clips',
  },
];

const videoTools = [
  {
    image: '/images/edit/crop-video.png',
    name: 'Crop Video',
    description: 'Change the dimensions of a video.',
    route: 'crop-video',
  },
  {
    image: '/images/edit/trim-video.png',
    name: 'Trim Video',
    description: 'Cut out parts of a video.',
    route: 'trim-video',
  },
  {
    image: '/images/edit/reverse-video.png',
    name: 'Reverse Video',
    description: 'Play the video in reverse',
    route: 'reverse-video',
  },
  {
    image: '/images/edit/merge-videos.png',
    name: 'Merge Videos',
    description: 'Combine multiple videos into one.',
    route: 'merge-videos',
  },
  {
    image: '/images/edit/change-speed.png',
    name: 'Change Speed',
    description: 'Speed up or slow down a video.',
    route: 'change-speed',
  },
];

const imageTools = [
  {
    image: '/images/edit/convert-to-jpg.png',
    name: 'Convert to JPG',
    description: 'Change your image to a JPG',
    route: 'convert-to-jpg',
  },
  {
    image: '/images/edit/convert-to-png.png',
    name: 'Convert to PNG',
    description: 'Change your image to a PNG',
    route: 'convert-to-png',
  },
  /*
  {
    image: '/images/edit/convert-to-svg.png',
    name: 'Convert to SVG',
    description: '',
    route: 'convert-to-svg',
  },
  */
];

export default function EditTemplates() {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState('');
  const [newCompositionOpen, setNewCompositionOpen] = useState(false);

  useEffect(() => {
    if (router.query.workspaceId) {
      setWorkspaceId(router.query.workspaceId as string);
    }
  }, [router.isReady]);

  return (
    <PageHead title="Edit Tools · Disperse">
      <DashboardLayout>
        <EditMenu
          workspaceId={workspaceId}
          title="Tools"
          router={router}
          newCompositionOpen={newCompositionOpen}
          setNewCompositionOpen={setNewCompositionOpen}
        />
        <main className="px-3 md:px-6 lg:px-4 xl:px-32 2xl:px-44 mt-10 pb-12 md:pb-20">
          <section className="flex flex-col">
            <div className="flex flex-col space-y-1.5 w-full px-2.5">
              <h2 className="silka-semibold text-[#363636]">
                AI Tools
              </h2>
              <p className="text-xs silka-regular text-gray-400">
                Use AI to make content.
              </p>
            </div>
            <div className="mt-4 flex flex-row flex-wrap">
              {aiTools.map((tool: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-2.5 w-full sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5"
                  >
                    <button
                      onClick={() => {
                        Router.push(
                          `/${workspaceId}/ai-tools/${tool.route}`
                        );
                      }}
                      className="w-full p-3 bg-gray-50 flex hover:opacity-90 flex-col rounded-lg"
                    >
                      <div className="flex flex-col justify-center items-center w-full">
                        <img
                          className="rounded w-full"
                          src={tool.image}
                        />
                      </div>
                      <p className="text-sm mt-3 text-start silka-semibold text-gray-900">
                        {tool?.name}
                      </p>
                      <span className="text-[10px] text-start mt-1 silka-regular text-gray-400">
                        {tool?.description}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="flex flex-col mt-8">
            <div className="flex flex-col space-y-1.5 w-full px-2.5">
              <h2 className="silka-semibold text-[#363636]">
                Video Tools
              </h2>
              <p className="text-xs silka-regular text-gray-400">
                Edit and tune your videos.
              </p>
            </div>
            <div className="mt-4 flex flex-row flex-wrap">
              {videoTools.map((tool: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-2.5 w-full sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5"
                  >
                    <button
                      onClick={() => {
                        Router.push(
                          `/${workspaceId}/video-tools/${tool.route}`
                        );
                      }}
                      className="w-full p-3 bg-gray-50 flex hover:opacity-90 flex-col rounded-lg"
                    >
                      <div className="flex flex-col justify-center items-center w-full">
                        <img
                          className="rounded w-full"
                          src={tool.image}
                        />
                      </div>
                      <p className="text-sm mt-3 text-start silka-semibold text-gray-900">
                        {tool?.name}
                      </p>
                      <span className="text-[10px] text-start mt-1 silka-regular text-gray-400">
                        {tool?.description}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="mt-8 flex flex-col">
            <div className="flex flex-col space-y-1.5 w-full px-2.5">
              <h2 className="silka-semibold text-[#363636]">
                Image Tools
              </h2>
              <p className="text-xs silka-regular text-gray-400">
                Edit your images as you see fit.
              </p>
            </div>
            <div className="mt-4 flex flex-row flex-wrap">
              {imageTools.map((tool: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-2.5 w-full sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5"
                  >
                    <button
                      onClick={() => {
                        Router.push(
                          `/${workspaceId}/image-tools/${tool.route}`
                        );
                      }}
                      className="w-full p-3 bg-gray-50 flex hover:opacity-90 flex-col rounded-lg"
                    >
                      <div className="flex w-full flex-col justify-center items-center">
                        <img
                          className="rounded w-full"
                          src={tool.image}
                        />
                      </div>
                      <p className="text-start text-sm mt-3 silka-semibold text-gray-900">
                        {tool?.name}
                      </p>
                      <span className="text-[10px] text-start mt-1 silka-regular text-gray-400">
                        {tool?.description}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </DashboardLayout>
    </PageHead>
  );
}
