import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="Spinner">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#63dd2f"
        ariaLabel="three-dots-loading"
        visible={true}
        wrapperStyle={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default Loader;
