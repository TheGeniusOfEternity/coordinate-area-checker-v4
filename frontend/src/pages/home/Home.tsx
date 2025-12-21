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
import { useState } from "react";
import { useMatchMedia } from "primereact/hooks";

const Home = () => {
  const { t, i18n } = useTranslation();
  const { shotSubmit } = useShots();

  const isMobile = useMatchMedia("(max-width: 789px)");
  const isDesktop = useMatchMedia("(min-width: 1251px)");

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [r, setR] = useState<number>(1);

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const shots = useSelector(
    (state: RootState) => state.shot.shots
  );

  return (
    <>
      <div className="container">
        {user && <Header
          user={user as User}
          isMobile={isMobile}
        />}
        <div className="main">
          <Graph
            shots={shots}
            r={r}
            onGraphClick={(clickX, clickY) =>
              shotSubmit(user!.id, { x: clickX, y: clickY, r })
            }
          />
          <DataTable
            size={
              isMobile
                ? "small"
                : isDesktop
                  ? "large"
                  : "normal"
            }
            value={shots}
            paginator
            paginatorPosition="bottom"
            rows={isMobile
              ? 7
              : 10
            }
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
              field="executionTime"
              sortable
              header={t("page.home.table.header.executionTime")}
              body={(rowData) =>
                `${rowData.executionTime} ${t("page.home.table.body.executionTime")}`
              }
            />
          </DataTable>
        </div>
        <ShotForm
          data={{ x, y, r }}
          onXChange={setX}
          onYChange={setY}
          onRChange={setR}
          onSubmit={(data) => shotSubmit(user!.id, data)}
        />
      </div>
    </>
  );
};

export default Home;