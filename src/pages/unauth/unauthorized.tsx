import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Ruxsat yo‘q</h1>
      <p className="text-lg mb-6">
        Sizda bu sahifaga kirish huquqi mavjud emas.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default Unauthorized;
