import { useSession, getSession } from 'next-auth/react';
import { LoadingScreen } from '../components/Loading';
import Router from 'next/router';

interface ProtectRouteProps {
  reRoute: string;
  children: JSX.Element;
}

interface CanAccessWorkspaceProps {
  children: JSX.Element;
}

export function CanAccessWorkspace({
  children,
}: CanAccessWorkspaceProps) {}

export function ProtectRoute({ children }: ProtectRouteProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'unauthenticated') {
    Router.push('/');
    return <p>Unauthenticated</p>;
  }

  return <>{children}</>;
}
