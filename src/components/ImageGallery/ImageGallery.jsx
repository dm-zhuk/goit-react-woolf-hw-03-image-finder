import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './index.module.css';

const ImageGallery = ({ images, onImageClick, galleryRef }) => (
  <ul className={css.gallery} ref={galleryRef}>
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
