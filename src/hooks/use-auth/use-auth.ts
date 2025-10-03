export const useAuth = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return {
    user: token
      ? {
          token,
          role,
        }
      : null,
  };
};
