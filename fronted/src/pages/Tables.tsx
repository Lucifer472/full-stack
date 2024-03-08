import CreateRow from "@/components/CreateRow";
import CreateSheet from "@/components/CreateSheet";
import DataTables from "@/components/DataTables";
import PageTitle from "@/components/PageTitle";
import TableButtons from "@/components/TableButtons";
import { apiUrl } from "@/constant";
import Popup from "@/layout/Popup";
import { Button } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TablesView = () => {
  const [data, setData] = useState<null | {
    headerData: string[];
    id: number;
    rows: [
      {
        id: number;
        values: string[];
      }
    ];
  }>(null);
  const [change, setChange] = useState(1);
  const [id, setId] = useState<number | null>(null);

  const [editColumns, setEditColumns] = useState(false);
  const [editRow, setEditRow] = useState(false);

  const { sheetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (sheetId) {
      const mainId = parseInt(sheetId);
      if (isNaN(mainId)) {
        navigate("/");
      }

      setId(mainId);
    }
  }, [sheetId, navigate]);

  useEffect(() => {
    if (id) {
      fetch(apiUrl + "/fetch/rows/" + id, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((r) => {
            setData(r.success[0]);
          });
        }
      });
    }
  }, [change, id]);

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

  console.log(data);

  return (
    <section className="global-container">
      {editColumns && (
        <Popup setOpen={setEditColumns} title="Add More Columns">
          <CreateSheet
            columnOnly
            headerId={data?.id}
            headerData={data?.headerData}
          />
        </Popup>
      )}
      {editRow && (
        <Popup setOpen={setEditRow} title="Add More Rows">
          <CreateRow id={data?.id} headerData={data?.headerData} />
        </Popup>
      )}
      <div className="flex flex-col w-full gap-y-4">
        <PageTitle
          title="Employee Sheet Data Editor"
          blocks={
            <TableButtons
              sheetId={id ? id : undefined}
              change={change}
              setChange={setChange}
              headerValue={data ? data.headerData : []}
            />
          }
        />
        <div className="w-full bg-white rounded-md shadow border border-slate-100 flex flex-col gap-y-4 p-4">
          <DataTables rows={rows} columns={columns} />
          <div className="flex items-center justify-end gap-x-4">
            <Button variant="contained" onClick={() => setEditColumns(true)}>
              Add Columns
            </Button>
            <Button variant="contained" onClick={() => setEditRow(true)}>
              Add Rows
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TablesView;
