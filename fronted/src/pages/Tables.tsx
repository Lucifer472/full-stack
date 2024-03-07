import DataTables from "@/components/DataTables";
import PageTitle from "@/components/PageTitle";
import TableButtons from "@/components/TableButtons";
import { apiUrl } from "@/constant";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TablesView = () => {
  const [data, setData] = useState<null | {
    headerData: string[];
    rows: [
      {
        id: number;
        values: string[];
      }
    ];
  }>(null);
  const [change, setChange] = useState(1);

  const { sheetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (sheetId) {
      const id = parseInt(sheetId);
      if (isNaN(id)) {
        navigate("/");
      }

      fetch(apiUrl + "/fetch/rows/" + id, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((r) => {
            setData(r.success[0]);
          });
        }
      });
    } else {
      navigate("/");
    }
  }, [sheetId, navigate, change]);

  const rows: GridRowsProp = data
    ? data.rows.map((r) => ({
        id: r.id,
        ...r.values.reduce((acc, value, index) => {
          // @ts-expect-error acc has Type Any
          acc[index.toString()] = value;
          return acc;
        }, {}),
      }))
    : [];

  const columns: GridColDef[] = data
    ? data.headerData.map((d, index) => ({
        field: index.toString(),
        headerName: d,
        width: 150,
      }))
    : [];

  const blocks = (
    <TableButtons
      change={change}
      setChange={setChange}
      headerValue={data ? data.headerData : []}
    />
  );

  return (
    <section className="global-container">
      <div className="flex flex-col w-full gap-y-4">
        <PageTitle title="Employee Sheet Data Editor" blocks={blocks} />
        <div className="w-full bg-white rounded-md shadow border border-slate-100 flex flex-col gap-y-4 p-4">
          <DataTables rows={rows} columns={columns} />
        </div>
      </div>
    </section>
  );
};

export default TablesView;
