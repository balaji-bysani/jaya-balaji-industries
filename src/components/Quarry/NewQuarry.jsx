import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";
import Layout from "../sidebar/layout";

export default function NewQuarry() {
  const navigate = useNavigate();
  const [quarries, setQuarries] = useState(() => {
    const savedQuarries = localStorage.getItem("quarries");
    return savedQuarries ? JSON.parse(savedQuarries) : [];
  });

  const [quarryName, setQuarryName] = useState("");
  const [quarryLocation, setQuarryLocation] = useState("");
  const [quarryMaterial, setQuarryMaterial] = useState("");

  const handleSubmit = () => {
    const newQuarry = {
      id: Date.now(),
      name: quarryName,
      location: quarryLocation,
      material: quarryMaterial,
    };

    const updatedQuarries = [...quarries, newQuarry];
    setQuarries(updatedQuarries);
    localStorage.setItem("quarries", JSON.stringify(updatedQuarries));
    navigate("/Quarry");
  };

  return (
    <Layout>
      <div>
      <h1 className="text-4xl font-bold text-left">Add New Quarry</h1>

        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Quarry Name</label>
            <Input
              type="text"
              value={quarryName}
              onChange={(e) => setQuarryName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Quarry Location</label>
            <Input
              type="text"
              value={quarryLocation}
              onChange={(e) => setQuarryLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Quarry Material</label>
            <Input
              type="text"
              value={quarryMaterial}
              onChange={(e) => setQuarryMaterial(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="mt-4">
          Save
        </Button>
      </div>
    </Layout>
  );
}
