import React from 'react'

function tutorialCard({title,tags = [],isoDateString, imageSrc, description = ''}) {
  return (
    <div className='h-60 w-80 bg-white rounded-md flex flex-col overflow-hidden relative'>
        <div className="badges absolute top-2 left-2 flex flex-wrap gap-2">

          { tags.map(t => (
            t ? <div className="badge bg-white h-7 px-3 flex items-center text-brown rounded-md text-xs">{t}</div> : null
          ))}
            
         
        </div>
        <div className="img grow h-0">
            <img className="source w-full h-full object-cover" src={imageSrc} alt=""/>
        </div>
        <div className="text h-20 px-5 flex flex-col justify-center">
            <h5 className='text-brown text-base'>{title}</h5>
            <p className='text-brown text-xs'>{description ? `${description} •`: ''} {new Date(isoDateString).toLocaleDateString('fr-FR', {day: '2-digit',month: '2-digit',year: 'numeric'})}</p>
        </div>
    </div>
  )
}

export default tutorialCard



