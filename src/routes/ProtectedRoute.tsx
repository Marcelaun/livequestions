import { Route, Redirect, RouteProps } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

interface ProtectedRouteProps extends RouteProps {}

export function ProtectedRoute({ ...routeProps }: ProtectedRouteProps) {
  const { user } = useAuth();
  const [authorId, setAuthorid] = useState<string>();
  const roomIdValues = routeProps.location?.pathname.split("/admin/rooms/");
  const roomId = roomIdValues?.pop()?.toString();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef
      .get()
      .then((snapshot) => {
        const roomVal = snapshot.val();
        return roomVal.authorId;
      })
      .then((data) => {
        setAuthorid(data);
      });
  }, [roomId]);

  if (authorId === undefined) {
    return <p>Loading</p>;
  }

  if (authorId === user?.id) {
    return <Route {...routeProps} />;
  } else {
    alert("Você não é admin da sala!");
    return <Redirect to={{ pathname: "/" }} />;
  }
}
