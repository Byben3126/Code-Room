import React, {useEffect, useState} from 'react'
import ListSort from './listSort'
import ProgressTutorialBar from './progressTutorialBar'
import { useResource } from '../context/ResourceContext';
import { 
  createResource as createResourceAPI, 
  createChapter as createChapterAPI, 
  saveChapter as saveChapterAPI, 
  saveResource as saveResourcePI, 
  deleteResource as deleteResourceAPI, 
  deleteChapter as deleteChapterAPI,
  getChapters as getChaptersAPI
} from '../api';
import categories from '../category';

function formTutorial() {
  const { getResource, selectResource, emptyResource } = useResource();

  const [getChapter, setChapter]= useState([
//     {
//       index: 1000,
//       id : 10,
//       saved: true,
//       content: [
//         {
//             id : 12,
//             type : 'code',
//             content: `
// <div className="badges absolute top-2 left-2 flex flex-wrap gap-2">
// <div className="badge bg-white h-7 px-3 flex items-center">test</div>
// <div className="badge bg-white h-7 px-3 flex items-cente">test</div>
// </div>
// <div className="img grow h-0">
// <img className="source w-full h-full object-cover" src="https://picsum.photos/200/300" alt=""/>
// </div>
// <div className="text h-20 px-5 flex flex-col justify-center">
// <h5 className="text-brown text-base">Cours pour les nuls</h5>
// <h5 className="text-brown text-base">Cours pour les nuls</h5>
// <h5 className="text-brown text-base">Cours pour les nuls</h5>
// <p className="text-brown text-xs">54 minutes • 30/06/2022</p>
// </div>`
//         },{
//             id : 19,
//             type: 'text',
//             content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt natus nulla explicabo nam maxime ratione ipsum nihil, totam sequi eveniet labore possimus quisquam accusamus saepe fugiat! Quae, iure debitis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias harum libero quos fugit dolores cupiditate pariatur molestiae suscipit possimus, officia aut aperiam eligendi in doloribus expedita veritatis ipsum! Corporis, blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, perferendis omnis non iusto ex ipsam aliquam labore quod molestias quia veniam quis! Blanditiis veniam eveniet id, doloribus dolores odio voluptatem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quia expedita ab similique illum qui fugiat aut pariatur, dolor minus laboriosam reprehenderit, unde voluptatum non sit vero, cupiditate quo modi Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae esse accusamus maxime omnis, eligendi obcaecati impedit dolorem, inventore, optio ducimus natus molestiae. Fuga harum quas sunt! Quae esse consequatur delectus?'
//         },{
//             id : 22,
//             type: 'image',
//             content : 'https://picsum.photos/200/300'
//         }
//       ]
//     }
    
  ])

  const [getChapterIndex, setChapterIndex]= useState(-1)

  const [getTitle, setTitle]= useState(getResource ? getResource.title : '')
  const [getUrlBanner, setUrlBanner]= useState(getResource ? getResource.bannerUrl : 'https://picsum.photos/800/200')
  const [getTimeoutSaveResource, setTimeoutSaveResource]= useState(null)

  const [selectedCategory, setSelectedCategory] = useState(getResource ? getResource.category : '');

  useEffect(()=> {
    if (getTimeoutSaveResource) clearTimeout(getTimeoutSaveResource)
      setTimeoutSaveResource(setTimeout(() => {
          saveResource()
      },1000))
  },[getTitle, getUrlBanner, selectedCategory])

  useEffect(()=> {
    if (getResource && getResource.id) {
      setTitle(getResource.title)
      setUrlBanner(getResource.bannerUrl)
      setSelectedCategory(getResource.category)
      loadChapter(getResource.id)
     
    }
  },[])

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

  function setArticleItems(articles) {
    setChapter((prevChapters) => {
      const updatedChapters = [...prevChapters];
      updatedChapters[getChapterIndex].content = articles
      updatedChapters[getChapterIndex].saved  = false
      return updatedChapters
    })
  }

  function addBlock(type) {
    console.log("addBlock")
    let content = null;
    if (type === "image") {
      content = prompt("Entrez un lien d'une image", "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg");
      if (!content) return
    }

    const newBlock = {
      id: new Date().getTime(),
      type,
      content: content ?? `Mon nouveau ${type}`
    };

    let updatedChapters = [...getChapter];
    updatedChapters[getChapterIndex].content = [newBlock,...updatedChapters[getChapterIndex].content];
    updatedChapters[getChapterIndex].saved = false
    setChapter(updatedChapters);
  }

  const addChapter = async () => {
    if (!getResource || !getResource.id) return
    try {
      const {status, data} = await createChapterAPI(getResource.id,{
        index : !getChapter.length ? 
                  100000 : getChapterIndex == -1 ? 
                    parseInt(getChapter[0].index / 2) : getChapterIndex == getChapter.length - 1 ? 
                      getChapter[getChapter.length-1].index + 1000 : 
                        parseInt(getChapter[getChapterIndex].index + (getChapter[getChapterIndex+1].index - getChapter[getChapterIndex].index) / 2),
      });

      if (status == 200) {
        console.log("data",data)
        data.content = []
        data.saved = true
        setChapter(prevChapters => {
          const updatedChapters = [...prevChapters];
          return [...updatedChapters.slice(0,getChapterIndex+1),data,...updatedChapters.slice(getChapterIndex+1)];
        });
        setChapterIndex(getChapterIndex+1)
        return
      } 
     
    } catch (err) {}

   
  }

  const delChapter = async () => {
    if (!getResource || !getResource.id) return
    try {
      const {status, data} = await deleteChapterAPI(getResource.id, getChapter[getChapterIndex].id);
      if (status == 200) {
        setChapter(prevChapters => {
          setChapterIndex(getChapterIndex-1)
          return [...prevChapters].filter((c,i) => i !== getChapterIndex);
        });
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
        setChapter([])
        setTitle('')
        setUrlBanner('')
        return
      } 
     
    } catch (err) {}
  }

  const createResource = async () => {
    if (!getTitle.length) return
    if (!getUrlBanner.length) return
    try {
      const {status, data} = await createResourceAPI({
        title : getTitle,
        bannerUrl : getUrlBanner,
        category : selectedCategory
      });
      if (status == 200) {
        console.log("data",data)
        selectResource({
          id: data.id,
          title: data.title,
          bannerUrl: data.bannerUrl
        })
        return
      } 
     
    } catch (err) {}
  
  }

  const saveChapter = async () => {
    if (!getResource || !getResource.id) return
    try {
      const {status, data} = await saveChapterAPI(getResource.id,getChapter[getChapterIndex].id,{
        content : JSON.stringify(getChapter[getChapterIndex].content)
      });
      if (status == 200) {
        console.log("data",data)
        let updatedChapters = [...getChapter];
        updatedChapters[getChapterIndex].saved = true
        setChapter(updatedChapters);
        return
      } 
     
    } catch (err) {}
  }

  const saveResource = async () => {
    if (!getResource || !getResource.id) return
    try {
      const {status, data} = await saveResourcePI(getResource.id,{
        title : getTitle,
        bannerUrl : getUrlBanner,
        category : selectedCategory
      });
      if (status == 200) {
        console.log("data",data)
        return
      } 
     
    } catch (err) {}
  }


  return (
    <>
        <input value={getTitle} onChange={(e) => setTitle(e.target.value)} placeholder='Titre' className='mb-5 h-12 bg-white rounded-md w-full text-brown font-semibold text-lg px-4 outline-none'></input>
        {getChapter.length && (<div className="mb-12">
          <ProgressTutorialBar indexTotal={getChapter.length} currentIndex={getChapterIndex} setCurrentIndex={setChapterIndex}></ProgressTutorialBar>
        </div>)}
       

        {(getChapterIndex == -1 && (
            <>

              <div className='mb-5 flex gap-4 justify-end'>
                <div className="flex-grow"></div>

                {getResource && (
                  <div className="btn-primary" onClick={deleteResource}>
                      Supprimer le cours
                  </div>
                )}
              </div>

                <div className="img w-full h-auto rounded-lg overflow-hidden mb-10">
                  <div className="flex gap-4">
                    <input value={getUrlBanner} onChange={(e) => setUrlBanner(e.target.value)} placeholder='Titre' className='mb-5 h-12 bg-white rounded-md w-full text-brown font-semibold text-lg px-4 outline-none'></input>
                    <select
                    className='mb-5 h-12 bg-white rounded-md w-78 text-brown font-semibold text-lg px-4 outline-none'
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                    >
                      {Object.keys(categories).map(key => (
                        <option key={key} value={key}>
                          {categories[key]}
                        </option>
                      ))}
                    </select>
                  </div>
                    <img className="source w-full h-full object-cover" src={getUrlBanner} alt=""/>
                </div>

                
                    {getResource && (
                      <div className="btn-primary" onClick={()=>addChapter()}>Ajouter un chapitre</div>
                    ) || (
                      <div className={`btn-primary ${!getTitle.length || !getUrlBanner.length ? "opacity-55" : ""}`} onClick={createResource}>Créer le cours</div>
                    )}
         
            </>
        )) ||
        <>
          <div className='mb-5 flex gap-4 justify-end'>
            <div className="btn-primary" onClick={()=>addBlock('text')}>
                Ajouter un texte
            </div>
            <div className="btn-primary" onClick={()=>addBlock('code')}>
                Ajouter du code
            </div>
            <div className="btn-primary" onClick={()=>addBlock('image')}>
                Ajouter une image
            </div>
            <div className="flex-grow"></div>
            <div className="btn-primary" onClick={delChapter}>
                Supprimer le chapitre
            </div>

            { getChapter[getChapterIndex].saved && (
                <div className="btn-primary" onClick={addChapter}>
                  Ajouter un chapitre
                </div>
              ) || (
                <div className="btn-primary" onClick={saveChapter}>
                  Souvegarder
                </div>
              )}
            
          </div>
          <ListSort articleItems={getChapterIndex < 0 ? [] : getChapter[getChapterIndex].content} setArticleItems={setArticleItems}></ListSort>
        </>
        }

        

      
    </>
  )
}

export default formTutorial