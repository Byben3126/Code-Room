import React from 'react'
import { IconHome, IconTrophy} from '@tabler/icons-react';


function progressTutorialBar({currentIndex = 0, indexTotal = 1, setCurrentIndex}) {
  return (
    <div className='flex items-center gap-2'>
        <div className="icon h-10 w-10 rounded-full bg-blue flex items-center justify-center cursor-pointer" onClick={()=>setCurrentIndex(-1)}>
            <IconHome size="20"/>
        </div>
        <div className='flex grow w-0 gap-1'>
            {Array(indexTotal).fill(null).map((v, index) => (<div onClick={()=>setCurrentIndex(index)} className={`grow h-2 cursor-pointer ${index == currentIndex ? 'bg-blue' : 'bg-white'}`}></div>))}
        </div>
        <div className="icon h-10 w-10 rounded-full bg-blue flex items-center justify-center">
            <IconTrophy size="20"/>
        </div>
   
    </div>
  )
}

export default progressTutorialBar