import Image from 'next/image';

const Images = [
  {
    src: '/images/automations/1-audio-perfection.png',
    opacity: 100,
  },
  {
    src: '/images/automations/2-auto-outreach.png',
    opacity: 100,
  },
  {
    src: '/images/automations/3-media-quality.png',
    opacity: 100,
  },
  {
    src: '/images/automations/4-optimize.png',
    opacity: 100,
  },
  {
    src: '/images/automations/5-auto-dm.png',
    opacity: 100,
  },
  {
    src: '/images/automations/6-bulk-message.png',
    opacity: 60,
  },
  {
    src: '/images/automations/7-analytics.png',
    opacity: 60,
  },
  {
    src: '/images/automations/8-live-download.png',
    opacity: 60,
  },
  {
    src: '/images/automations/9-schedule.png',
    opacity: 60,
  },
  {
    src: '/images/automations/10-iteration.png',
    opacity: 60,
  },
  {
    src: '/images/automations/11-video-editing.png',
    opacity: 20,
  },
  {
    src: '/images/automations/12-headlines.png',
    opacity: 20,
  },
  {
    src: '/images/automations/13-auto-retweet.png',
    opacity: 20,
  },
  {
    src: '/images/automations/14-demographics.png',
    opacity: 20,
  },
  {
    src: '/images/automations/15-drafts.png',
    opacity: 20,
  },
];

interface ImageProps {
  src: string;
  opacity: number;
}

const GraphicImage = ({ src, opacity }: ImageProps) => {
  return (
    <div
      className={
        'w-1/3 md:w-1/5 mt-1 p-3 md:p-2 lg:p-3 opacity-' +
        String(opacity)
      }
    >
      <img
        alt="A picture of a feature provided by Disperse."
        src={src}
      />
    </div>
  );
};
export function Analytics() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 md:w-[70%] lg:w-3/5 flex flex-col justify-center items-center">
        <h2 className="text-4xl lg:text-5xl silka-semibold text-center">
          Analytics and Automation
        </h2>
        <p className="text-sm px-4 lg:px-0 lg:text-lg silka-medium text-[#5A5A5A] text-center mt-4 lg:mt-6">
          Build and monetize your following using Disperse&apos;s
          custom built automations.
        </p>
      </div>
      <div className="w-11/12 md:w-4/5 lg:w-2/3 2xl:w-1/2 flex flex-row flex-wrap mt-4 lg:mt-8">
        {Images.map((value: any, index: number) => {
          return (
            <GraphicImage
              key={index}
              src={value.src}
              opacity={value.opacity}
            />
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center w-3/5">
        <p className="text-sm mt-4 lg:mt-6 silka-medium text-[#3F3F3F] text-center">
          + many more
        </p>
      </div>
    </div>
  );
}
