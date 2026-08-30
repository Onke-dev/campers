import { FaStar } from 'react-icons/fa';
import type { Feedback } from '@/app/types/feedback';
import css from './Review.module.css';

type Props = {
  feedbacks: Feedback[];
};

const ReviewFeedbacks = ({ feedbacks }: Props) => {
  return (
    <ul className={css.feedbacks_list}>
      {feedbacks.map((feedback) => (
        <li key={feedback.id} className={css.feedback_card}>
          <div className={css.author}>
            <span className={css.avatar}>
              {feedback.reviewer_name[0].toUpperCase()}
            </span>

            <div className={css.container_feedback}>
              <p className={css.name}>{feedback.reviewer_name}</p>

              <div className={css.container_star}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < feedback.reviewer_rating
                        ? css.star_active
                        : css.star_inactive
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <p className={css.comment}>{feedback.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReviewFeedbacks;
