import { FormEvent } from "react";
import toast from "react-hot-toast";

import { Button, TextField } from "@mui/material";

import { apiUrl } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setSheetData } from "@/state/slices/SheetDataSlice";

const SheetNameChange = ({ sheetIndex }: { sheetIndex: number }) => {
  const data = useSelector((state: RootState) => state.SheetData.data);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;

    // @ts-expect-error elements
    const formElements = e.target.elements;

    const sheetName = formElements[0].value;
    if (!sheetName) {
      toast.error("Please Provide a Valid Sheet Name!");
    }

    fetch(apiUrl + "/update/sheet/" + data[sheetIndex].id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sheetName }),
    }).then((res) => {
      if (res.status === 200) {
        const dummyData = [...data];
        dummyData[sheetIndex] = {
          ...dummyData[sheetIndex],
          sheetName: sheetName,
        };
        dispatch(setSheetData(dummyData));
        toast.success("Rename Successfully");
      } else {
        toast.error("Something Went Wrong!");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4 pb-6">
      <div className="flex flex-col items-start justify-start gap-y-2 px-2 py-4">
        <label htmlFor="sheetName" className="text-sm font-bold text-gray-700">
          Name
        </label>
        <TextField
          sx={{
            width: "350px",
          }}
          id="sheetName"
          name="sheetName"
          required
          placeholder="Enter a new sheet name..."
        />
      </div>
      <Button variant="contained" type="submit" sx={{ width: "100%" }}>
        Submit
      </Button>
    </form>
  );
};

export default SheetNameChange;
