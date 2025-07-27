import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import supabase from '../supabase'

function Home() {

  const router = useNavigate() 

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.log("Error signing in:", error);
    }
    
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(_event, session);
    });
    const handleAuthChange = async (event, session) => {
      if (event === "SIGNED_IN") {
        const user = session.user;
        window.localStorage.setItem('user', JSON.stringify(user.user_metadata))
      }
    };
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className='w-full h-screen bg-orange-100 flex flex-col items-center justify-center relative'> 
        <div className='flex flex-col'>
          <img src='./home.gif' alt='learn' className='contain h-[150px] mx-auto mb-2' />
          <h1 className='whitespace-nowrap bg-orange-100 font-bold tracking-tighter w-full text-center text-xl' style={{ fontSize: '30px' }}>            
            Supalearn
          </h1>
          <p className='text-sm text-orange-400'>Play game and learn science </p>
        </div>
        <br/>        
        {
          window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user')) ? (
            <div className='flex items-center justify-center'>
              <img 
                onClick={() => router('/instructions')}
                alt='button'
                src='play.gif' 
                className='contain h-[100px]'
              />
              <div className='flex items-center nes-balloon from-left nes-pointer p0'>
                <div className='flex items-center bg-trans space-x-2'>
                  <img class="nes-avatar is-rounded is-medium" alt="User Avatar" src={JSON.parse(window.localStorage.getItem('user')).avatar_url} style={{ imageRendering: 'pixelated' }} />
                  <span className='nes-text bg-trans'>Hey! {JSON.parse(window.localStorage.getItem('user'))?.name}</span>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className='nes-btn flex items-center'>
              <i className='nes-icon google is-medium'></i>
            </button>
          )
        }
    </div>
  )
}

export default Home