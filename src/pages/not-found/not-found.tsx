import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
      <h2 style={{ margin: '16px 0' }}>Sahifa topilmadi</h2>
      <p>Bu sahifa mavjud emas yoki noto‘g‘ri URL kiritildi.</p>
      <Link
        to="/"
        style={{
          marginTop: '24px',
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
