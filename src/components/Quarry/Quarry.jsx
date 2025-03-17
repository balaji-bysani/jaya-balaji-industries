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

export default function Quarry() {
  const [quarries, setQuarries] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (quarry) => {
    navigate("/NewQuarry", { state: { quarry } });
  };

  const handleRemoveQuarry = (index) => {
    setQuarries(quarries.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const savedQuarries = localStorage.getItem("quarries");
    if (savedQuarries) {
      setQuarries(JSON.parse(savedQuarries));
    }
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-4xl font-bold text-left">Quarry Listings</h1>
        <div className="mt-4 text-left">
          <Button onClick={() => navigate("/NewQuarry")} className="ml-0">
            Add Quarry
          </Button>
        </div>
        <div className="mt-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quarry ID</TableHead>
                <TableHead>Quarry Name</TableHead>
                <TableHead>Quarry Location</TableHead>
                <TableHead>Quarry Material</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quarries.length > 0 ? (
                quarries.map((quarry, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(quarry)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{quarry.name}</TableCell>
                    <TableCell>{quarry.location}</TableCell>
                    <TableCell>{quarry.material}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleRemoveQuarry(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">
                    No quarries added yet.
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
