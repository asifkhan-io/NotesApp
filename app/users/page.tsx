import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getUsers } from "../services/users";

const UsersList = async () => {
  await connection();
  const users = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <Suspense fallback={<p>Loading users...</p>}>
        <UsersList />
      </Suspense>
    </div>
  );
};

export default Users;
