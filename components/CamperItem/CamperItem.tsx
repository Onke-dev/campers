import { Camper } from '@/app/types/catalog';
import css from './CamperItem.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { FaRegMap } from 'react-icons/fa';

type Props = {
  item: Camper;
  isLcpImage?: boolean;
};
const CamperItem = ({ item, isLcpImage = false }: Props) => {
  return (
    <li className={css.card}>
      <Image
        className={css.img}
        src={item.coverImage}
        alt={item.name}
        width={219}
        height={240}
        loading={isLcpImage ? 'eager' : 'lazy'}
      />
      <div className={css.wrap_info}>
        <div className={css.wrap_title}>
          <h2 className={css.title_card}>{item.name}</h2>
          <h2 className={css.title_card}>€ {item.price}</h2>
        </div>
        <div className={css.info_car}>
          <div className={css.details}>
            <p className={css.detail_card}>
              <FaStar color="#FFC531" /> {item.rating}({item.totalReviews}{' '}
              Reviews)
            </p>
            <p className={css.detail_card}>
              <FaRegMap />
              {item.location}
            </p>
          </div>
          <p className={css.description}>{item.description}</p>
          <div className={css.items_car}>
            <span className={css.item}>
              <svg className={css.icon} aria-label="Engine of car">
                <use href="/sprite.svg#icon-engine"></use>
              </svg>
              {item.engine}
            </span>
            <span className={css.item}>
              <svg className={css.icon} aria-label="Transmission of car">
                <use href="/sprite.svg#icon-transmission"></use>
              </svg>
              {item.transmission}
            </span>
            <span className={css.item}>
              <svg className={css.icon} aria-label="Form of car">
                <use href="/sprite.svg#icon-form"></use>
              </svg>
              {item.form}
            </span>
          </div>
          <Link
            href={`/catalog/${item.id}`}
            className={css.btn}
            target="_blank"
            rel="noreferrer"
          >
            Show more
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CamperItem;
