import { apiUrl } from "@/constant";
import Loader from "@/layout/Loader";
import Popup from "@/layout/Popup";
import { RootState } from "@/state/store";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditRow from "./EditRow";
import CreateChart from "./CreateChart";
import { setTable } from "@/state/slices/TableSlice";
import toast from "react-hot-toast";

const TableButtons = () => {
  const rows = useSelector((state: RootState) => state.rowSelect.row);
  const data = useSelector((state: RootState) => state.table.data);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [chart, setChart] = useState(false);

  if (!data) {
    return;
  }

  const handleRowDelete = async () => {
    if (rows && rows.length > 0) {
      setLoading(true);

      try {
        await Promise.all(
          rows.map(async (r) => {
            await fetch(apiUrl + "/delete/row/" + r, {
              method: "DELETE",
            });
          })
        );
      } catch (error) {
        toast.error("Something went Wrong!");
      } finally {
        const dummyData = { ...data };
        dummyData.rows = dummyData.rows.filter((row) => !rows.includes(row.id));
        dispatch(setTable(dummyData));
        setLoading(false);
        toast.success("Deleted Successfully!");
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-end gap-x-2">
      {loading && <Loader />}
      {edit && (
        <Popup setOpen={setEdit} title="Row Editor">
          <EditRow />
        </Popup>
      )}
      {chart && (
        <Popup setOpen={setChart} title="Create A Chart">
          <CreateChart />
        </Popup>
      )}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "crimson",
          ":hover": {
            backgroundColor: "red",
          },
        }}
        disabled={rows === null}
        onClick={handleRowDelete}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        disabled={rows === null || rows.length > 1}
        onClick={() => setEdit(true)}
      >
        Edit
      </Button>
      <Button variant="contained" onClick={() => setChart(true)}>
        Create Chart
      </Button>
    </div>
  );
};

export default TableButtons;
