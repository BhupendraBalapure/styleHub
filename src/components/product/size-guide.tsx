"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ROWS = [
  { size: "XS", chest: "32-34", waist: "24-26", hips: "34-36" },
  { size: "S", chest: "34-36", waist: "26-28", hips: "36-38" },
  { size: "M", chest: "38-40", waist: "30-32", hips: "40-42" },
  { size: "L", chest: "42-44", waist: "34-36", hips: "44-46" },
  { size: "XL", chest: "46-48", waist: "38-40", hips: "48-50" },
];

export function SizeGuide({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Size Guide</DialogTitle>
          <DialogDescription>
            Measurements in inches. For the best fit, measure against a garment
            you already own.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Chest</TableHead>
              <TableHead>Waist</TableHead>
              <TableHead>Hips</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.size}>
                <TableCell className="font-medium">{r.size}</TableCell>
                <TableCell>{r.chest}</TableCell>
                <TableCell>{r.waist}</TableCell>
                <TableCell>{r.hips}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
