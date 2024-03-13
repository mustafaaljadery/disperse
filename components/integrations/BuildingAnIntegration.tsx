import Link from 'next/link';

export function BuildingAnIntegration() {
  return (
    <section className="flex flex-col justify-center items-center bg-[#1E1E1E]">
      <div className="w-5/6 lg:w-1/2 flex flex-col py-16 lg:py-20">
        <h2 className="text-4xl lg:text-5xl text-center text-white silka-semibold">
          Building an Integration?
        </h2>
        <div className="flex flex-col justify-center items-center">
          <p className="w-5/6 lg:w-4/5 mt-6 silka-medium text-md lg:text-xl text-[#DADADA] text-center">
            Have a cool idea for an integration? Lets work together on
            building something truly great.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-8 lg:mt-10">
          <Link href="/contact" legacyBehavior>
            <div className="bg-white rounded-xl py-2 px-8 w-fit h-fit">
              <Link href="/contact" className="silka-semibold text-sm lg:text-lg">
                
                  Contact Us
                
              </Link>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
