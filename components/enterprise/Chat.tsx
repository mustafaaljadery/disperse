import Image from 'next/image';

export function EnterpriseChat() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-row space-x-12 mt-32">
        <div className="w-3/5">
          <Image
            alt="A picture of how enterprise customers can interact with their users on social."
            src="/images/enterprise-customers.png"
            width={764}
            height={495}
          />
        </div>
        <div className="w-2/5 flex flex-col space-y-3">
          <h2 className="silka-bold text-4xl"></h2>
          <p className="mt-6 silka-regular text-[#525252]"></p>
        </div>
      </div>
    </div>
  );
}
