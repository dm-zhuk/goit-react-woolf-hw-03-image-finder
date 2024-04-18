import css from './index.module.css';

const ImageGalleryItem = ({ item, onImageClick }) => (
  <li className={css['gallery-item']} onClick={() => onImageClick(item)}>
    <img
      className={css['gallery-image']}
      src={item.webformatURL}
      alt={item.tags}
    />
  </li>
);

export default ImageGalleryItem;
