import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WeightTracker() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("weightEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("weightEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (date && weight) {
      const newEntry = { date, weight: parseFloat(weight) };
      setEntries([...entries, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setDate("");
      setWeight("");
    }
  };

  const deleteEntry = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Add Weight Entry</h2>
          <div className="flex gap-2">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Button onClick={addEntry}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
          {entries.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={entries}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No entries yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">All Entries</h2>
          <ul className="space-y-2">
            {entries.map((entry, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{entry.date} - {entry.weight} kg</span>
                <Button variant="destructive" size="sm" onClick={() => deleteEntry(index)}>Delete</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
