import React, { useState } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import NewMarking from "./NewMarking";
import Layout from "../sidebar/layout";
export default function Marking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markings, setMarkings] = useState([]);
  const [selectedMarking, setSelectedMarking] = useState(null);

  const handleAddMarking = (newMarking) => {
    if (selectedMarking) {
      setMarkings(markings.map((m) => (m.id === selectedMarking.id ? newMarking : m)));
    } else {
      setMarkings([...markings, newMarking]);
    }
  };

  const handleRowClick = (marking) => {
    setSelectedMarking(marking);
    setIsModalOpen(true);
  };

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-2xl font-bold">Markings</h1>
      <Button onClick={() => { setSelectedMarking(null); setIsModalOpen(true); }} className="mt-4">
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
              <TableHead>Total Marked Volume (m³)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {markings.length > 0 ? (
              markings.map((marking) => {
                const totalVolume = marking.blocks.reduce((sum, block) => {
                  const volumeCm3 =
                    (block.length - marking.alliance) *
                    (block.breadth - marking.alliance) *
                    (block.height - marking.alliance);

                  const volumeM3 = volumeCm3 / 1000000;
                  return sum + volumeM3;
                }, 0).toFixed(3);

                return (
                  <TableRow key={marking.id} onClick={() => handleRowClick(marking)} className="cursor-pointer hover:bg-gray-100">
                    <TableCell>{marking.id}</TableCell>
                    <TableCell>{marking.quarryName}</TableCell>
                    <TableCell>{marking.alliance}</TableCell>
                    <TableCell>{marking.blocks.length}</TableCell>
                    <TableCell>{totalVolume}</TableCell>
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
        existingData={selectedMarking}
      />
    </div>
    </Layout>
  );
}
