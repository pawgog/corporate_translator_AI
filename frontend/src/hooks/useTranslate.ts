import { useState } from "react";

import { calculateSpice } from "../utils/helper";
import type { LoadingPhase, TranslateInput } from "../types";

export function useTranslate(){
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>("idle");

   const translateText = async({ text, audience, tone }:TranslateInput)=>{
      setIsLoading(true);
      setLoadingPhase("analyzing");

      try{
         await new Promise(r=>setTimeout(r,500));
         setLoadingPhase("filtering");
         await new Promise(r=>setTimeout(r,500));
         setLoadingPhase("typing");

         const response = await fetch('http://localhost:3001/api/translate',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
               text,
               audience,
               tone
            })
         })
         const data = await response.json();
         setLoadingPhase("done");
         return {
            translatedText: data.translatedText,
            calculatedSpice: calculateSpice(text)
         };
      }
      finally{
         setIsLoading(false);
         setTimeout(()=>{
            setLoadingPhase("idle");
         },500);
      }
   };

   return { translateText, isLoading, loadingPhase };
}