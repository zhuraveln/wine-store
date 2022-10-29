import React from 'react'

import styles from './SignUp.module.scss'

const SignUp: React.FC = () => {
  return (
    <>
      <form className={styles.root}>
        <p>Добро пожаловать!</p>
        <input placeholder='Введите логин' />
        <input placeholder='Введите пароль' type='password' />
        <button>Зарегистрироваться</button>
      </form>
    </>
  )
}

export default SignUp
