import { apiUrl } from "@/constant";
import Loader from "@/layout/Loader";
import { setChart } from "@/state/slices/ChartSlice";
import { RootState } from "@/state/store";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CreateChart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const data = useSelector((state: RootState) => state.table.data);
  const charts = useSelector((state: RootState) => state.chart.data);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-expect-error elements
    const formElements = e.target.elements;
    // @ts-expect-error formValues
    const formValues: {
      field: string;
      chartName: string;
      chartType: string;
    } = {};

    // Loop through form elements and store their values in formValues object
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        // @ts-expect-error FormValue
        formValues[element.name] = element.value;
      }
    }

    if (data) {
      setIsLoading(true);

      fetch(apiUrl + "/create/chart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          headerId: data.id,
          field: formValues["field"],
          chartType: formValues["chartType"],
          chartName: formValues["chartName"],
        }),
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            toast.success("Create Successfully!");

            if (charts) {
              const dummyData = [...charts];
              dummyData.push(r.success);
              dispatch(setChart(dummyData));
            } else {
              dispatch(setChart([r.success]));
            }

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
          <div className="flex flex-col items-start justify-start gap-y-2 px-2 py-4">
            <label
              htmlFor="chartName"
              className="text-sm font-bold text-gray-700"
            >
              Chart Name
            </label>
            <TextField
              sx={{
                width: "100%",
              }}
              id="chartName"
              name="chartName"
              required
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-y-2 px-2 py-4">
            <label
              htmlFor="chartType"
              className="text-sm font-bold text-gray-700"
            >
              Chart Type
            </label>
            <Select
              labelId="chartType"
              id="chartType"
              defaultValue={"bar"}
              name="chartType"
              label="chartType"
              sx={{
                width: "100%",
              }}
            >
              <MenuItem value={"bar"}>Bar Chart</MenuItem>
              <MenuItem value={"line"}>Line Chart</MenuItem>
              <MenuItem value={"pie"}>Pie Chart</MenuItem>
              <MenuItem value={"sparkline"}>Sparkline Chart</MenuItem>
            </Select>
          </div>
          {data && (
            <div className="flex flex-col items-start justify-start gap-y-2 px-2 py-4">
              <label
                htmlFor="field"
                className="text-sm font-bold text-gray-700"
              >
                Select Field
              </label>
              <Select
                labelId="field"
                id="field"
                defaultValue={data.headerData as string[]}
                name="field"
                label="field"
                sx={{
                  width: "100%",
                }}
              >
                {data.headerData.map((h, index) => (
                  <MenuItem value={h} key={index} selected>
                    {h}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <Button variant="contained" type="submit" sx={{ width: "100%" }}>
            Create Chart
          </Button>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateChart;
