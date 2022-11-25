import { User } from "firebase/auth";
import React from "react";
import { httpClient } from "../utils/api.util";
import { getRandomImage } from "./result/show/[id]";

const initState: User[] = [];

export default function Users() {
  const [users, setUsers] = React.useState(initState);

  React.useEffect(() => {
    const getUsers = async () => {
      const users = await httpClient("/api/users");
      setUsers(users);
    };
    getUsers();
  }, []);

  const deleteUser = async (uid: string) => {
    try {
      const deleted = await httpClient("/api/delete", {
        method: "POST",
        body: { uid },
      });

      alert("user deleted");
    } catch (error) {
      alert("error");
    }
  };

  const disableUser = async (uid: string, disabled: boolean) => {
    try {
      const deleted = await httpClient("/api/update", {
        method: "POST",
        body: { uid, disabled: !disabled },
      });

      alert("user deleted");
    } catch (error) {
      alert("error");
    }
  };

  return (
    <table className="table-auto mt-10">
      <thead>
        <tr>
          <th>Image</th>
          <th>User Name</th>
          <th>Email</th>
          <th>creationTime</th>
          <th>lastSignInTime</th>
          <th>operation</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user?.uid}>
            <td>
              <img src={user?.photoURL || getRandomImage} width="50" />
            </td>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.metadata?.creationTime}</td>
            <td>{user.metadata?.lastSignInTime}</td>

            <td>
              <button onClick={() => deleteUser(user?.uid)}>delete</button>{" "}
              {/* <button onClick={() => disableUser(user?.uid, user.disabled)}>
                Disable
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
