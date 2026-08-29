import { Camper } from '@/app/types/catalog';
import css from './CamperItem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FaRegMap } from 'react-icons/fa';

type Props = {
  item: Camper;
};
const CamperItem = ({ item }: Props) => {
  return (
    <li className={css.card}>
      <Image
        className={css.img}
        src={item.coverImage}
        alt={item.name}
        width={219}
        height={240}
      />
      <div className={css.wrap_info}>
        <div className={css.wrap_title}>
          <h2 className={css.title_card}>{item.name}</h2>
          <h2 className={css.title_card}>€ {item.price}</h2>
        </div>
        <div className={css.info_car}>
          <div className={css.details}>
            <p className={css.detail_card}>
              <FaStar /> {item.rating}({item.totalReviews} Reviews)
            </p>
            <p className={css.detail_card}>
              <FaRegMap />
              {item.location}
            </p>
          </div>
          <p className={css.description}>{item.description}</p>
          <div className={css.items_car}>
            <span className={css.item}>{item.engine}</span>
            <span className={css.item}>{item.transmission}</span>
            <span className={css.item}>{item.form}</span>
          </div>
          <Link href="/" className={css.btn}>
            Show more
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CamperItem;
