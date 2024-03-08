import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setSheetData } from "@/state/slices/SheetDataSlice";

import { Book } from "@mui/icons-material";
import { Button } from "@mui/material";

import Popup from "@/layout/Popup";
import { apiUrl } from "@/constant";

import PageTitle from "@/components/PageTitle";
import SheetNameChange from "@/components/SheetNameChange";
import CreateSheetButton from "@/components/CreateSheetButton";
import Loader from "@/layout/Loader";

const SheetPage = () => {
  const [sheetIndex, setSheetIndex] = useState<null | number>(null);
  const [editPopup, setEditPopup] = useState(false);

  const [loading, setLoading] = useState(false);

  const data = useSelector((state: RootState) => state.SheetData.data);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl + "/fetch/sheets", {
      method: "GET",
    }).then((res) =>
      res.json().then((r) => {
        if (r.success) {
          dispatch(setSheetData(r.success));
        } else {
          toast.error("Something Went Wrong!");
        }
        setLoading(false);
      })
    );
  }, [dispatch]);

  const handleDelete = (id: number, index: number) => {
    fetch(apiUrl + "/delete/sheet/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200 && data) {
        const newArray = [...data.slice(0, index), ...data.slice(index + 1)];
        dispatch(setSheetData(newArray));
        toast.success("Sheet Deleted Successfully");
      } else {
        toast.error("Something Went Wrong!");
      }
    });
  };

  const handleRename = (index: number) => {
    setSheetIndex(index);
    setEditPopup(true);
  };

  return (
    <section className="global-container">
      {loading && <Loader />}
      {editPopup && (
        <Popup setOpen={setEditPopup} title="Sheet Name Change">
          <SheetNameChange sheetIndex={sheetIndex as number} />
        </Popup>
      )}
      <div className="flex flex-col gap-y-4 w-full">
        <PageTitle
          title="All Available Sheets (.xlsx and .csv)"
          blocks={<CreateSheetButton />}
        />
      </div>
      <div className="w-full bg-white p-4 rounded-md shadow border border-slate-100 mt-4 flex flex-col gap-y-1">
        {data &&
          data.map((d, index) => (
            <div
              className="flex items-center justify-between border-b border-slate-300 py-4"
              key={d.id}
            >
              <div className="flex items-center justify-start gap-x-4">
                <Book
                  sx={{
                    width: "50px",
                    height: "50px",
                    padding: "6px",
                    border: "gray 1px solid",
                    borderRadius: "100%",
                  }}
                />
                <h2
                  className="text-xl font-semibold cursor-pointer hover:underline text-gray-800"
                  onClick={() => navigate("/sheets/" + d.id)}
                >
                  {d.sheetName}
                </h2>
              </div>
              <div className="flex items-center justify-end gap-x-2">
                <Button variant="outlined" onClick={() => handleRename(index)}>
                  Rename
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "crimson",
                    ":hover": {
                      backgroundColor: "red",
                    },
                  }}
                  onClick={() => handleDelete(d.id, index)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/sheets/" + d.id)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        {!data ||
          (data.length < 1 && (
            <div className="flex items-center justify-center min-h-[300px]">
              <h2 className="text-2xl font-medium">No Sheet Found!</h2>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SheetPage;
