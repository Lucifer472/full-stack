import ChartView from "@/components/ChartView";
import CreateRow from "@/components/CreateRow";
import CreateSheet from "@/components/CreateSheet";
import DataTables from "@/components/DataTables";
import PageTitle from "@/components/PageTitle";
import TableButtons from "@/components/TableButtons";
import { apiUrl } from "@/constant";
import Loader from "@/layout/Loader";
import Popup from "@/layout/Popup";
import { setTable } from "@/state/slices/TableSlice";
import { RootState } from "@/state/store";
import { Button } from "@mui/material";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TablesView = () => {
  const [editColumns, setEditColumns] = useState(false);
  const [editRow, setEditRow] = useState(false);

  const { sheetId } = useParams();
  const navigate = useNavigate();

  const data = useSelector((state: RootState) => state.table.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sheetId) {
      const mainId = parseInt(sheetId);
      if (isNaN(mainId)) {
        navigate("/");
      }
    }
  }, [sheetId, navigate]);

  useEffect(() => {
    if (sheetId) {
      fetch(apiUrl + "/fetch/rows/" + sheetId, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((r) => {
            if (r.success) {
              dispatch(setTable(r.success));
            } else {
              toast.error("Something went Wrong!");
            }
          });
        }
      });
    }
  }, [sheetId, dispatch]);

  if (!data) {
    return <Loader />;
  }

  const rows: GridRowsProp = data.rows.map((r) => ({
    id: r.id,
    ...r.values.reduce((acc, value, index) => {
      // @ts-expect-error acc has Type Any
      acc[index.toString()] = value;
      return acc;
    }, {}),
  }));

  const columns: GridColDef[] = data.headerData.map((d, index) => ({
    field: index.toString(),
    headerName: d.toString(),
    width: 150,
  }));

  return (
    <section className="global-container">
      {editColumns && (
        <Popup setOpen={setEditColumns} title="Add More Columns">
          <CreateSheet columnOnly />
        </Popup>
      )}
      {editRow && (
        <Popup setOpen={setEditRow} title="Add More Rows">
          <CreateRow />
        </Popup>
      )}
      <div className="flex flex-col w-full gap-y-4">
        <PageTitle
          title="Employee Sheet Data Editor"
          blocks={<TableButtons />}
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
      <ChartView />
    </section>
  );
};

export default TablesView;
