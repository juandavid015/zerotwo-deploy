// import React from "react";

import style from '../../style/UtilsComponents/Footer.module.css';
// import logo from "../../img/zeroSticker.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faFire, faSignInAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons"
import{faEye} from "@fortawesome/free-solid-svg-icons"
import{faMasksTheater} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className={style['footer']}>
            <div className={style['footer-brand']}>
                {/* <img src={logo} alt='zero-two brand logo' className={style['brand-logo']}/> */}
                <h1>Zero two</h1>
            </div>
            <div className={style['footer-info']}>
                <div className={style['explore']}>
                    <h4 className={style['title']}>Explore</h4>
                    <div className={style['options']}>
                        <div className={style['option']}>
                            <Link className={style["a-dropdown"]} to="/animes/trending">
                                <FontAwesomeIcon icon={faFire} className={style['icon']}/>
                                <span className={style['span-links']}>Most popular</span>
                            </Link>
                        </div>
                        <div className={style['option']}>
                            <Link className={style["a-dropdown"]} to="/animes/newest">
                                <FontAwesomeIcon icon={faEye} className={style['icon']}/>
                                <span className={style['span-links']}>Playing now</span>
                            </Link>
                        </div>
                        <div className={style['option']}>
                            <Link className={style["a-dropdown"]} to="/animes">
                                <FontAwesomeIcon icon={faMasksTheater} className={style['icon']}/>
                                <span className={style['span-links']}>Genres</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={style['account']}>
                    <h4 className={style['title']}>Account</h4>
                    <div className={style['options']}>
                        <div className={style['option']}>
                            <Link className={style["a-dropdown"]} to="/register">
                                <FontAwesomeIcon icon={faUserPlus} className={style['icon']} />
                                <span className={style['span-links']}>Sign up</span>
                            </Link>
                        </div>
                        <div className={style['option']}>
                            <Link className={style["a-dropdown"]} to="/login">
                                <FontAwesomeIcon icon={faSignInAlt} className={style['icon']} />
                                <span className={style['span-links']}>Sign in</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style['footer-contact']}>
                <span className={style["made-by"]}>Made by</span>
                <div className={style['footer-profile']}>
                    <a className={style['a-href']} href="https://github.com/juandavid015">
                        <div className={style['user']}>
                            <span className={style['user-name']}>juandavid015</span>
                            <FontAwesomeIcon icon={faGithub} />
                        </div>
                        <span className={style['tag']}>FullStack</span>
                    </a>   
                </div>
                <div className={style['footer-profile']}>
                    <a className={style['a-href']} href="https://github.com/nicosanchezprev">
                        <div className={style['user']}>
                            <span className={style['user-name']}>nicosanchezprev</span>
                            <FontAwesomeIcon icon={faGithub} />
                        </div>
                        <span className={style['tag']}>FullStack</span>
                    </a> 
                </div>
            </div>
        </div>
    )
};

export default Footer;