import React from 'react'
import { Navigate } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { signIn } from '../../redux/auth/asyncActions'
import { isAuthSelector } from '../../redux/auth/selectors'
import { useAppDispatch } from '../../redux/store'

import styles from './SignIn.module.scss'
import { IUserFields } from './types'
import { setDefaultPage } from '../../redux/filter/slice'

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useSelector(isAuthSelector)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IUserFields>({
    mode: 'onChange',
    defaultValues: {
      name: 'Nikita',
      password: '12345'
    }
  })

  const onSubmit: SubmitHandler<IUserFields> = data => {
    dispatch(signIn(data))
    dispatch(setDefaultPage())
    reset()
  }

  if (isAuth) {
    dispatch(setDefaultPage())
    return <Navigate to='/' />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <p>Мы рады видеть вас!</p>

        <input
          {...register('name', {
            required: 'Это обязательное поле!',
            minLength: 3,
            maxLength: 20
          })}
          placeholder='Введите логин'
        />
        {errors?.name && <p>{errors.name.message}</p>}

        <input
          {...register('password', {
            required: 'И это тоже...',
            minLength: 3,
            maxLength: 20
          })}
          placeholder='Введите пароль'
          type='password'
        />
        {errors?.password && <p>{errors.password.message}</p>}

        <button>Войти</button>
      </form>
    </>
  )
}

export default SignUp
