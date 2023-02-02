/** @jsxImportSource @emotion/react */

import React, { useState, MouseEvent, useEffect } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Popover,
  Typography,
} from "@mui/material";

type TableRowType = {
  cells: unknown[];
  raw?: any[];
};

interface HighlightCell {
  row: number;
  cell: number;
  description?: string;
}

interface TableProps {
  headers: string[];
  rows: TableRowType[];
  id: string;
  selectable?: boolean;
  selectedHandler?: (row: any) => void;
  highlight?: HighlightCell | null;
}

const TableCellElement = (props: {
  content: string;
  highlight?: HighlightCell | null;
  selectedRow: number;
  rowIdx: number;
  outline?: boolean | null;
  handleClick: () => void;
}) => {
  const { content, highlight, selectedRow, handleClick, outline, rowIdx } =
    props;

  const [popoverLocation, setPopoverLocation] =
    React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (evt: MouseEvent<HTMLElement>) => {
    if (outline && highlight?.description) {
      setPopoverLocation(evt.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setPopoverLocation(null);
  };

  const open = Boolean(popoverLocation);

  return (
    <TableCell
      scope={outline ? "cell-active" : ""}
      sx={{
        backgroundColor:
          rowIdx === selectedRow || outline ? "#1d70b8" : "transparent",
        color: rowIdx === selectedRow || outline ? "#fff" : "#000",
      }}
      onClick={handleClick}
      key={`table-cell-${content}`}
    >
      <span onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        {content || "-"}
      </span>
      <Popover
        id={`table-cell-popover-${content}`}
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={popoverLocation}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="body1">{highlight?.description}</Typography>
      </Popover>
    </TableCell>
  );
};

const Table = (props: TableProps) => {
  const { headers, rows, id, selectable, selectedHandler, highlight } = props;

  const [selectedRow, setSelectedRow] = useState<number>(-1);

  useEffect(() => {
    setSelectedRow(-1);
  }, [id]);

  const renderCells = (cells: unknown[], rowIdx: number, raw: any) => {
    return cells.map((cell, idx) => {
      const outline =
        highlight && highlight.row === rowIdx && highlight.cell === idx;

      return (
        <TableCellElement
          outline={outline}
          content={cell as string}
          highlight={highlight}
          rowIdx={rowIdx}
          selectedRow={selectedRow}
          handleClick={() => {
            if (selectable) {
              setSelectedRow(rowIdx === selectedRow ? -1 : rowIdx);

              if (selectedHandler) {
                selectedHandler(rowIdx === selectedRow ? null : raw);
              }
            }
          }}
        />
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
