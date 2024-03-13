import Container from '../components/Container';
import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/apiUrl';
import toast from 'react-hot-toast';

async function handleSubmit(
  firstName: string,
  lastName: string,
  workEmail: string,
  companyName: string,
  message: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}other/contact`,
      null,
      {
        params: {
          firstName: firstName,
          lastName: lastName,
          workEmail: workEmail,
          companyName: companyName,
          message: message,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Container
      title="Contact Our Team For Support - Disperse"
      description="Contact our team for support. We'll get back to you within 24 hours."
    >
      <div className="flex flex-col justify-center items-center">
        <div className="w-[90%] md:w-1/2 flex flex-col md:flex-row mt-12 md:mt-20 md:space-x-16">
          <div className="w-full md:w-1/2 my-auto flex flex-col">
            <h1 className="text-4xl text-[#363636] silka-bold">
              Contact Our Team
            </h1>
            <p className="text-base silka-regular mt-2.5 text-gray-400">
              Let us know how we can help! We&apos;ll get back to you
              within 24 hours.
            </p>
            <div className="mt-4"></div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                firstName,
                lastName,
                email,
                companyName,
                message
              );
              setFirstName('');
              setLastName('');
              setEmail('');
              setCompanyName('');
              setMessage('');
              toast.success('Message Sent!', {
                className: 'text-sm silka-medium text-gray-900',
              });
            }}
            className="flex flex-col w-full mt-4 md:my-auto md:w-1/2"
          >
            <div className="flex flex-row space-x-2 w-full">
              <div className="w-1/2 flex flex-col space-y-1.5">
                <label className="text-xs silka-regular text-gray-700">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="rounded text-xs silka-medium border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D] py-2 px-2.5 w-full"
                  placeholder="John"
                  type="text"
                  required
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1.5">
                <label className="text-xs silka-regular text-gray-700">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="rounded text-xs silka-medium border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D] py-2 px-2.5 w-full"
                  type="text"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="mt-5 w-full flex flex-col space-y-1.5">
              <label className="text-xs silka-medium text-gray-700">
                Work Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded text-xs silka-medium border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D] py-2 px-2.5 w-full"
                type="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="mt-5 w-full flex flex-col space-y-1.5">
              <label className="text-xs silka-medium text-gray-700">
                Company Name
              </label>
              <input
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                className="rounded text-xs silka-medium border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D] py-2 px-2.5 w-full"
                placeholder="Disperse"
                required
                type="text"
              />
            </div>
            <div className="mt-5 w-full flex flex-col space-y-1.5">
              <label className="text-xs silka-regular text-gray-700">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className="rounded resize-none text-xs h-44 silka-medium border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D] py-2 px-2.5 w-full"
                placeholder="How can we help?"
                required
              />
            </div>
            <button className="mt-8 w-fit px-6 py-1.5 bg-[#FF623D] text-white text-sm silka-medium rounded transition-all delay-100 ease-in-out hover:opacity-90">
              Submit
            </button>
          </form>
        </div>
        <div className="mt-16 md:mt-28 mb-24 md:mb-32 w-[90%] md:w-1/2 flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-6">
          <div className="w-full md:w-1/3 p-4 rounded-lg shadow-md shadow-[#FF623D] bg-[#FF623D] flex flex-col justify-between items-between">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg silka-semibold text-white">
                Live Chat
              </h3>
              <p className="text-xs silka-medium text-gray-100">
                Get support from the Disperse team as quickly as
                possible.
              </p>
            </div>
            <div className="flex-1 h-full" />
            <button
              onClick={() => {
                window.$crisp.push(['do', 'chat:open']);
              }}
              className="w-full mt-12 bg-white rounded py-2.5 text-xs silka-semibold hover:opacity-90 text-[#FF623D]"
            >
              Live Chat
            </button>
          </div>
          <div className="w-full md:w-1/3 p-4 rounded-lg shadow-md shadow-[#404DED] bg-[#404DED] flex flex-col justify-between items-between">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg silka-semibold text-white">
                Discord Community
              </h3>
              <p className="text-xs silka-medium text-gray-100">
                Join our Discord community to learn more about organic
                content management and more.
              </p>
            </div>
            <div className="flex-1 h-full" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.com/invite/C5PGFQdnJV"
            >
              <button className="w-full mt-12 bg-white rounded py-2.5 text-xs silka-semibold hover:opacity-90 text-[#404DED]">
                Join Discord
              </button>
            </a>
          </div>
          <div className="w-full md:w-1/3 p-4 rounded-lg shadow-md shadow-black bg-black flex flex-col justify-between items-between">
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg silka-semibold text-white">
                Email Us
              </h3>
              <p className="text-xs silka-medium text-gray-100">
                Email us and we will get back to you within 24 hours.
              </p>
            </div>
            <div className="flex-1 h-full" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:max@trydisperse.com"
            >
              <button className="w-full mt-12 bg-white rounded py-2.5 text-xs silka-semibold hover:opacity-90 text-[#363636]">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
