import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';

const SignIn = () => {
  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
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
});
