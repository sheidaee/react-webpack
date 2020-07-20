import { dataProvider } from '@utils/dataProvider/dataProvider';
import { endpoints } from '@modules/gallery/utils/endpoints';

async function getImageItem(id) {
  try {
    const res = dataProvider(endpoints.getGalleryItem(id), {
      responseType: 'blob',
    });

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { getImageItem };
