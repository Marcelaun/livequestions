
import { Route, Redirect, RouteProps, useParams } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useAuthorId } from '../hooks/useAuthorId';




export type ProtectedRouteProps = {
} & RouteProps;

type RoomParamsId = {
  id: string;
}

export function ProtectedRoute({...routeProps}: ProtectedRouteProps) {

  const { user } = useAuth();
  const params = useParams<RoomParamsId>();
  const roomId = params.id;
  console.log(params);





  console.log('id da sala protected routes', roomId);

  
  // const routeValues = Object.entries({...routeProps});
  // const pathValues = routeValues[3];
  // const 
  // console.log(pathValues);

  const { authorId } = useAuthorId(roomId);
  console.log('author.id é igual a user.id?', authorId === user?.id);
  console.log('author.id protected routes', authorId);
  

  if(authorId === user?.id) {
    return <Route {...routeProps}/>;
  } else {
    return <Redirect to={{ pathname:`/rooms/${roomId}`}}/>
  }
 
}
