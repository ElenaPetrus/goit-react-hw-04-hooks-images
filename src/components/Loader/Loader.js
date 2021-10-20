import NewLoader from 'react-loader-spinner';

function Loader() {
  return (
    <div className="loader">
      <NewLoader
        type="ThreeDots"
        color="#3f51b5"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    </div>
  );
}

export { Loader };
