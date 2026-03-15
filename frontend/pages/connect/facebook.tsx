import { signIn, useSession } from "next-auth/react";

export default function ConnectFacebook() {
  const { data: session } = useSession();

  const handleConnect = () => {
    signIn("facebook");
  };

  if (!session) {
    return (
      <button onClick={handleConnect} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Conectar Facebook/Instagram
      </button>
    );
  }
  return (
    <div>
      <div>Conectado como: {session.user?.email ?? "usuario"}</div>
      <button onClick={handleConnect} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        Reintentar conexión
      </button>
    </div>
  );
}