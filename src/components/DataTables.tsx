import { useDispatch } from "react-redux";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { setRow } from "@/state/slices/RowSelectSlice";

interface DataTablesProps {
  rows: GridRowsProp;
  columns: GridColDef[];
}

const DataTables = ({ rows, columns }: DataTablesProps) => {
  const dispatch = useDispatch();

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        sx={{
          p: 2,
        }}
        checkboxSelection
        onRowSelectionModelChange={(e) =>
          dispatch(setRow(e.length > 0 ? (e as number[]) : null))
        }
      />
    </div>
  );
};

export default DataTables;
