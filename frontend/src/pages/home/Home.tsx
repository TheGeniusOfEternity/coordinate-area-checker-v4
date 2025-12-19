import "@/pages/home/Home.css";
import { Graph } from "@/components/graph/Graph.tsx";
import { ShotForm, type ShotFormData } from "@/components/forms/shotform/ShotForm.tsx";
import { Header } from "@/components/header/Header.tsx";

const Home = () => {

  const shotSubmit = async (data: ShotFormData) => {

  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="main">
          <Graph />
          <ShotForm
            onSubmit={(data) => shotSubmit(data)}
          />
        </div>
      </div>
    </>
  );
};

export default Home;