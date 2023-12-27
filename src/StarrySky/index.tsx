import React, { ReactNode, useEffect, useState } from 'react';
import { randomNumberWithinRange } from './utils';
import { Star, Content } from './components';

export type StarrySkyProps = {
  children: ReactNode;
  style?: React.CSSProperties;
  size: { width: number; height: number };
  starSize?: { min: number; max: number };
  starMargin?: { min: number; max: number };
  noOfShootingStars?: number;
  periodBetweenShootingStars?: { min: number; max: number };
  shootingAnimationDuration?: number;
};

const defaultStarSize = { min: 1, max: 4 };
const defaultStarMargin = { min: 40, max: 60 };
const defaultNoOfShootingStars = 10;
const defaultPeriodBetweenShootingStars = { min: 5, max: 10 };
const defaultShootingAnimationDuration = 2;

const StarrySky = ({
  children,
  style,
  size: propSize,
  starSize = defaultStarSize,
  starMargin = defaultStarMargin,
  noOfShootingStars = defaultNoOfShootingStars,
  periodBetweenShootingStars = defaultPeriodBetweenShootingStars,
  shootingAnimationDuration = defaultShootingAnimationDuration,
}: StarrySkyProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  let safeStarSizeMin = starSize.min;
  let safeStarSizeMax = starSize.max;

  let safeStarMarginMin = starMargin.min;
  let safeStarMarginMax = starMargin.max;

  let safeNoOfShootingStars = noOfShootingStars;

  let safePeriodBetweenShootingStarsMin = periodBetweenShootingStars.min;
  let safePeriodBetweenShootingStarsMax = periodBetweenShootingStars.max;

  let safeShootingAnimationDuration = shootingAnimationDuration;

  // handle negative prop values

  if (starSize.min < 0 || starSize.max < 0) {
    safeStarSizeMin = defaultStarSize.min;
    safeStarSizeMax = defaultStarSize.max;

    console.log('starSize reset to default value. Please use positive values.');
  }

  if (starMargin.min < 0 || starMargin.max < 0) {
    safeStarMarginMin = defaultStarMargin.min;
    safeStarMarginMax = defaultStarMargin.max;

    console.log('starMargin reset to default value. Please use positive values.');
  }

  if (noOfShootingStars < 0) {
    safeNoOfShootingStars = defaultNoOfShootingStars;

    console.log('noOfShootingStars reset to default value. Please use positive values.');
  }

  if (periodBetweenShootingStars.min < 0 || periodBetweenShootingStars.max < 0) {
    safePeriodBetweenShootingStarsMin = defaultPeriodBetweenShootingStars.min;
    safePeriodBetweenShootingStarsMax = defaultPeriodBetweenShootingStars.max;

    console.log('periodBetweenShootingStars reset to default value. Please use positive values.');
  }

  if (shootingAnimationDuration < 0) {
    safeShootingAnimationDuration = defaultShootingAnimationDuration;

    console.log('shootingAnimationDuration reset to default value. Please use positive values.');
  }

  // change sky size if document resized
  useEffect(() => {
    const sky = document.getElementById('sky') as Element;

    const resizeCallback = (
      setSize: ({ width, height }: { width: number; height: number }) => void
    ) => {
      const skyWidth = document.body.offsetWidth;
      const skyHeight = document.body.offsetHeight;

      if (size.width !== skyWidth || size.height !== skyHeight) {
        setSize({ width: skyWidth, height: skyHeight });
      }
    };

    const resizeObserver = new ResizeObserver(() => resizeCallback(setSize));

    resizeObserver.observe(sky);

    return () => resizeObserver.disconnect();
  }, []);

  // add css to document head
  useEffect(() => {
    const head = document.getElementsByTagName('head')[0];

    const keyframes = `@keyframes pulseSlow {
      0% {
        opacity: 0.2;
      }
      30% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
      70% {
        opacity: 0.6;
      }
      100% {
        opacity: 0.2;
      }
    }
    @keyframes pulseFast {
      0% {
        opacity: 0.2;
      }
      60% {
        opacity: 0.7;
      }
      100% {
        opacity: 0.2;
      }
    }
    @keyframes shoot {
      0% {
        transform: translatex(0px) translatey(0px);
      }
      30% {
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: translatex(500px) translatey(250px);
        opacity: 0;
      }
    }`;

    let styleTag = document.createElement('style');
    styleTag.innerHTML = keyframes;
    head.appendChild(styleTag);
  });

  // repaint sky on sky size change
  useEffect(() => {
    const sky = document.getElementById('sky') as Element;
    const star = document.getElementsByClassName('star')[0];

    const paintStars = () => {
      // arbitrary max number
      // assuming more stars won't be needed
      const STARS_TO_BE_PAINTED = 100000;

      for (let i = 1; i < STARS_TO_BE_PAINTED; i++) {
        const newStar: HTMLElement = star.cloneNode(true) as HTMLElement;

        // setting random widths, heights, margins and opacity
        const randomWidth = randomNumberWithinRange(safeStarSizeMin, safeStarSizeMax);
        const randomMargin = randomNumberWithinRange(safeStarMarginMin, safeStarSizeMax);
        const randomOpacity = Math.random();

        newStar.style.width = randomWidth + 'px';
        newStar.style.height = randomWidth + 'px';
        newStar.style.margin = randomMargin + 'px';
        newStar.style.opacity = String(randomOpacity);

        // setting blinking animation

        const mediumSize = Math.floor(safeStarMarginMax - safeStarMarginMin) / 2;

        // tiny, dull ones
        if (randomWidth <= mediumSize && randomOpacity <= 0.3)
          newStar.style.animation = `pulseFast 1s infinite`;

        // bigger, brighter ones
        if (randomWidth > mediumSize && randomOpacity >= 0.7)
          newStar.style.animation = `pulseSlow 1.6s infinite`;

        if (sky) {
          // append the new star to the sky
          sky.appendChild(newStar);

          // if sky overdlowing, remove new star and stop adding more
          if (sky.scrollHeight > sky.clientHeight) {
            sky.removeChild(newStar);
            break;
          }
        }
      }
    };

    if (size.width > 0 && size.height > 0) {
      document.querySelectorAll('.star').forEach(star => star.remove()); // remove all the stars
      sky.appendChild(star); // add default star that will be cloned
      paintStars(); // repaint

      // the animating

      // get all the stars
      const stars: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName(
        'star'
      ) as HTMLCollectionOf<HTMLElement>;

      let totalSecondsToWait = 0;

      for (let i = 0; i < safeNoOfShootingStars; i++) {
        const secondsToWaitAfterLastStar = randomNumberWithinRange(
          safePeriodBetweenShootingStarsMin,
          safePeriodBetweenShootingStarsMax
        );

        // choose a random star
        const randomStarIndex = randomNumberWithinRange(0, stars.length);

        totalSecondsToWait += secondsToWaitAfterLastStar;

        const randomStar = Array.from(stars)[randomStarIndex];

        setTimeout(() => {
          // set shooting animation
          randomStar.style.animation = `shoot ${safeShootingAnimationDuration}s 1`;

          // hide star after animation
          setTimeout(() => {
            randomStar.style.opacity = '0';
          }, safeShootingAnimationDuration * 1000);
        }, totalSecondsToWait * 1000);
      }
    }
  }, [size]);

  return (
    <div
      id='sky'
      style={{
        background:
          'linear-gradient(145deg, #18060b 20%, #201718 43%, #251f20 51%, #291e1f 72%, #18060b 90%)',
        ...style,
        width: `${propSize.width}%`,
        height: `${propSize.height}%`,
        display: 'flex',
        flexFlow: 'row wrap',
        position: 'relative',
      }}
    >
      <Star />
      <Content content={children} />
    </div>
  );
};

export default StarrySky;
