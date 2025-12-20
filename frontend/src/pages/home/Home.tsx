import "@/pages/home/Home.css";
import { Graph } from "@/components/graph/Graph.tsx";
import { ShotForm } from "@/components/forms/shotform/ShotForm.tsx";
import { Header } from "@/components/header/Header.tsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { User } from "@/store/slices/authSlice.ts";
import { useShots } from "@/hooks/useShots.ts";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { shotSubmit } = useShots();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const mocks = [
    {
      id: 1020,
      x: 1,
      y: 2,
      r: 3,
      isHit: true,
      hitTime: "01.12.2025 15:30",
      execTime: 1234,
    },
  ];


  return (
    <>
      <div className="container">
        {user && <Header user={user as User} />}
        <div className="main">
          <Graph />

          <DataTable
            size="small"
            value={mocks}
            paginator
            paginatorPosition="bottom"
            rows={7}
            key={i18n.language}
          >
            <Column field="id" sortable header="ID" />
            <Column field="x" sortable header="X" />
            <Column field="y" sortable header="Y" />
            <Column field="r" sortable header="R" />
            <Column
              field="isHit"
              sortable
              header={t("page.home.table.header.status")}
              body={(rowData) =>
                t(
                  `page.home.table.body.isHit.${rowData.isHit ? "hit" : "miss"}`,
                )
              }
            />
            <Column
              field="hitTime"
              sortable
              header={t("page.home.table.header.hitTime")}
            />
            <Column
              field="execTime"
              sortable
              header={t("page.home.table.header.executionTime")}
            />
          </DataTable>
        </div>
        <ShotForm
          onSubmit={(data) => shotSubmit(user!.id, data)}
        />
      </div>
    </>
  );
};

export default Home;