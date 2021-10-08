 import { database } from '../services/firebase';
 import { useEffect, useState } from 'react';







 export function useAuthorId(roomId: string | undefined) {

    console.log(roomId);
    const [authorId, setAuthorId] = useState('');
  
  
  useEffect(() => {
        const handleAuthorId =() => {
            const roomRef = database.ref(`rooms/${roomId}`);
               roomRef.once('value').then((snapshot) => {
               const authorIdValue = snapshot.val();
               const authorId = authorIdValue.authorId;            
               console.log('authorid useroom', authorId);
               setAuthorId(authorId);
           })
           
          }


        handleAuthorId();
 
        return () => {
            setAuthorId('');
        }
         
       }, [roomId])

       console.log('author id state AuthorId.ts', authorId);
 
      
    

  
   return {authorId}

  
 }

