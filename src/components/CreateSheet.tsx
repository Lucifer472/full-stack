import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { Button, TextField } from "@mui/material";

import Loader from "@/layout/Loader";
import { apiUrl } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setSheetData } from "@/state/slices/SheetDataSlice";
import { setTable } from "@/state/slices/TableSlice";

interface CreateSheetProps {
  columnOnly?: boolean;
}

const CreateSheet = ({ columnOnly }: CreateSheetProps) => {
  const [fields, setFields] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const sheetData = useSelector((state: RootState) => state.SheetData.data);
  const data = useSelector((state: RootState) => state.table.data);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // @ts-expect-error elements
    const formElements = e.target.elements;
    const formValues: string[] = [];

    if (data) {
      data.headerData.forEach((h) => {
        formValues.push(h as string);
      });
    }

    for (let i = 0; i < formElements.length; i++) {
      const element: {
        name: string;
        value: string;
      } = formElements[i];
      if (element.name) {
        formValues.push(element.value);
      }
    }

    if (!columnOnly) {
      fetch(apiUrl + "/create/sheet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sheetName: formValues.shift(),
          columns: formValues,
        }),
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            toast.success("Create Successfully!");
            if (sheetData) {
              const dummyData = [...sheetData];
              dummyData.push(r.success);
              dispatch(setSheetData(dummyData));
            } else {
              dispatch(setSheetData([r.success]));
            }
            setIsLoading(false);
          } else {
            toast.error("something went Wrong");
            setIsLoading(false);
          }
        })
      );
    } else if (data) {
      fetch(apiUrl + "/create/columns/" + data.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columns: formValues }),
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            toast.success("Create Successfully!");
            const dummyData = JSON.parse(JSON.stringify(data));
            formValues.forEach((f) => {
              dummyData.headerData.push(f);
            });
            dispatch(setTable(dummyData));
            setIsLoading(false);
          } else {
            toast.error("something went Wrong");
            setIsLoading(false);
          }
        })
      );
    }
  };

  const elements = Array.from({ length: fields }, (_, index) => (
    <div
      className="flex flex-col items-start justify-start gap-y-2 px-2 py-4"
      key={index}
    >
      <label htmlFor={`${index}`} className="text-sm font-bold text-gray-700">
        Column {index + 1}
      </label>
      <TextField
        sx={{
          width: "100%",
        }}
        id={`${index}`}
        name={`${index}`}
        placeholder="Enter a Column Name..."
      />
    </div>
  ));

  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit} className="mt-4 pb-6 overflow-y-scroll">
          {!columnOnly && (
            <div className="flex flex-col items-start justify-start gap-y-2 px-2 py-4">
              <label
                htmlFor="sheetNameMain"
                className="text-sm font-bold text-gray-700"
              >
                Sheet Name
              </label>
              <TextField
                sx={{
                  width: "100%",
                }}
                id="sheetNameMain"
                name="sheetNameMain"
                placeholder="Enter sheet name..."
              />
            </div>
          )}
          {elements}
          <div className="w-full space-y-4">
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => setFields(fields + 1)}
            >
              Add More Columns
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "crimson",
                ":hover": {
                  backgroundColor: "red",
                },
              }}
              onClick={() => setFields(fields - 1)}
              disabled={fields < 2}
            >
              Remove More Columns
            </Button>
            <Button variant="contained" type="submit" sx={{ width: "100%" }}>
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateSheet;
