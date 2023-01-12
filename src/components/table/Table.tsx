/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

type TableRowType = {
  cells: unknown[];
  raw?: any[];
};

interface HighlightCell {
  row: number;
  cell: number;
}

interface TableProps {
  headers: string[];
  rows: TableRowType[];
  id: string;
  selectable?: boolean;
  selectedHandler?: (row: any) => void;
  highlight?: HighlightCell | null;
}

const Table = (props: TableProps) => {
  const { headers, rows, id, selectable, selectedHandler, highlight } = props;

  const [selectedRow, setSelectedRow] = useState<number>(-1);

  const renderCells = (cells: unknown[], rowIdx: number, raw: any) => {
    return cells.map((cell, idx) => {
      const outline =
        highlight && highlight.row === rowIdx && highlight.cell === idx;

      return (
        <TableCell
          scope={outline ? "cell-active" : ""}
          sx={{
            backgroundColor:
              rowIdx === selectedRow || outline ? "#1d70b8" : "transparent",
            color: rowIdx === selectedRow || outline ? "#fff" : "#000",
          }}
          onClick={() => {
            if (selectable) {
              setSelectedRow(rowIdx === selectedRow ? -1 : rowIdx);

              if (selectedHandler) {
                selectedHandler(rowIdx === selectedRow ? null : raw);
              }
            }
          }}
          key={`table-cell-${cell}`}
        >
          {cell as string}
        </TableCell>
      );
    });
  };

  const renderRows = () => {
    return rows.map((row, idx) => {
      return (
        <TableRow key={`table-row-${id}-${idx}`}>
          {renderCells(row.cells, idx, row.raw)}
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
