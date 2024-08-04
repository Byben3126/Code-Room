import React, {useEffect, useState} from 'react'
import { IconSearch, IconNews } from '@tabler/icons-react';
import Card from './tutorialCard'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import categories from '../category';
import { useResource } from '../context/ResourceContext';
import { getResourceByResourceHistory as getResourceByResourceHistoryAPI} from '../api';

function tutorialList() {
    const { selectResource, emptyResource } = useResource();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [getResources, setResouces] = useState([])

    const [getTitle, setTitle] = useState('')
    const [selectValue, setSelectValue] = useState('date');
    const [selectedCategory, setSelectedCategory] = useState('html');

    useEffect(()=> {
        emptyResource()

        if (user && user.user.id) {
            getResource()
        }else{
            navigate('/')
        }
    },[])


    const getResource = async () => {
        if (!user || !user.user.id) return
        try {
            const {status, data} = await getResourceByResourceHistoryAPI(user.user.id);
            if (status == 200) {
                console.log("data",data)
                setResouces(data)
            return
            } 
            
        } catch (err) {}
        
    }

    const clickTutorial = (id) => {
        console.log("clickTutorial",getResources,id)
        selectResource(getResources.find(r => r.resource.id == id)?.resource ?? null)
        navigate('/tutorial')
    }

    return (
        <>
            {user && user.user.id && <div className="flex flex-col h-full">
                <h1 className='text-brown text-3xl font-medium mb-4'>Mes tutoriels suivie</h1>
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
                    {
                        getResources.sort((a, b) => {
                            const dateA = new Date(a.resource.created_at);
                            const dateB = new Date(b.resource.created_at);
                            return dateB - dateA; // Trier du plus récent au plus vieux
                        }).filter(r => {
                            return (r.resource.title.toLowerCase().includes(getTitle.toLowerCase()) || !getTitle) && (selectValue == 'date' || r.resource.category.toLowerCase().includes(selectedCategory.toLowerCase()))
                        }).map(r => (
                            <div onClick={()=>clickTutorial(r.resource.id)} >
                                <Card imageSrc={r.resource.bannerUrl} title={r.resource.title} tags={[r.resource.category]} isoDateString={r.updated_at} description={`${JSON.parse(r.chapters_completed).length} chapitre validés`}></Card>
                            </div>
                        ))

                    }
                
                    

                </div>
                    
            </div>}
        </>
    )
}

export default tutorialList