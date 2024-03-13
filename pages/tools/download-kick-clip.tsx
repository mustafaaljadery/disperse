import axios from 'axios';
import Container from '../../components/Container';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ToolsTemplate } from '../../layouts/ToolsTemplate';

async function getInfo(clipId: string) {
  try {
    const result = await axios.get(
      `https://kick.com/api/v2/clips/${clipId}`
    );
    console.log('info', result.data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function formatLargeNumber(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') +
        item.symbol
    : '0';
}

function formatSeconds(d: any) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : ' hrs, ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' min, ' : ' mins, ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' secs') : '';
  return hDisplay + mDisplay + sDisplay;
}

/*
1. Service
2. Pitch Disperse + CTA
3. Who uses Disperse
3. SEO for Service
4. Disperse content pitches 
5. CTA
*/

export default function KickDownload() {
  const [link, setLink] = useState('');
  const [gotClip, setGotClip] = useState(false);
  const [details, setDetails] = useState<any>(null);

  return (
    <Container
      title="Kick Clip Downloader - Just Paste a Link"
      description="Disperse allows you to download any Kick clip to your device. Donwload & repurpose your content. Share with your followers!"
    >
      <div className="flex flex-col w-full mt-10 pb-12 md:pb-20 lg:pb-24 justify-center items-center">
        <div className="flex flex-col w-[95%] md:w-[75%] lg:w-[60%] py-8 md:py-16 px-2 md:px-12 rounded-xl bg-[#F0F5EF] justify-center items-center">
          <div className="flex flex-row space-x-3">
            <img
              src="/images/tools/kick.png"
              className="max-h-[28px] md:max-h-[40px] lg:max-h-[45px] my-auto"
            />
            <h1 className="silka-black my-auto text-3xl md:text-4xl lg:text-5xl text-black">
              Clip Download
            </h1>
          </div>
          <p className="mt-6 text-sm md:text-base text-center silka-medium text-gray-500">
            Download Kick clips right from your browser for free!
          </p>
          {gotClip ? (
            <div className="w-full mt-6 flex flex-col md:flex-row md:space-x-8">
              <div className="flex flex-col w-full md:w-1/2">
                <video
                  className="rounded"
                  src={details.video_url}
                  controls
                />
                <p className="text-xl silka-semibold mt-3 text-gray-900">
                  {details.title}
                </p>
                <div className="flex flex-row mt-4 space-x-4">
                  <span className="text-sm silka-semibold text-gray-600">
                    Likes: {formatLargeNumber(details.likes_count, 1)}
                  </span>
                  <span className="text-sm silka-semibold text-gray-600">
                    Duration: {formatSeconds(details.duration)}
                  </span>
                </div>
              </div>
              <div className="flex w-full md:w-1/2 mt-6 md:my-auto flex-col">
                <p className="text-[#363636] silka-semibold">
                  Channel:
                </p>
                <div className="flex mt-2.5 flex-row space-x-2.5">
                  <img
                    className="rounded-full h-[42px] w-[42px] md:h-[54px] md:w-[54px]"
                    src={details.channel.profile_picture}
                  />
                  <a
                    href={'https://kick.com/' + details.channel.slug}
                    target="_blank"
                    rel="noopenner noreferrer"
                    className="text-lg my-auto silka-medium text-gray-900"
                  >
                    {details.channel.username}
                  </a>
                </div>
                <div className="flex mt-8 flex-col justify-end items-end md:justify-start md:items-start space-y-6">
                  <div className="flex flex-row w-full space-x-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto rotate-90 md:rotate-0"
                    >
                      <path
                        d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                        fill="#FF623D"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="text-sm silka-semibold text-[#FF623D] my-auto">
                      Click Video Options to Download Clip
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setLink('');
                      setGotClip(false);
                    }}
                    className="text-xs md:text-sm w-fit bg-[#363636] px-4 py-1.5 rounded hover:opacity-90 silka-medium text-white"
                  >
                    New Clip
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form
              onClick={(e) => {
                e.preventDefault();
                if (link) {
                  const url = new URL(link);
                  const search_params = url.searchParams;
                  const id = search_params.get('clip');
                  if (id) {
                    getInfo(id).then((value) => {
                      setGotClip(true);
                      setDetails(value.clip);
                    });
                  } else {
                    toast.error('Invalid Link', {
                      className: 'text-sm silka-medium text-gray-900',
                    });
                  }
                }
              }}
              className="flex w-full flex-row items-center justify-center space-x-4 mt-8"
            >
              <input
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                className="text-sm max-w-[700px] flex-1 rounded silka-medium py-2.5 px-4 border border-[#FF623D] focus:outline-none focus:border-[#FF623D]  focus:ring-2 focus:ring-[#FF623D]"
                placeholder="Kick Clip Link"
                type="text"
                required
              />
              <button
                type="submit"
                className="px-6 shadow-sm shadow-[#FF623D] hover:shadow-none transition-all ease-in-out delay-100 hover:opacity-90 text-xs md:text-sm silka-medium text-white py-2.5 rounded bg-[#FF623D]"
              >
                Get Clip
              </button>
            </form>
          )}
        </div>
      </div>
      <ToolsTemplate
        faqs={[
          {
            question: 'How to download a Kick clip?',
            answer:
              'Just paste the link to the Kick clip in the Disperse tool. Then, click the download button and your Kick clip will be downloaded!',
          },
          {
            question: 'How do I save videos from Kick?',
            answer:
              'Disperse has a tool to download Kick clips! Download your Kick clips, then repurpose them on other platforms! To download a Kick clip, simply paste the link to the Kick clip in the Disperse tool. Then, click the download button and your Kick clip will be downloaded!',
          },
          {
            question:
              'How can I redistribute my content to other platforms?',
            answer:
              'Sign up for Disperse and download your Kick clips! Then redistribute them on all all social platforms.',
          },
          {
            question:
              'Are there watermarks on the downloaded videos?',
            answer:
              'No there are not! Disperse does not add any watermarks to the downloaded videos.',
          },
          {
            question: 'Can I get clips from someone else’s stream?',
            answer:
              'Yes, you can! You can get clips from any stream. Just get the clip and paste it on Disperse.',
          },
        ]}
        content1={{
          image: '/images/tools/kick-download.png',
          title: 'Link to Download Kick Clip',
          description:
            'Disperse has a tool to download Kick clips! Download your Kick clips, then repurpose them on other platforms! To download a Kick clip, simply paste the link to the Kick clip in the input box above and click "Get Clip".',
        }}
        content2={{
          image: '/images/tools/disperse-repurpose.png',
          title: 'Repurpose your content with Disperse!',
          description:
            'Disperse is a platform that allows you to repurpose your content on other platforms. Disperse allows you to download your Kick clips, then upload them to other platforms! Doing this, you can grow your audience on other platforms!',
        }}
        content3={{
          image: '/images/tools/kick-streaming.png',
          title: 'Kick Streaming Platform',
          description:
            'Kick is a streaming platform that allows you to stream your content to your audience. Kick is a great platform to grow your audience and make money from your content! Kick is a great platform to stream your content to your audience!',
        }}
        info_header="Download a Kick Clip with a Link"
        info_content1={
          <p>
            Disperse allows you to swiftly obtain video clips from
            Kick with a single click! Disperse empowers you to
            download content from Twitch, enabling you to edit,
            repurpose, and distribute them anywhere you choose. No
            watermarks, no compromise in video quality, and
            blazing-fast downloads!
          </p>
        }
        info_content2={
          <p>
            Optimize your Kick content for other social platforms. By
            using the platform, you can download your Kick clips, then
            upload them to other platforms! Doing this, you can grow
            your audience on other platforms!
          </p>
        }
      />
    </Container>
  );
}
