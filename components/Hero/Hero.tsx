import Link from 'next/link';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.container_hero}>
        <h1 className={css.main_title}>Campers of your dreams</h1>
        <p className={css.description}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.btn}>
          View Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
