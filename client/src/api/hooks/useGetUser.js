import { useState, useEffect } from 'react';
import AuthService from '../authService';

const authService = new AuthService();

export default function useGetUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [err, setSet] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      let user;
      try {
        //Making the actual API call.
        user = await authService.isLoggedIn();
      } catch (err) {
        setSet(err);
        user = null;
      } finally {
        //Irregardless of the result we want to set state.
        setUser(user);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { loading, user, err };
}
