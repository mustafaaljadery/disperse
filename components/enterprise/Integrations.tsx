import Image from 'next/image';
export function Integrations() {
  return (
    <div className="flex flex-col justify-center items-center w-full mt-32">
      <div className="w-3/5 flex flex-row">
        <div className="w-3/5 flex flex-col justify-center items-start pr-52">
          <h2 className="silka-bold text-4xl">
            Automated Workflow, Made Easy
          </h2>
          <p className="mt-6 silka-regular text-[#525252]">
            Your workspace simplified. Our integrations work natively
            with your favorite tools. Customize your workflow for your
            needs.
          </p>
        </div>
        <div className="w-2/5">
          <Image
            alt="A picture of the list of integrations for enterprise."
            src="/images/enterprise-integrations.png"
            width={491}
            height={522}
          />
        </div>
      </div>
    </div>
  );
}
