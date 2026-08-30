'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import css from './CamperGallery.module.css';
import { GalleryImage } from '@/app/types/gallery';

type Props = {
  images: GalleryImage[];
  camperName: string;
};

const CamperGallery = ({ images, camperName }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const showThumbs = images.length > 1;

  if (!images.length) return null;

  return (
    <div className={css.imgs} aria-label={`Gallery of ${camperName}`}>
      <Swiper
        rewind={showThumbs}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className={css.main_swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <Image
              className={css.main_image}
              src={image.original}
              alt={`${camperName}, photo ${index + 1}`}
              width={638}
              height={505}
              priority={index === 0}
              sizes="(max-width: 767px) 100vw, 630px"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showThumbs && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={16}
          slidesPerView={4}
          watchSlidesProgress
          freeMode
          modules={[FreeMode, Thumbs]}
          className={css.thumbs_swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <Image
                className={css.thumb_image}
                src={image.thumb}
                alt={`Open photo ${index + 1}`}
                width={136}
                height={144}
                sizes="145px"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CamperGallery;
