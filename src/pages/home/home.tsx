import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleDelete = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default Home;
