export function AdditionalCustomizations() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 lg:w-2/5 mt-16">
        <div className="flex flex-col space-y-4 w-full justify-center items-center">
          <p className="text-sm silka-semibold text-center">
            ENHANCE YOUR WORKSPACE
          </p>
          <h2 className="text-4xl text-center silka-medium text-[#4D4D4D]">
            Additional Customizations
          </h2>
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap md:space-x-3 lg:space-x-5 mt-12">
          <div className="w-full my-3 md:my-0 md:w-1/2 bg-[#EFEFF0] px-3 py-5 rounded-lg flex flex-row justify-between items-between">
            <p className="w-1/3 text-xs silka-medium mt-0.5">
              AUTOMATION
            </p>
            <div className="w-2/3 flex flex-col space-y-0.5">
              <p className="silka-medium">Execute live</p>
              <p className="slika-regular text-sm text-[#676767]">
                $10 per 1K automations
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-[#EFEFF0] px-3 py-5 rounded-lg flex flex-row justify-between items-between">
            <p className="w-1/3 text-xs silka-medium mt-0.5">
              STORAGE
            </p>
            <div className="w-2/3 flex flex-col space-y-0.5">
              <p className="silka-medium">More media space</p>
              <p className="silka-regular text-sm text-[#676767]">
                $10 per 200GB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
