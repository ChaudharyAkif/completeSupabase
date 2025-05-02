import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { supabase } from '../config/supabase';
import { message } from 'antd';

const AuthContext = createContext();

const initialState = {
  isAuth: false,
  user: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOGGED_IN':
      return { isAuth: true, user: payload.user };
    case 'SET_PROFILE':
      return { ...state, user: { ...state.user, ...payload.user } };
    case 'SET_LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setisAppLoading] = useState(true); // Initially loading

  const ReadData = useCallback(async (user) => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('uid', user.id) // Make sure 'uid' is correct in your database
      .single();

    if (data) {
      dispatch({ type: 'SET_LOGGED_IN', payload: { user: data } });
    } else {
      console.error('User not found or error:', error);
    }
  }, []);

  const getData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await ReadData(user);
      }
    } catch (error) {
      console.error('Error getting user:', error);
    } finally {
      setisAppLoading(false); // Loading finished
    }
  }, [ReadData]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'SET_LOGGED_OUT' });
    message.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, ReadData, handleLogOut, isAppLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
