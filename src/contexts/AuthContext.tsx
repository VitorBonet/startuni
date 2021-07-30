import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';

type User = {
  name: string;
  profileName: string;
  profileLink: string;
  email: string;
  avatarUrl: string;
  permissions: string[];
  roles: string[];
}

type SinInCredentials = {
  email: string;
  password: string;
}

type SinInUserSocial = {
  id: string;
  email: string;
  name: string;
  acessToken: string;
}

type SaveSingIn = {
  user: User;
  token: string;
  refreshToken: string;
  permissions: string[];
  roles: string[];
}

type SingInResponse = {
  error: boolean;
  code: string;
}

type AuthContextData = {
  signIn: (credentials: SinInCredentials) => Promise<SingInResponse>;
  updateUser: () => void;
  signInFacebook: (credentials: SinInUserSocial) => Promise<SingInResponse>;
  signInGoogle: (credentials: SinInUserSocial) => Promise<SingInResponse>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export async function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('singOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        // case 'singIn':
        //   Router.push('/dashboard');
        //   break;
        case 'singOut':
          signOut();
          break;
        default: 
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if(token) {
      updateUser();
    }
  }, [])

  async function updateUser() {
    api.get('/me').then(response => {
      const { user, permissions, roles } = response.data;

      setUser({ 
        name: user.name, 
        profileName: user.profileName, 
        profileLink: user.profileLink, 
        email: user.email, 
        avatarUrl: user.avatarUrl, 
        permissions, 
        roles 
      });
    }).catch(() => {
      signOut();
    })
  }

  async function signInFacebook({ email, acessToken }: SinInUserSocial) {
    try {
      
      const response = await api.post('facebook/sessions', {
        email,
        token: acessToken,
      })
      
      const { user, token, refreshToken, permissions, roles } = response.data;

      const save = await saveSingIn({ user, token, refreshToken, permissions, roles });

      return { error: !save, code: '' };
    } catch (error) {
      if(error.response?.data) {
        return { error: true, code: error.response.data.code };
      }

      return { error: true, code: '' };
    }
  }

  async function signInGoogle({ email, acessToken }: SinInUserSocial) {
    try {
      
      const response = await api.post('google/sessions', {
        email,
        token: acessToken,
      })
      
      const { user, token, refreshToken, permissions, roles } = response.data;

      const save = await saveSingIn({ user, token, refreshToken, permissions, roles });

      return { error: !save, code: '' };
    } catch (error) {
      if(error.response?.data) {
        return { error: true, code: error.response.data.code };
      }

      return { error: true, code: '' };
    }
  }

  async function signIn({ email, password }: SinInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })
      
      const { user, token, refreshToken, permissions, roles } = response.data;

      const save = await saveSingIn({ user, token, refreshToken, permissions, roles });

      return { error: !save, code: '' };
    } catch (error) {
      return { error: true, code: error.response.data.code };
    }
  }

  async function saveSingIn({ user, token, refreshToken, permissions, roles }: SaveSingIn) {
    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    setUser({
      name: user.name, 
      profileName: user.profileName, 
      profileLink: user.profileLink, 
      email: user.email, 
      avatarUrl: user.avatarUrl,
      permissions,
      roles
    });

    api.defaults.headers['Authorization'] = `Baerer ${token}`;
    return true;
  }
  
  return (
    <AuthContext.Provider
      value={{
        signIn,
        updateUser,
        signInFacebook,
        signInGoogle,
        isAuthenticated,
        user,
        signOut
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}