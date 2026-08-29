import CamperList from '@/components/CamperList/CamperList';
import { getCampers } from '../lib/api/clientApi';

const Campers = async () => {
  const response = await getCampers();

  return (
    <section>
      {response?.campers?.length > 0 && (
        <CamperList campers={response.campers} />
      )}
    </section>
  );
};

export default Campers;
