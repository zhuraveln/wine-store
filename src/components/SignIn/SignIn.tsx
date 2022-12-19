import React from 'react'
import { Navigate } from 'react-router-dom'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { signIn } from '../../redux/auth/asyncActions'
import { authSelector } from '../../redux/auth/selectors'
import { useAppDispatch } from '../../redux/store'

import { IUserFields } from './types'
import { Status } from '../../redux/wine/types'
import styles from './SignIn.module.scss'

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
    mode: 'onChange',
    defaultValues: {
      name: 'Nikita',
      password: '12345'
    }
  })

  const onSubmit: SubmitHandler<IUserFields> = async data => {
    await dispatch(signIn(data))
    reset()
  }

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
        <h2>Мы рады видеть вас!</h2>

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
            'Войти'
          )}
        </button>
      </form>
    </>
  )
}

export default SignUp
