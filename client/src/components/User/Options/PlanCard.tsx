import { UserInterface } from "../../../types/types"
import style from '../../../style/User/Options/PlanCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandFist, faBiohazard, faWind } from "@fortawesome/free-solid-svg-icons";
import planImg1 from '../../../img/planImg1.jpg';
import planImg2 from '../../../img/planImg2.jpg';
import planImg3 from '../../../img/planImg3.jpg';

export default function PlanCard (user: UserInterface) {

    const planName = user.plan === '1' ? 'Genin': user.plan === '2' ? 'Chuunin' : user.plan === '3' ? 'Jounin' : 'None'
    if (user.plan === "1") {
        return (
            <div className={style['plan-container']}>
               <div className={style['plan-card']} style={{backgroundImage:`url(${planImg1})`}}>
                    <div className={style['plan-card-inner-box']}>
                        <div className={style['image-container']}>
                            <img src={user.image} alt="user" className={style['user-img']}/>
                        </div>
                        <h3>
                            <span className={style['nickname-tag']}>{user.nickname}</span> - 
                            <span className={style['plan-tag']}>{planName}</span>
                        </h3>
                        <FontAwesomeIcon icon={faBiohazard} />
                        <a href="/">Update plan</a>
                    </div>
                </div>
               <div className={style['plan-benefit']}>
                    <h3>My benefits</h3>
                    <ul>
                        <li>No ads</li>
                        <li>Unlimited access to the ZeroTwo library</li>
                        <li>New episodes one hour after Japan</li>
                        <li>Stream on 1 device at a time</li>
                    </ul>
               </div>
            </div>
         
        )
    } else if (user.plan === '2') {
        return (
            <div className={style['plan-container']}>
                <div className={style['plan-card']} style={{backgroundImage:`url(${planImg2})`}}>
                    <div className={style['plan-card-inner-box']}>
                        <div className={style['image-container']}>
                            <img src={user.image} alt="user" className={style['user-img']}/>
                        </div>
                        <h3>
                            <span className={style['nickname-tag']}>{user.nickname}</span> - 
                            <span className={style['plan-tag']}>{planName}</span>
                        </h3>
                        <FontAwesomeIcon icon={faWind} />
                        <a href="/">Update plan</a>
                    </div>
                </div>
                <div className={style['plan-benefit']}>
                    <h3>My benefits</h3>
                    <ul>
                        <li>No ads</li>
                        <li>Unlimited access to the ZeroTwo library</li>
                        <li>New episodes one hour after Japan</li>
                        <li>Stream on 1 device at a time</li>
                        <li>Offline Viewing</li>
                    </ul>
                </div>
            </div>
        )
    } else if (user.plan === '3') {
        return (
            <div className={style['plan-container']}>
                <div className={style['plan-card']} style={{backgroundImage:`url(${planImg3})`}}>
                    <div className={style['plan-card-inner-box']}>
                        <div className={style['image-container']}>
                            <img src={user.image} alt="user" className={style['user-img']}/>
                        </div>
                        
                        <h3>
                            <span className={style['nickname-tag']}>{user.nickname}</span> - 
                            <span className={style['plan-tag']}> {planName}</span>
                        </h3>
                        <FontAwesomeIcon icon={faHandFist} />
                        <a href="/">Update plan</a>
                    </div>
                </div>
                <div className={style['plan-benefit']}>
                    <h3>My benefits</h3>
                    <ul>
                        <li>No ads</li>
                        <li>Unlimited access to the ZeroTwo library</li>
                        <li>New episodes one hour after Japan</li>
                        <li>Stream on 1 device at a time</li>
                        <li>Offline Viewing</li>
                        <li>16% discount on Monthly Plan (billed every 12-months)</li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div className={style['plan-container']}>
                <div className={style['plan-card']}>
                    <div className={style['plan-card-inner-box']}>
                        <div className={style['image-container']}>
                            <img src={user.image} alt="user" className={style['user-img']}/>
                        </div>
                        <h3>
                            <span className={style['nickname-tag']}>{user.nickname}</span> - 
                            <span className={style['plan-tag']}> {planName}</span>
                        </h3>
                    </div>
                </div>
                <div className={style['plan-benefit']}>Benefits</div>
            </div>
        )
    }
}