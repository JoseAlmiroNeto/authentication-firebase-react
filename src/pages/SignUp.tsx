import { useState } from "react";
import { useHistory } from "react-router-dom";
import { db, auth, storage } from "../auth/Authentication";

interface MyError extends Error {
  code: string;
}

export function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (userCredential.user) {
        const uid = userCredential.user.uid;
        await db.collection("user").doc(uid).set({
          email,
          uid,
        });
      }

      history.push("/");
    } catch (error: MyError | any) {
      console.log(error);
    }
  };

  const handleClickSignUp = () => {
    history.push("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-gray-800 shadow-md rounded-lg p-8">
        <h1 className="text-white text-4xl font-bold mb-8">Criar conta</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Digite seu email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Crie sua senha"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SignUp
            </button>
            <button
              className="text-gray-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClickSignUp}
            >
              Já possui conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return <div>Login</div>;
}
