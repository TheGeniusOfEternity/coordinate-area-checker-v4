import "@/pages/home/Home.css";
import { Graph } from "@/components/graph/Graph.tsx";
import { ShotForm, type ShotFormData } from "@/components/forms/shotform/ShotForm.tsx";
import { Header } from "@/components/header/Header.tsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Home = () => {

  const mocks = [
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
    {
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },

  ];

  const shotSubmit = async (data: ShotFormData) => {

  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="main">
          <Graph />

          <DataTable
            size="small"
            value={mocks}
            paginator
            paginatorPosition="bottom"
            tableStyle={{ minWidth: "50rem" }}
            rows={7}
          >
            <Column field="id" sortable header="ID"></Column>
            <Column field="x" sortable header="X"></Column>
            <Column field="y" sortable header="Y"></Column>
            <Column field="r" sortable header="R"></Column>
            <Column field="isHit" sortable header="Status"></Column>
            <Column field="hitTime" sortable header="Hit Time"></Column>
            <Column field="execTime" sortable header="Execution Time"></Column>
          </DataTable>
        </div>
        <ShotForm onSubmit={(data) => shotSubmit(data)} />
      </div>
    </>
  );
};

export default Home;