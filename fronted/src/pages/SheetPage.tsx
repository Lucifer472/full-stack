import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Book } from "@mui/icons-material";
import { Button } from "@mui/material";

import Popup from "@/layout/Popup";
import { apiUrl } from "@/constant";

import PageTitle from "@/components/PageTitle";
import SheetNameChange from "@/components/SheetNameChange";
import CreateSheetButton from "@/components/CreateSheetButton";

const SheetPage = () => {
  const [data, setData] = useState(null);
  const [sheetId, setSheetId] = useState<null | number>(null);
  const [editPopup, setEditPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl + "/fetch/sheets", {
      method: "GET",
    }).then((res) =>
      res.json().then((r) => {
        if (r.success) {
          setData(r.success);
        } else {
          toast.error("Something Went Wrong!");
        }
      })
    );
  }, []);

  const handleDelete = (id: number) => {
    fetch(apiUrl + "/delete/sheet/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      } else {
        toast.error("Something Went Wrong!");
      }
    });
  };

  const handleRename = (id: number) => {
    setSheetId(id);
    setEditPopup(true);
  };

  return (
    <section className="global-container">
      {editPopup && (
        <Popup setOpen={setEditPopup} title="Sheet Name Change">
          <SheetNameChange sheetId={sheetId as number} />
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
          // @ts-expect-error map function
          data.map((d) => (
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
                <Button variant="outlined" onClick={() => handleRename(d.id)}>
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
                  onClick={() => handleDelete(d.id)}
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
      </div>
    </section>
  );
};

export default SheetPage;
