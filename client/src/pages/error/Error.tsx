import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-500">Page Not Found</h1>
        <p className="text-2xl mt-4">
          The page you are looking for was not found. Go back to{' '}
          <Link to="/" className="text-blue-500 underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
