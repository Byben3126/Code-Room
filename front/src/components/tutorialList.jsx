import React, {useEffect, useState} from 'react'
import { IconSearch, IconNews } from '@tabler/icons-react';
import Card from './tutorialCard'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import categories from '../category';
import { useResource } from '../context/ResourceContext';
import { getAllResource as getAllResourceAPI} from '../api';

function tutorialList() {
    const { selectResource, emptyResource } = useResource();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [getResources, setResouces] = useState([])

    const [getTitle, setTitle] = useState('')
    const [selectValue, setSelectValue] = useState('date');
    const [selectedCategory, setSelectedCategory] = useState('html');

    useEffect(()=> {
        getResource()
        emptyResource()
    },[])

    const getResource = async () => {
        try {
          const {status, data} = await getAllResourceAPI();
          if (status == 200) {
            console.log("data",data)
            setResouces(data)
            return
          } 
         
        } catch (err) {}
      
    }

    const clickTutorial = (id) => {
        selectResource(getResources.find(r => r.id == id) ?? null)
        navigate('/tutorial')
    }

    return (
        <div className="flex flex-col h-full">
            <h1 className='text-brown text-3xl font-medium mb-4'>Les tutoriels</h1>
            <div className="search-bar flex gap-4 items-center mb-8">

                <div className="input h-9 bg-white rounded-md w-[28rem] flex gap-4 px-2.5 items-center text-brown">
                    <IconSearch size="20"/>
                    <input value={getTitle} onChange={(e)=>setTitle(e.target.value)} className='h-full grow bg-transparent outline-none text-sm'></input>
                </div>

        
                <select name="sort" id="select" className='h-9 bg-white rounded-md w-30 flex gap-4 px-2.5 items-center text-brown  outline-none text-sm'
                    value={selectValue}
                    onChange={e => setSelectValue(e.target.value)}>

                    <option value="date">Trier par Date</option>
                    <option value="category">Trier par Categorie</option>
                </select>

                {selectValue == 'category' && <select
                        className='h-9 bg-white rounded-md w-30 flex gap-4 px-2.5 items-center text-brown  outline-none text-sm'
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                      {Object.keys(categories).map(key => (
                        <option key={key} value={key}>
                          {categories[key]}
                        </option>
                      ))}
                </select>}
            </div>


            <div className="list-card grow flex flex-wrap gap-4 overflow-auto h-0">
                {user && user.user.role == 'admin' && (<div onClick={()=>navigate('tutorialedit')} className='h-60 w-80 bg-white rounded-md flex flex-col overflow-hidden relative text-brown items-center justify-center gap-4 border-brown border-2 cursor-pointer'>
                    <IconNews size={"40"} stroke={1.5}></IconNews>
                    Ajout d'un Cours
        
                </div>)}

                {
                    getResources.sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateB - dateA; // Trier du plus récent au plus vieux
                    }).filter(r => {
                        return (r.title.toLowerCase().includes(getTitle.toLowerCase()) || !getTitle) && (selectValue == 'date' || r.category.toLowerCase().includes(selectedCategory.toLowerCase()))
                    }).map(r => (
                        <div onClick={()=>clickTutorial(r.id)} >
                            <Card imageSrc={r.bannerUrl} title={r.title} tags={[r.category]} isoDateString={r.created_at}></Card>
                        </div>
                    ))

                }
             
                

            </div>
                
        </div>
    )
}

export default tutorialList