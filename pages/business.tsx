import Container from '../components/Container';
import Link from 'next/link';
import Image from 'next/image';
import FiveStarImage from '../public/images/5-star.png';
import BusinessImage from '../public/images/business-image.png';
import BusinessDistribute from '../public/images/business-distribute.png';
import AmieLeonDoreImage from '../public/images/amieleondore.png';
import LiquidDeathImage from '../public/images/liquiddeath.gif';

export default function Business() {
  return (
    <Container
      title="Disperse for Teams and Businesses"
      description="Disperse is the best way to manage your content strategy for your business. Create, distribute, and analyze your content all in one place."
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-[90%] md:w-3/4 xl:w-3/5 py-20 md:py-28 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <Image
              src={FiveStarImage}
              className="w-[60px] h-fit my-auto"
              alt="5 Star Rating"
            />
            <span className="text-center silka-bold text-[#FF623D] my-auto text-[11px] md:text-sm">
              TRUSTED BY 1000+ SMALL BUSINESSES
            </span>
          </div>
          <h1 className="text-center mt-6 silka-bold text-4xl md:text-5xl text-[#363636]">
            Build A Content Strategy
          </h1>
          <p className="text-center mt-6 silka-regular text-xs md:text-sm text-gray-500">
            Communicate to your customers your values. Build a company
            your customers truly care about.
          </p>
          <div className="flex flex-row mt-10 space-x-4 md:space-x-6 justify-between items-between">
            <Link href="/signup" legacyBehavior>
              <button className="bg-[#FF623D] h-fit my-auto px-5 py-2 rounded text-xs md:text-sm silka-medium text-white border border-[#FF623D] transition-all delay-100 ease-in-out hover:opacity-90">
                Get Started Free
              </button>
            </Link>
            <a
              href="https://calendly.com/trydisperse/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-5 py-2 border h-fit my-auto border-[#FF623D] rounded text-[#FF623D] silka-medium text-xs md:text-sm transition-all delay-100 ease-in-out hover:opacity-80">
                Book a Demo
              </button>
            </a>
          </div>
        </div>
        <div className="py-20 md:py-28 bg-[#F9F9F9] w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-4/5 xl:w-3/5 flex flex-col md:flex-row md:space-x-12">
            <div className="w-full md:w-1/2 my-auto flex flex-col">
              <h2 className="text-3xl xl:text-4xl silka-bold text-[#363636]">
                The Ultimate Distribution Platform
              </h2>
              <p className="mt-4 silka-regular text-sm xl:text-base text-gray-400">
                Organic is the ultimate distribution channel as your
                brand builds immense trust within a community with an
                incredibly low customer acquisition cost.
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:my-auto">
              <Image
                src={BusinessImage}
                alt="Repurpose Your Content"
              />
            </div>
          </div>
        </div>
        <div className="py-10 md:py-12 bg-black w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-3/4 xl:w-3/5 flex flex-col md:flex-row">
            <p className="w-full md:w-1/4 text-2xl silka-bold text-white my-auto">
              60-Day Money Back Guarantee{''}
              <span className="text-[#FF623D]">.</span>
            </p>
            <div className="flex-1" />
            <p className="w-full md:w-2/3 text-sm md:text-base silka-regular mt-4 md:my-auto text-gray-300">
              At Disperse, if you are not happy with our product, or
              the experience, you may request a 100% refund within 60
              days.
            </p>
          </div>
        </div>
        <div className="py-20 md:py-40 bg-[#FF623D] w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-3/4 xl:w-3/5 flex flex-col md:flex-row md:space-x-16">
            <div className="w-full md:w-1/2 my-auto">
              <Image
                src={BusinessDistribute}
                alt="Redistribute Short Clips"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col mt-10 md:my-auto">
              <div className="flex flex-row space-x-2">
                <span className="text-[11px] xl:text-xs silka-bold text-white">
                  ORGANIC CONTENT
                </span>
              </div>
              <h2 className="text-4xl xl:text-5xl mt-4 md:mt-6 silka-bold text-white">
                Short Clips
              </h2>
              <span className="mt-4 text-sm xl:text-base silka-medium text-white">
                Larger Audience, Same Content
              </span>
              <p className="mt-6 silka-regular text-gray-200 text-xs xl:text-sm">
                Increase your reach by recycling your long content,
                into multiple pieces of short-form content. Exploit
                the social graph algorithms that favor short pieces of
                addictive content over, long-form content with low
                watch rate.
              </p>
              <Link href="/signup" legacyBehavior>
                <button className="mt-10 w-fit px-5 py-1.5 text-xs xl:text-sm silka-medium text-[#FF623D] bg-white rounded transition-all ease-in-out delay-100 hover:opacity-90">
                  Try Disperse Free
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-20 md:py-32 w-[90%] md:w-3/4 xl:w-3/5 flex flex-col justify-center items-center">
          <p className="text-[#FF623D] silka-bold text-xs text-center">
            COMMODITY VS DIFFERENTIATED PRODUCT
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl xl:text-5xl silka-bold text-[#363636] text-center">
            The newest, most popular, consumer products are all moving
            to orgranic.
          </h2>
          <div className="flex flex-col md:flex-row mt-10 md:mt-20 md:space-x-10 w-full">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
              <Image alt="Amie Leon Dore" src={AmieLeonDoreImage} />
              <p className="silka-semibold mt-7 text-sm text-[#363636]">
                [AMIE LEON DORE]
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-10 md:my-auto flex flex-col justify-center items-center">
              <Image src={LiquidDeathImage} alt="Liquid Death" />
              <p className="mt-7 silka-semibold text-sm text-[#363636]">
                [LIQUID DEATH]
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
