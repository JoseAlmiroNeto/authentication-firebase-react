import firebase from "firebase/app";
import "firebase/auth";

export function Home() {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Usuário desconectado");
      })
      .catch((error) => {
        console.error("Erro ao desconectar usuário:", error);
      });
  };

  return (
    <div className="bg-zinc-900 text-white w-full h-screen flex flex-col items-center justify-center gap-5">
      <p className="text-2xl font-semibold">Home</p>
      <h1 className="text-2xl font-semibold">Você esta logado</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleLogout}
      >
        LogOut
      </button>
    </div>
  );
}
