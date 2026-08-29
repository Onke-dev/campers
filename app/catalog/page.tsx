import { getCampers } from '../lib/api/clientApi';

const Campers = async () => {
  const campers = await getCampers();

  console.log('Campers', campers);
  return <div>111</div>;
};

export default Campers;
