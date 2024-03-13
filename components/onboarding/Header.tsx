import { CheckMarkGreenSmall } from '../icons/CheckMark';
import Link from 'next/link';
import { LeftCaretSmall } from '../icons/LeftCaret';

interface Props {
  signup: string;
  user: string;
  workspace: string;
  team: string;
  socials: string;
  previousUrl: string;
}
export function OnboardingHeader({
  signup,
  user,
  workspace,
  team,
  socials,
  previousUrl,
}: Props) {
  return (
    <header className="hidden md:flex flex-row justify-between items-beween mt-8 w-full px-8">
      <Link href="/" legacyBehavior>
        <div className="invisible flex flex-row space-x-2 my-auto">
          <LeftCaretSmall />
          <Link href="/" className="silka-medium text-[#595959]">
            Back
          </Link>
        </div>
      </Link>
      <div className="flex flex-row space-x-12">
        <div className="flex flex-row space-x-2">
          <div
            className={
              `w-5 h-5 text-sm my-auto flex flex-col justify-center items-center rounded silka-bold ` +
              (signup == 'green'
                ? 'bg-[#C7E9DC] text-[#44B48B]'
                : signup == 'orange'
                ? 'bg-[#FFC0B1] text-[#FF623D]'
                : 'bg-[#EBEBEB] text-[#ADADAD]')
            }
          >
            {signup == 'green' ? <CheckMarkGreenSmall /> : <p>1</p>}
          </div>
          <a
            className={
              'text-sm silka-medium my-auto hover:opacity-90 ' +
              (signup == 'green'
                ? 'text-[#44B48B]'
                : signup == 'orange'
                ? 'text-[#FF623D]'
                : 'text-[#ADADAD]')
            }
          >
            Sign up
          </a>
        </div>
        <div className="flex flex-row space-x-2">
          <div
            className={
              `w-5 h-5 text-sm my-auto flex flex-col justify-center items-center rounded silka-bold ` +
              (user == 'green'
                ? 'bg-[#C7E9DC] text-[#44B48B]'
                : user == 'orange'
                ? 'bg-[#FFC0B1] text-[#FF623D]'
                : 'bg-[#EBEBEB] text-[#ADADAD]')
            }
          >
            {user == 'green' ? <CheckMarkGreenSmall /> : <p>2</p>}
          </div>
          <a
            className={
              'silka-medium text-sm my-auto hover:opacity-90 ' +
              (user == 'green'
                ? 'text-[#44B48B]'
                : user == 'orange'
                ? 'text-[#FF623D]'
                : 'text-[#ADADAD]')
            }
          >
            User
          </a>
        </div>
        <div className="flex flex-row space-x-2">
          <div
            className={
              `w-5 h-5 text-sm my-auto flex flex-col justify-center items-center rounded silka-bold ` +
              (workspace == 'green'
                ? 'bg-[#C7E9DC] text-[#44B48B]'
                : workspace == 'orange'
                ? 'bg-[#FFC0B1] text-[#FF623D]'
                : 'bg-[#EBEBEB] text-[#ADADAD]')
            }
          >
            {workspace == 'green' ? (
              <CheckMarkGreenSmall />
            ) : (
              <p className="">3</p>
            )}
          </div>
          <a
            className={
              'silka-medium text-sm my-auto hover:opacity-90 ' +
              (workspace == 'green'
                ? 'text-[#44B48B]'
                : workspace == 'orange'
                ? 'text-[#FF623D]'
                : 'text-[#ADADAD]')
            }
          >
            Workspace
          </a>
        </div>
        <div className="flex flex-row space-x-2">
          <div
            className={
              `w-5 h-5 text-sm my-auto flex flex-col justify-center items-center rounded silka-bold ` +
              (team == 'green'
                ? 'bg-[#C7E9DC] text-[#44B48B]'
                : team == 'orange'
                ? 'bg-[#FFC0B1] text-[#FF623D]'
                : 'bg-[#EBEBEB] text-[#ADADAD]')
            }
          >
            {team == 'green' ? <CheckMarkGreenSmall /> : <p>4</p>}
          </div>
          <a
            className={
              'silka-medium text-sm my-auto hover:opacity-90 ' +
              (team == 'green'
                ? 'text-[#44B48B]'
                : team == 'orange'
                ? 'text-[#FF623D]'
                : 'text-[#ADADAD]')
            }
          >
            Team
          </a>
        </div>
        <div className="flex flex-row space-x-2">
          <div
            className={
              `w-5 h-5 text-sm my-auto flex flex-col justify-center items-center rounded silka-bold ` +
              (socials == 'green'
                ? 'bg-[#C7E9DC] text-[#44B48B]'
                : socials == 'orange'
                ? 'bg-[#FFC0B1] text-[#FF623D]'
                : 'bg-[#EBEBEB] text-[#ADADAD]')
            }
          >
            {socials == 'green' ? <CheckMarkGreenSmall /> : <p>5</p>}
          </div>
          <a
            className={
              'silka-medium text-sm my-auto hover:opacity-90 ' +
              (socials == 'green'
                ? 'text-[#44B48B]'
                : socials == 'orange'
                ? 'text-[#FF623D]'
                : 'text-[#ADADAD]')
            }
          >
            Socials
          </a>
        </div>
      </div>
      <div className="invisible flex flex-row space-x-2 my-auto">
        <LeftCaretSmall />
        <Link href={previousUrl} className="silka-medium text-[#595959]">
          Back
        </Link>
      </div>
    </header>
  );
}
