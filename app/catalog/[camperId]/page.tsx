import type { Metadata } from 'next';
import { getCamperById, getReviews } from '@/app/lib/api/clientApi';
import CamperDetails from '@/components/CamperDetails/CamperDetails';

type Props = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getCamperById(camperId);

    return {
      title: camper.name,
      description: camper.description,
      openGraph: {
        title: camper.name,
        description: camper.description,
      },
      twitter: {
        title: camper.name,
        description: camper.description,
      },
    };
  } catch {
    return {
      title: 'Camper details',
      description: 'View camper details and book your next journey.',
    };
  }
}

const PageDetails = async ({ params }: Props) => {
  const { camperId } = await params;

  const [camper, feedbacks] = await Promise.all([
    getCamperById(camperId),
    getReviews(camperId),
  ]);

  return <CamperDetails camper={camper} feedbacks={feedbacks} />;
};

export default PageDetails;
