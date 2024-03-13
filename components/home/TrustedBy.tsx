import Image from 'next/image';
export function TrustedBy() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 lg:w-1/2 flex flex-row divide-x divide-dashed">
        <div className="w-1/4 px-6 lg:px-0 flex flex-col justify-center items-center py-3">
          <Image
            src="/images/mit.png"
            alt="A picture of the MIT logo."
            width={90 * 0.7}
            height={60 * 0.7}
            quality={100}
          />
        </div>
        <div className="w-1/4 px-4 lg:px-0 flex flex-col justify-center items-center py-3">
          <Image
            src="/images/mckinsey.png"
            alt="A picture of the Mckinsey & Co logo."
            width={198 * 0.7}
            height={61 * 0.7}
            quality={100}
          />
        </div>
        <div className="w-1/4 px-4 lg:px-0 flex flex-col justify-center items-center py-3">
          <Image
            src="/images/usc.png"
            alt="A picture of the USC logo."
            width={146.83 * 0.7}
            height={54 * 0.7}
            quality={100}
          />
        </div>
        <div className="w-1/4 px-4 lg:px-0 flex flex-col justify-center items-center py-3">
          <Image
            src="/images/microsoft.png"
            alt="A picture of the Microsoft logo."
            width={198 * 0.7}
            height={42.29 * 0.7}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
