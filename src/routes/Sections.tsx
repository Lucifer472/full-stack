import { Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "@/layout/DashboardLayout";

import IndexPage from "@/pages/IndexPage";
import PageNotFound from "@/pages/PageNotFound";
import TablesView from "@/pages/Tables";
import SheetPage from "@/pages/SheetPage";
import ChartsPage from "@/pages/ChartsPage";

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        {
          path: "/charts",
          element: <ChartsPage />,
        },
        {
          path: "/sheets",
          element: <SheetPage />,
        },
        {
          path: "/sheets/:sheetId",
          element: <TablesView />,
        },
      ],
    },
    {
      path: "404",
      element: <PageNotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export default Router;
