import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import supabase from '../supabase';

const zoomVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

function Summary() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function getHistory() {
            const { error, data } = await supabase.from('history').select('*')
            if (error) {
                console.log("History error: "+error.message);
                return
            }
            setHistory(data)
        }
        getHistory();
    }, []);

  return (
    <motion.div
      variants={zoomVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
        <div className="w-full min-h-screen bg-orange-200 flex flex-row items-center justify-center space-x-2 px-4 py-20 overflow-hidden">
            <div class="nes-container max-w-[80%] is-rounded with-title is-centered h-full">
                <p class="title">Hey! {JSON.parse(window.localStorage.getItem('user'))?.full_name}</p>
                {
                    history?.map(item => (
                        <div className='w-full text-left'>
                            <span className='nes-badge'><span className='is-dark text-xs'>{new Date(item.created_at).toLocaleTimeString('en-US')}</span></span>
                            <p className='nes-text'><span className='underline'>Your Compound:</span> {item.user_compound}</p>
                            <p className='nes-text'><span className='underline'>Opponent Compound:</span> {item.ai_compound}</p>
                            <p className='nes-text'><span className='underline'>Molecules You Came Across:</span> {item.molecules_involved}</p>
                            <p className='nes-text'><span className='underline'>Reaction Compound:</span> {item.resultant_compound}</p>
                            <p className='nes-text'><span className='underline'>Know Why:</span> {item.reason}</p>
                            <p className='nes-text'><span className='badge'>Who won:</span> {item.winner}</p>                            
                        </div>
                    ))
                }
            </div>        
        </div>
    </motion.div>
  )
}

export default Summary