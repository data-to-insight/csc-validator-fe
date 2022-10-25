import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

type TableRowType = {
  cells: unknown[];
};

interface TableProps {
  headers: string[];
  rows: TableRowType[];
  id: string;
}

const Table = (props: TableProps) => {
  const { headers, rows, id } = props;

  const renderCells = (cells: unknown[]) => {
    return cells.map((cell, idx) => {
      return <TableCell key={`table-cell-${cell}`}>{cell as string}</TableCell>;
    });
  };

  const renderRows = () => {
    return rows.map((row, idx) => {
      return (
        <TableRow key={`table-row-${id}-${idx}`}>
          {renderCells(row.cells)}
        </TableRow>
      );
    });
  };

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {headers.map((header, idx) => {
            return (
              <TableCell key={`table-head-${id}-${idx}`}>{header}</TableCell>
            );
          })}
        </TableRow>
      </TableHead>

      <TableBody>{renderRows()}</TableBody>
    </MuiTable>
  );
};

export default Table;
