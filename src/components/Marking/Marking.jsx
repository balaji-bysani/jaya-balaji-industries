import React, { useState } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import NewMarking from "./NewMarking";

export default function Marking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markings, setMarkings] = useState([]);

  const handleAddMarking = (newMarking) => {
    setMarkings([...markings, newMarking]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Markings</h1>
      <Button onClick={() => setIsModalOpen(true)} className="mt-4">
        Add Marking
      </Button>

      <div className="mt-4 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marking ID</TableHead>
              <TableHead>Quarry Name</TableHead>
              <TableHead>Alliance (cm)</TableHead>
              <TableHead>Number of Blocks</TableHead>
              <TableHead>Total Marked Volume (m³)</TableHead> {/* Display in m³ */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {markings.length > 0 ? (
              markings.map((marking) => {
                // Calculate total marked volume in m³
                const totalVolume = marking.blocks.reduce((sum, block) => {
                  const volumeCm3 =
                    (block.length - marking.alliance) *
                    (block.breadth - marking.alliance) *
                    (block.height - marking.alliance);

                  const volumeM3 = volumeCm3 / 1000000; // Convert cm³ to m³
                  return sum + volumeM3;
                }, 0).toFixed(3); // Round to 3 decimal places

                return (
                  <TableRow key={marking.id}>
                    <TableCell>{marking.id}</TableCell>
                    <TableCell>{marking.quarryName}</TableCell>
                    <TableCell>{marking.alliance}</TableCell>
                    <TableCell>{marking.blocks.length}</TableCell>
                    <TableCell>{totalVolume} </TableCell> {/* Rounded to 3 decimals */}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No markings added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <NewMarking
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMarking}
      />
    </div>
  );
}
