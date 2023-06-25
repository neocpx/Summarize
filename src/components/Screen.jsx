import React from 'react'
import { useState, useEffect } from 'react'
import { copyIcon, linkIcon, loader, tick,summarize} from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Screen = () => {
  const [article, setarticle] = useState(
    {
      url:'',
      summary: ''
    }
  );
  
  const [storage, setstorage] = useState([]);

  const [copy, setcopy] = useState("");
  
  const [getSummary,{error,isFetching}]=useLazyGetSummaryQuery();

  useEffect(()=>{
    const lStorage=JSON.parse(localStorage.getItem('articles'))
    if (lStorage){
      setstorage(lStorage)
    }
  },[]);

  const Submit= async(e)=>{
    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url});
    if(data?.summary){
      const newArticle={...article,summary:data.summary};
      const newStorage=[newArticle,...storage]
      setarticle(newArticle);
      setstorage(newStorage);
      localStorage.setItem('articles',JSON.stringify(newStorage))
    }
  }

  const handleCopy=(url)=>{
    setcopy(url)
    navigator.clipboard.writeText(url);
    setTimeout(()=>{
      setcopy(false)
    },5000);
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className="relative flex justified-center"
        onSubmit={Submit}>
          <img src={linkIcon} alt="link" className='absolute left-0 ml-3 my-3 w-5' />
          <input type="url" placeholder='Enter URL' value={article.url}
          onChange={(event)=>{
            setarticle({...article,url:event.target.value})
          }} required
          className='url_input peer' />
          <button type='submit' className='submit_btn
          peer-focus:border-gray-700 peer-focus:text-gray-700'>
            <img src={summarize} alt="summarize" width={25} />
          </button>
        </form>
        {/* history */}
        <div className="flex flex-col gap-1 max-h-16 overflow-y-auto">
          {storage.map((item,index)=>(
            
            <div
              key={`link-${index}`}
              onClick={() => setarticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copy=== item.url ? tick : copyIcon}
                  alt={copy=== item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* results */}
      <div className='my-10 max-w-full flex justify-center items-center'
      >
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            An Error Occurred
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Screen