import { Camper } from '@/app/types/catalog';
import css from './CamperDetails.module.css';
import { FaRegMap, FaStar } from 'react-icons/fa';
import CamperGallery from '../CamperGallery/CamperGallery';
import { GalleryImage } from '@/app/types/gallery';
import ReviewFeedbacks from '../ReviewFeedbacks/ReviewFeedbacks';
import { Feedback } from '@/app/types/feedback';
import BookForm from '../BookForm/BookForm';
type Props = {
  camper: Camper;
  feedbacks: Feedback[];
};

const CamperDetails = ({ camper, feedbacks }: Props) => {
  const galleryImages = (camper.gallery ?? [])
    .filter(
      (image): image is GalleryImage =>
        typeof image?.original === 'string' &&
        typeof image?.thumb === 'string' &&
        Boolean(image.original.trim() && image.thumb.trim()),
    )
    .sort((first, second) => first.order - second.order);

  const images: GalleryImage[] = galleryImages.length
    ? galleryImages
    : typeof camper.coverImage === 'string' && camper.coverImage.trim()
      ? [
          {
            id: `${camper.id}-cover`,
            camperId: camper.id,
            thumb: camper.coverImage,
            original: camper.coverImage,
            order: 1,
          },
        ]
      : [];

  return (
    <section className={css.main_container}>
      <div className={css.top_section}>
        <CamperGallery images={images} camperName={camper.name} />
        <div className={css.info_camper}>
          <div className={css.header_rating}>
            <div className={css.main_title}>
              <h2 className={`${css.title} ${css.name_car}`}>{camper.name}</h2>
              <div className={css.details}>
                <p className={css.detail_card}>
                  <FaStar color="#FFC531" /> {camper.rating}(
                  {camper.totalReviews} Reviews)
                </p>
                <p className={css.detail_card}>
                  <FaRegMap />
                  {camper.location}
                </p>
              </div>
              <h2 className={css.title}>€ {camper.price}</h2>
            </div>
            <div className={css.container_description}>
              <p className={css.description}>{camper.description}</p>
            </div>
          </div>
          <div className={css.details_car}>
            <h2 className={css.title_vehicle}>Vehicle details</h2>
            <div className={css.badges_containet}>
              <ul className={css.badges_list}>
                {camper.amenities.map((amenity) => (
                  <li key={amenity} className={css.badge}>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.line}></div>
            <div className={css.info_containet}>
              <ul className={css.info_list}>
                <li className={css.item}>
                  <div className={css.item_info}>
                    <p className={css.info}>Form</p>
                    <p className={css.info}>{camper.form}</p>
                  </div>
                </li>
                <li className={css.item}>
                  <div className={css.item_info}>
                    <p className={css.info}>Length</p>
                    <p className={css.info}>{camper.length}</p>
                  </div>
                </li>
                <li className={css.item}>
                  <div className={css.item_info}>
                    <p className={css.info}>Width</p>
                    <p className={css.info}>{camper.width}</p>
                  </div>
                </li>
                <li className={css.item}>
                  <div className={css.item_info}>
                    <p className={css.info}>Height</p>
                    <p className={css.info}>{camper.height}</p>
                  </div>
                </li>
                <li className={css.item}>
                  <div className={css.item_info}>
                    <p className={css.info}>Tank</p>
                    <p className={css.info}>{camper.tank}</p>
                  </div>
                </li>
                <li className={css.item}>
                  <div className={css.item_info}>
                    <p className={css.info}>Consumption</p>
                    <p className={css.info}>{camper.consumption}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={css.review_section}>
        <h2 className={css.title_reviews}>Reviews</h2>
        <div className={css.review_container}>
          <ReviewFeedbacks feedbacks={feedbacks} />
          <BookForm camperId={camper.id} />
        </div>
      </div>
    </section>
  );
};

export default CamperDetails;
