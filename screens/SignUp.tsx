import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';
import { useAuth } from '../contexts/authContext';

const SignUp = () => {
  const { authContext } = useAuth();

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={(values) =>
          authContext.signUp({
            email: values.email,
            password: values.password,
          })
        }
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('E-mail inválido.')
            .required('E-mail é um campo obrigatório.'),
          password: yup
            .string()
            .min(4, 'Senha deve ter no mínimo 4 caracteres.')
            .max(10, 'Senha deve ter no máximo 10 caracteres.')
            .required('Senha é um campo obrigatório.'),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais.')
            .required('Confirmação de senha é um campo obrigatório.'),
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
          <>
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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Confirmação de senha"
                secureTextEntry={true}
                autoCapitalize="none"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.textButton}>Faça o seu cadastro</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
  },
  input: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#00b94a',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
