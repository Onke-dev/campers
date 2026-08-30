import { getCamperById, getReviews } from '@/app/lib/api/clientApi';
import CamperDetails from '@/components/CamperDetails/CamperDetails';

type Props = {
  params: Promise<{ camperId: string }>;
};

const PageDetails = async ({ params }: Props) => {
  const { camperId } = await params;

  const [camper, feedbacks] = await Promise.all([
    getCamperById(camperId),
    getReviews(camperId),
  ]);

  return <CamperDetails camper={camper} feedbacks={feedbacks} />;
};

export default PageDetails;
