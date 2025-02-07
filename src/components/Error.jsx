import styles from './Error.module.css'

const Error = () => (
  <div className={styles.error}>
    <div>⚠️</div>
    <p>잘못된 경로입니다.</p>
    <p>다시 확인해 주세요.</p>
  </div>
)

export default Error