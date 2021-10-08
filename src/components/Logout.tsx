import { useAuth } from '../hooks/useAuth';
import '../styles/logout.scss';
import { FormEvent } from 'react';

export function Logout() {
  const { user, logOutGoogleAccount } = useAuth();

  async function handleLogOutGoogle(event: FormEvent) {
    event.preventDefault();

    if(user) {
      await logOutGoogleAccount();
    } else if(!user) {
      throw new Error('User already logged out!');
    }


  }

  return (
    
   <button title="Sair" className="logout-button" onClick={handleLogOutGoogle}>  
   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
   <path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z" /></svg>
   </button>
  );

 
}