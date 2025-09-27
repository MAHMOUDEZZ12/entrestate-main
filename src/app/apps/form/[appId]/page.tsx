import { notFound } from 'next/navigation';
import { appsRegistry } from '@/lib/apps/io';
import { AppFormClient } from './client';

type PageProps = {
  params: Promise<{ appId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AppFormPage({ params }: PageProps) {
  const { appId } = await params;
  const app = appsRegistry.find((entry) => entry.id === appId);
  if (!app) {
    notFound();
  }
  return <AppFormClient app={app} />;
}
