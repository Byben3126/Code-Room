import React, {useLayoutEffect, useRef} from "react";
import { IconGripVertical,IconTrash } from '@tabler/icons-react';

function ListSort({articleItems,setArticleItems}) {

  const listSort = useRef(null);

 
  const [newArticleItem, setNewArticleItem] = React.useState("");

  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _articleItems = [...articleItems].map(article => ({...article, dragItem :false}));

    //remove and save the dragged item content
    const draggedItemContent = _articleItems.splice(dragItem.current, 1)[0];

    //switch the position
    _articleItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setArticleItems(_articleItems);
  };

  

  function handleKeyDown(textarea, test = true) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useLayoutEffect(() => {
    console.log("listSort",listSort.current)
    listSort.current.querySelectorAll('.textareaEdit').forEach(textarea => {
      handleKeyDown(textarea, false)
    });
  }, [articleItems]);

  return (
    <div className="app">

      
      <div className="list-sort flex flex-col gap-10" ref={listSort}>
        {articleItems.map((item, index) => (
          <div
            key={index}
            draggable={item.dragItem ?? false}
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            className="flex items-center gap-4 cursor-pointer relative"
          >
            <div className="h-10 w-10 flex items-center justify-center absolute left-0 top-1/2 -translate-x-full -translate-y-1/2"
              onMouseDown={()=>setArticleItems(articleItems.map((a) => item.id == a.id ? {...a,dragItem : true} : a))} 
              onMouseUp={(e)=>{setArticleItems(articleItems.map((a) => item.id == a.id ? {...a,dragItem : false} : a))}}>
              <IconGripVertical stroke="2" size="25" color="#7d7d7d"/>
            </div>
            <div className="h-10 w-10 flex items-center justify-center absolute right-0 top-1/2 translate-x-full -translate-y-1/2 opacity-50 hover:opacity-100"
             onClick={(e)=>{setArticleItems(articleItems.filter((a) => a.id != item.id))}}
            >
              <IconTrash stroke="1.5" size="20" color="#7d7d7d"/>
            </div>
            
            { item.type == "text" && <textarea className="textareaEdit text-brown text-base text-justify w-full bg-transparent outline-none resize-none text-wrap overflow-x-hidden min-h-4" style={{"min-heigh":"23px"}} value={item.content} onChange={(e)=>{
                  handleKeyDown(e.target); setArticleItems(articleItems.map((a, i) => i == index ? {...a,content : e.target.value} : a))}}></textarea> }

            { item.type == "image" && (<div className="img w-full h-auto rounded-lg overflow-hidden">
                <img className="source w-full h-full object-cover" src={item.content} alt=""/>
            </div>)}

            { item.type == "code" && ( <div class="bg-brown text-white p-4 rounded-lg shadow-lg w-full">
            <pre class="whitespace-pre-wrap">
              
                <textarea class="textareaEdit w-full bg-transparent outline-none resize-none text-wrap overflow-x-hidden" value={item.content} onChange={(e)=>{
                  handleKeyDown(e.target); setArticleItems(articleItems.map((a, i) => i == index ? {...a,content : e.target.value} : a))}}>
                   
                </textarea>
            </pre>
        </div>)}

          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSort;
