import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Layout from "../sidebar/layout";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export default function Marking() {
  const [markings, setMarkings] = useState([]);
  // const [selectedMarking, setSelectedMarking] = useState(null);
  const navigate = useNavigate();

  const handleRowClick = (marking) => {
    navigate("/NewMarking", { state: { marking } });
  };

  useEffect(() => {
    const savedMarkings = localStorage.getItem("markings");
    if (savedMarkings) {
      setMarkings(JSON.parse(savedMarkings));
    }
  }, []);

  // useEffect(() => {
  //   axios.get("marking/all-markings") // Fetch from backend
  //     .then((response) => {
  //       if (response.data.statusCode === 200) {
  //         setMarkings(response.data.body);
  //       } else {
  //         console.error("Failed to fetch markings:", response.data.message);
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-4xl font-bold text-left">Markings</h1>
        <div className="mt-4 text-left">
          <Button
            onClick={() => {
              navigate("/NewMarking");
            }}
            className="ml-0 "
          >
            Add Marking
          </Button>
        </div>
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
                  const totalVolume = marking.blocks
                    .reduce((sum, block) => {
                      const volumeCm3 =
                        (block.length - marking.alliance) *
                        (block.breadth - marking.alliance) *
                        (block.height - marking.alliance);

                      const volumeM3 = volumeCm3 / 1000000;
                      return sum + volumeM3;
                    }, 0)
                    .toFixed(3);

                  return (
                    <TableRow
                      key={marking.id}
                      onClick={() => handleRowClick(marking)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
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
                    No Markings added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
