import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthContext = React.createContext({
  authContext: {
    signIn: (data) => {},
    signOut: () => {},
    signUp: (data) => {},
  },
  state: {
    isLoading: true,
    isSignout: false,
    userToken: null,
  },
});

function AuthProvider({ children }) {
  const auth = getAuth();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Verifique se o usuário está logado
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restaurar o token falho
        console.error(e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const { email, password } = data;

        try {
          // O método signInWithEmailAndPassword retorna um objeto do tipo UserCredential
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          // O token do usuário só é obtido após a autenticação
          const userToken = await userCredential.user.getIdToken();

          // Lembre-se de que, em uma aplicação de produção, precisamos armazenar o token
          await SecureStore.setItemAsync('userToken', userToken);

          // Aqui, definimos o token do usuário no estado global
          dispatch({ type: 'SIGN_IN', token: userToken });
        } catch (error) {
          console.log(error);
        }
      },
      signOut: async () => {
        // Em uma aplicação de produção, precisamos remover o token do usuário do armazenamento
        await SecureStore.deleteItemAsync('userToken');

        // O token do usuário é removido do estado global
        dispatch({ type: 'SIGN_OUT' });
      },

      signUp: async (data) => {
        // O método createUserWithEmailAndPassword retorna um objeto do tipo UserCredential
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        // O token do usuário só é obtido após a autenticação
        const userToken = await userCredential.user.getIdToken();

        // Lembre-se de que, em uma aplicação de produção, precisamos armazenar o token
        await SecureStore.setItemAsync('userToken', userToken);

        // Aqui, definimos o token do usuário no estado global
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        authContext,
        state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
