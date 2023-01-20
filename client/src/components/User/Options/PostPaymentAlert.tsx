import style from '../../../style/User/Options/PostPaymentAlert.module.css';
interface Props {
    cancelCb: () => void
}
export default function PostPaymentAlert ({cancelCb}:Props) {
    return (
        <div className={style['post-payment-container']}>
            <span className={style['payment-status-msg']}>
                Buy made with success!
            </span>
            <p className={style['payment-msg']}>
                Now you can enjoy all our benefits for being part of the premium plan.
            </p>
            <button className={style['cancel-btn']} onClick={()=> cancelCb()}>X</button>
        </div>
    )
} 