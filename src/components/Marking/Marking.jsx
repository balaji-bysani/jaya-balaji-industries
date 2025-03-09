import Layout from "../sidebar/layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const initialMarkings = [
  { id: 1, quarryName: "Granite Quarry", measurements: "50m x 30m" },
  { id: 2, quarryName: "Marble Quarry", measurements: "40m x 25m" },
];

export default function MarkingPage() {
  const [markings, setMarkings] = useState(initialMarkings);

  const handleAddMarking = () => {
    const newMarking = {
      id: markings.length + 1,
      quarryName: "New Quarry",
      measurements: "45m x 20m",
    };
    setMarkings([...markings, newMarking]);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Markings</h1>
        <Button onClick={handleAddMarking}>Add Marking</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marking ID</TableHead>
            <TableHead>Quarry Name</TableHead>
            <TableHead>Quarry Measurements</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {markings.map((marking) => (
            <TableRow key={marking.id}>
              <TableCell>{marking.id}</TableCell>
              <TableCell>{marking.quarryName}</TableCell>
              <TableCell>{marking.measurements}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}
