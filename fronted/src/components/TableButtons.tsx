import { apiUrl } from "@/constant";
import Loader from "@/layout/Loader";
import Popup from "@/layout/Popup";
import { RootState } from "@/state/store";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditRow from "./EditRow";
import CreateChart from "./CreateChart";

interface TableButtonsProps {
  change: number;
  setChange: (v: number) => void;
  headerValue: string[];
  headerId: number | undefined;
}

const TableButtons = ({
  change,
  setChange,
  headerValue,
  headerId,
}: TableButtonsProps) => {
  const rows = useSelector((state: RootState) => state.rowSelect.row);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [chart, setChart] = useState(false);

  const handleRowDelete = async () => {
    if (rows && rows.length > 0) {
      setLoading(true);

      try {
        // Use Promise.all to wait for all delete operations to complete
        await Promise.all(
          rows.map(async (r) => {
            await fetch(apiUrl + "/delete/row/" + r, {
              method: "DELETE",
            });
          })
        );
      } catch (error) {
        console.error("Error deleting rows:", error);
      } finally {
        setChange(change + 1);
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-end gap-x-2">
      {loading && <Loader />}
      {edit && (
        <Popup setOpen={setEdit} title="Row Editor">
          <EditRow headerValue={headerValue} />
        </Popup>
      )}
      {chart && (
        <Popup setOpen={setChart} title="Create A Chart">
          <CreateChart id={headerId} headerData={headerValue} />
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
