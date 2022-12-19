import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signUp } from '../../redux/auth/asyncActions'
import { authSelector } from '../../redux/auth/selectors'
import { setDefaultPage } from '../../redux/filter/slice'
import { useAppDispatch } from '../../redux/store'
import { Status } from '../../redux/wine/types'

import styles from './SignUp.module.scss'
import { IUserFields } from './types'

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const { userData, status } = useSelector(authSelector)
  const isAuth = Boolean(userData)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IUserFields>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IUserFields> = async data => {
    await dispatch(signUp(data))
    reset()
  }

  if (isAuth) {
    dispatch(setDefaultPage())
    return <Navigate to='/' />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2>Добро пожаловать!</h2>

        <input
          {...register('name', {
            required: 'Это обязательное поле!',
            minLength: {
              value: 3,
              message: 'минимальное кол-во символов 3'
            },
            maxLength: {
              value: 20,
              message: 'максимальное кол-во символов 20'
            }
          })}
          placeholder='Введите логин'
        />
        {errors?.name && <p>{errors.name.message}</p>}

        <input
          {...register('password', {
            required: 'Это обязательное поле!',
            minLength: {
              value: 3,
              message: 'минимальное кол-во символов 3'
            },
            maxLength: {
              value: 25,
              message: 'максимальное кол-во символов 25'
            }
          })}
          placeholder='Введите пароль'
          type='password'
        />
        {errors?.password && <p>{errors.password.message}</p>}

        <button>
          {status === Status.LOADING ? (
            <div className={styles.loader}></div>
          ) : (
            'Зарегистрироваться'
          )}
        </button>
      </form>
    </>
  )
}

export default SignUp
