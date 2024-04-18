import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return (
    <ThreeDots
      height="120"
      width="120"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      visible={isLoading}
      wrapperStyle={{
        position: 'fixed',
        top: '4%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
      }}
    />
  );
};

export default Loader;
