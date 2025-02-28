import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to Nasihun.com</h1>
      <p className="text-xl mb-8">
        Authentic Islamic Knowledge Through Verified Hadith
      </p>
      <Button size="lg" onClick={() => navigate("/")}>
        Go to Hadith Generator
      </Button>
    </div>
  );
}

export default Home;
