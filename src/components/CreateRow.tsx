import { apiUrl } from "@/constant";
import Loader from "@/layout/Loader";
import { setTable } from "@/state/slices/TableSlice";
import { RootState } from "@/state/store";
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CreateRow = () => {
  const [isLoading, setIsLoading] = useState(false);

  const data = useSelector((state: RootState) => state.table.data);
  const dispatch = useDispatch();

  if (!data) {
    return;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-expect-error elements
    const formElements = e.target.elements;
    const formValues: string[] = [];

    // Loop through form elements and store their values in formValues object
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formValues.push(element.value);
      }
    }

    if (data.id) {
      setIsLoading(true);

      fetch(apiUrl + "/create/row/" + data.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ row: formValues }),
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            toast.success("Create Successfully!");
            const dummyData = JSON.parse(JSON.stringify(data));
            dummyData.rows.push(r.success);
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

  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit} className="mt-4 pb-6 overflow-y-scroll">
          {data.headerData.map((h, index) => (
            <div
              className="flex flex-col items-start justify-start gap-y-2 px-2 py-4"
              key={index}
            >
              <label
                htmlFor={`${h} ${index}`}
                className="text-sm font-bold text-gray-700"
              >
                {h}
              </label>
              <TextField
                sx={{
                  width: "100%",
                }}
                id={`${h} ${index}`}
                name={`${h} ${index}`}
                required
              />
            </div>
          ))}
          <Button variant="contained" type="submit" sx={{ width: "100%" }}>
            Submit
          </Button>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateRow;
