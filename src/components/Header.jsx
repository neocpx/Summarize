import React from 'react'
import { gitlab,copyIcon } from '../assets'

const Header = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-centerm w-full mb-10 pt-5'>
        <a href="#" className="w-28 object-contain font-bold text-xl hover:text-red-600">Summarize</a>
        <button type='button'
        onClick={()=>window.open('https://gitlab.com/clopx/Summary')}
        >
          <img src={gitlab} alt="gitlab" className='w-12'/>
        </button>
      </nav>

      <h1 className="head_text">Article Summarizer <br />
      <span className='blue_gradient'>with GPT-4</span></h1>
      <h2 className='desc'>Enter link of the article you want to summarize.</h2>
    </header>
  )
}

export default Header