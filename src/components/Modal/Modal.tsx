import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/cart/slice'
import styles from './Modal.module.scss'

type ModalProps = {
  text: string
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const Modal: React.FC<ModalProps> = ({ text, visible, setVisible }) => {
  const dispatch = useDispatch()

  const closeModal = () => {
    setVisible(false)
  }

  const clearAll = () => {
    dispatch(clearCart())
    closeModal()
  }

  const rootClasses = [styles.myModal]

  if (visible) {
    rootClasses.push(styles.active)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={closeModal}>
      <div className={styles.myModalContent} onClick={e => e.stopPropagation()}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttons}>
          <div onClick={clearAll} className={styles.button}>
            <span>Да</span>
          </div>
          <div onClick={closeModal} className={styles.button}>
            <span>Нет</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
