import style from '../../../style/User/Options/PrePaymentAlert.module.css';
import img from '../../../img/animeImg1.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
    cancelCb: () => void
}
export default function PrePaymentAlert ({cancelCb}:Props) {

    return (
        <div className={style['modal']}>
             <div className={style['overlay']} onClick={cancelCb}>
            
            </div>
            <div className={style['content']}>
                <button className={style['content-close-btn' ]}onClick={cancelCb}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <h1 className={style['content-msg']}>
                    Verifying Payment
                </h1>
                <div className={style['content-img-container']}>
                    <img src={img} alt='anime decoration for login' className={style['content-img']}/>
                </div>
                
                <p className={style['ad']}>We're almost ready. Processing Payment...</p>
                <div className={style['loading']}>
                    <div className={style["spinner"]}>
                        <span className={style["spinner-part-0"]}></span>
                        <span className={style["spinner-part-1"]}></span>
                        <span className={style["spinner-part-2"]}></span>
                        <span className={style["spinner-part-3"]}></span>
                        <span className={style["spinner-part-0"]}></span>
                        <span className={style["spinner-part-1"]}></span>
                        <span className={style["spinner-part-2"]}></span>
                        <span className={style["spinner-part-3"]}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}