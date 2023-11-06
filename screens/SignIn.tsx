import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { useAuth } from '../contexts/authContext';

const SignIn = ({ navigation }) => {
  const { authContext } = useAuth();

  function handleSignIn({ values }) {
    authContext.signIn({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          handleSignIn({ values });
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required('E-mail é um campo obrigatório.'),
          password: yup
            .string()
            .min(4)
            .max(10)
            .required('Senha é um campo obrigatório.'),
        })}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          values,
        }) => (
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="E-mail"
                autoCapitalize="none"
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Senha"
                secureTextEntry={true}
                autoCapitalize="none"
              />
              {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text>Faça o Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        style={styles.buttonSignUp}
      >
        <Text style={styles.textButton}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    color: 'red',
  },
  button: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonSignUp: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b94a',
    margin: 10,
  },
  textButton: {
    color: '#fff',
  },
});
