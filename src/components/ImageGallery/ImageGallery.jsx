import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './index.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.gallery}>
    {images.map((image, index) => (
      <ImageGalleryItem
        key={`${image.id}-${index}`}
        item={image}
        onImageClick={onImageClick}
      />
    ))}
  </ul>
);

export default ImageGallery;
