import React, {memo, useState, useEffect} from 'react'
import ProgressTutorialBar  from './progressTutorialBar'
import { useResource } from '../context/ResourceContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { 
    deleteResource as deleteResourceAPI ,
    getChapters as getChaptersAPI,
    getResourceHistory as getResourceHistoryAPI,
    createResourceHistory as createResourceHistoryAPI,
    updateResourceHistory as updateResourceHistoryAPI

} from '../api';

function tutorial() {
    const navigate = useNavigate();
    const { getResource, emptyResource } = useResource();
    const { user } = useAuth();

    const [getChapter, setChapter] = useState([
   
    ])
    const [getChapterHistory, setChapterHistory] = useState(null)
    const [getChapterIndex, setChapterIndex]= useState(-1)

    
    useEffect(()=> {
        console.log('testes')
        try {
            if (getResource && getResource.id) {
 
                if (user) {
                    loadChapter(getResource.id)
                    loadChapterHistory()
                }
              
            }else {
                navigate('/')
            }
        } catch (error) {
            navigate('/')
        }
       
      },[])

    const started = async ()=> {
        if (user) {
            if (await createChapterHistory()) {
                setChapterIndex(0)
            }
           
        }else {
            navigate('/login')
        }
    }

    const loadChapterHistory = async () => {
        if (!getResource || !getResource.id) return
        if (!user || !user.user.id) return
        try {
            const {status, data} = await getResourceHistoryAPI(user.user.id, getResource.id);
            if (status == 200) {
                const data2 = JSON.parse(data.chapters_completed)
                if (data2) setChapterHistory(data2)
        
                return true
            } 
            
        } catch (err) {}

        return false
    }

    const createChapterHistory = async () => {
        if (!getResource || !getResource.id) return
        if (!user || !user.user.id) return
        try {
            const {status, data} = await createResourceHistoryAPI(user.user.id, getResource.id);
            if (status == 200) {
                setChapterHistory([])
                return true
            } 
            
        } catch (err) {}
        return false
    }

    const addChapterHistory = async (idChapter) => {
        if (!getResource || !getResource.id) return
        if (!user || !user.user.id) return
        if (getChapterHistory.includes(idChapter)) return

        try {
            const {status, data} = await updateResourceHistoryAPI(user.user.id, getResource.id, {
                chapters_completed : JSON.stringify([...getChapterHistory,idChapter])
            });

            if (status == 200) {
                const data2 = JSON.parse(data.chapters_completed)
                if (data2) setChapterHistory(data2)
            } 
            
        } catch (err) {}

    }
    
    const loadChapter = async (idResource) => {

        try {
            const {status, data} = await getChaptersAPI(idResource);
            if (status == 200) {
            setChapter(data.map(chapter => ({
                ...chapter,
                content : Array.isArray(JSON.parse(chapter.content)) ? JSON.parse(chapter.content) : [],
                saved: true,
            })))
            return
            } 
            
        } catch (err) {}
    }

    const deleteResource = async () => {
        if (!getResource || !getResource.id) return
        try {
          const {status, data} = await deleteResourceAPI(getResource.id);
          if (status == 200) {
            emptyResource()
            navigate('/')
            return
          } 
         
        } catch (err) {}
    }

    const validChapter = async() => {

    }

  
    return (
        <>
            {getResource && getResource.id && 
                (<div className="flex flex-col">
                    <h1 className='text-brown text-3xl font-medium mb-4'>{getResource.title}</h1>
                    {
                        getChapterHistory &&
                        <div className="mb-5">
                            <ProgressTutorialBar currentIndex={getChapterIndex} indexTotal={getChapter.length} setCurrentIndex={setChapterIndex}></ProgressTutorialBar>
                        </div>
                    }
                
                    {user && user.user.role == 'admin' &&
                        (<div className="flex gap-4 mb-5">
                            <div className="btn-primary" onClick={()=>navigate('/tutorialedit')}>
                                Modifier
                            </div>
                            <div className="btn-primary bg-red" onClick={deleteResource}>
                                supprimer
                            </div>
                        </div>)
                    }

                    {getChapterIndex == -1 && (
                        <>
                            <div className="img w-full h-auto rounded-lg overflow-hidden mb-10">
                                <img className="source w-full h-full object-cover" src={getResource.bannerUrl} alt=""/>
                            </div>

                            {(getChapterHistory && 
                                <div className="btn-primary" onClick={()=>setChapterIndex(0)}>Reprendre</div>
                                ) || (
                                <div className="btn-primary" onClick={started}>Commencer</div>
                            )}
                        </>
                    )}

                    
                    {getChapterIndex >= 0 && getChapterHistory &&  (
                        <>
                            {getChapter[getChapterIndex].content.map(element => {
                                switch (element.type) {
                                    case 'text':
                                        return ( <p className='text-brown text-base text-justify mb-5'>{element.content}</p>)
                                    case 'code':
                                        return (  <div class="bg-brown text-white p-4 rounded-lg shadow-lg w-full mb-10">
                                            <pre class="whitespace-pre-wrap">
                                                <code class="language-html">{element.content}</code>
                                            </pre>
                                        </div>)
                                    case 'image':
                                        return (<div className="img w-full h-auto rounded-lg overflow-hidden mb-10">
                                            <img className="source w-full h-full object-cover" src={element.content} alt=""/>
                                        </div>)
                                
                                    default:
                                        break;
                                }
                            })}

                            <div className='mb-10 flex gap-4 justify-end'>
                                <div className="btn-primary" onClick={() => setChapterIndex((lastValue)=>(lastValue-1))}>
                                    Chapitre precedant
                                </div>
                                {((!getChapterHistory || !getChapterHistory.includes(getChapter[getChapterIndex].id))  && 
                                <div className="btn-primary" onClick={()=> addChapterHistory(getChapter[getChapterIndex].id)}>
                                        Valider le chapitre
                                    </div>)
                                    ||
                                    (getChapterIndex < getChapter.length-1 &&  <div className="btn-primary" onClick={() => setChapterIndex((lastValue)=>(lastValue+1))}>
                                        Chapitre suivant (validé)
                                    </div>)
                                }
                                
                            </div>
                        </>
                    )}
                

                

                    
                
                </div>)
            }
        </>
    )
}

export default memo(tutorial)