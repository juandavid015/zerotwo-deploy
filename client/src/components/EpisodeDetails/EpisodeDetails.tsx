import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeEpisode, getEpisodeStreamingUrl } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import style from '../../style/EpisodeDetails/EpisodeDetails.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import Comments from '../Comments/Comements';
import Loading from '../UtilsComponents/Loading';
import NotFound from '../UtilsComponents/NotFound';
export default function EpisodeDetails () {
    const {idAnime, idEpisode, animeName} = useParams();
    const dispatch = useAppDispatch();
    const episode = useAppSelector(state => state.animeEpisode)
    const [streamingUrl , setStreamingUrl] = useState('');
    const [streamLoaded, setStreamLoaded] = useState(false);
    const [loading, setLoading] = useState(false)
   
   
    useEffect(()=> {
        setLoading(true)
        setStreamLoaded(false);

        window.scrollTo({top: 0, behavior: "smooth"});
        dispatch(getAnimeEpisode(idAnime, idEpisode)).then(val => {
            setLoading(false);
        });
        dispatch(getEpisodeStreamingUrl(animeName, episode.number)).then(res => {
            setStreamingUrl(res)
            setStreamLoaded(true)
        }).catch(err => {
            setStreamLoaded(true)
        })
    },[dispatch, idEpisode, idAnime, animeName, episode.number])
  
    return(
        
            loading ? <Loading /> : !episode ? <NotFound msg='Not episoded founded'/> :
            <div className={style['episode-container']}>

            <div className={style['episode-video']} 
            style={{backgroundImage: `linear-gradient(61deg, rgba(0,0,0,0.8799894957983193) 0%, rgba(19,19,20,0.7903536414565826) 100%, rgba(252,252,255,0.3757878151260504) 100%, rgba(101,5,196,1) 100%, rgba(40,10,88,1) 100%),
            url(${episode.coverImage})`}}>
                {/* <FontAwesomeIcon icon={faPlay} onClick={()=> stremingEpisode(animeName, episode.number)}/> */}
                {streamLoaded && streamingUrl.length ? 
                <div className={style['iframe']}>
                    <iframe src={streamingUrl}  allowFullScreen  allow="autoplay; fullscreen;"  title='Streaming video'/>;
                </div>: streamLoaded && !streamingUrl.length ?

                <NotFound msg='We are sorry the episode you want to watch is not available right now' color='#F4F0F8'/>:
                
                <div className={style['stream-loading']}>
                    <FontAwesomeIcon icon={faCircleNotch} />  
                </div>}
              
            </div>

            <div className={style['episode-info']}>

                <div className={style['episode-info-header']}>
                    <div className={style['episode-info-header-title']}>
                        <h1>{episode.title} - Episode {episode.number}</h1>
                        <div className={style['episode-info-tags']}>
                            <span className={style['episode-info-tag']}>Air date: {episode.airdate}  </span>
                            <span className={style['episode-info-tag']}>Length: {episode.length} min</span>
                        </div>
                    </div>
                </div>
                <h2>Description</h2>
                <p style={{opacity: '.7'}}>{episode.synopsis ? episode.synopsis : 'The anime does not have a description'}</p>
            </div>

            {/* <div className={style['comments-container']}>
                <h2>Comments</h2>
            </div> */}
            <Comments />
        </div>
        
        
    )
}