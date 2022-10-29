import React from 'react'

import styles from './SignIn.module.scss'

const SignIn: React.FC = () => {
  return (
    <>
      <form className={styles.root}>
        <p>Мы рады видеть Вас!</p>
        <input placeholder='Введите логин' />
        <input placeholder='Введите пароль' type='password' />
        <button>Войти</button>
      </form>
    </>
  )
}

export default SignIn
