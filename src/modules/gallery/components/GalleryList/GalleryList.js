import React, { useState, useEffect } from 'react';
import { getImageItem } from '@modules/gallery/utils/dataProvider/dataClient';
import { debounce } from '@modules/gallery/utils/helpers/debounce';
import GalleryListItem from '@modules/gallery/components/GalleryList/GalleryListItem';

import './styles.less';
import Loading from '@components/Loading';

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

const listItemsCount = 16;

const GalleryList = () => {
  const [imageSrcList, setImageSrcList] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const listIsInit = React.useRef(false);

  const getImageList = async (count) => {
    const imageListPromise = Array(count)
      .fill(null)
      .map(async (i) => {
        const blob = getImageItem(getRandomNumber());

        return blob;
      });

    const images = [];

    setImageLoading(true);
    const imagePromises = await Promise.all(imageListPromise);
    imagePromises.forEach((imageItemBlob) => {
      const url = URL.createObjectURL(imageItemBlob);

      images.push(url);
    });

    setImageSrcList((prevImages) => [...prevImages, ...images]);
    setImageLoading(false);
  };

  const handleScroll = React.useCallback(async () => {
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyScrollHeight = document.body.scrollHeight;
    const sum = Math.ceil(innerHeight + scrollY);
    console.table({ innerHeight, scrollY, bodyScrollHeight, sum });

    if (sum >= bodyScrollHeight) {
      getImageList(4);
    }
  }, []);

  useEffect(() => {
    if (listIsInit.current) {
      return;
    }
    getImageList(listItemsCount);
    listIsInit.current = true;
    window.addEventListener('scroll', debounce(handleScroll, 2000));
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (imageLoading || imageSrcList.length < 17) {
      return;
    }

    const top = document.documentElement.scrollHeight;
    const result = top - 800;
    window.scrollTo({
      top: result,
      behavior: 'smooth',
    });
  }, [imageLoading, imageSrcList]);

  if (imageLoading) return <Loading />;

  return (
    <div className="galleryListWrapper">
      {imageSrcList.map((imageSrc, i) => (
        <GalleryListItem key={i} src={imageSrc} />
      ))}
    </div>
  );
};

export default GalleryList;
