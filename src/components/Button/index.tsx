import { ButtonProps } from './interface'
import styles from './styles.module.css'

export const Button = ({
    children,
    variant = 'filled'
}: ButtonProps) => {
  const CLASS_MAP = {
    filled: {
        button: styles.filledVariantButton
    },
    border: {
        button: styles.borderVariantButton
    }
  }

  return (
    <button className={CLASS_MAP[variant].button}>{children}</button>
  )
}
