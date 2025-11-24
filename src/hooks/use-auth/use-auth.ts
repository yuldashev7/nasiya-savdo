export const useAuth = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  return {
    user: token
      ? {
          token,
          role,
        }
      : null,
  };
};
