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

interface LowLightCells {
  [key: string]: any;
}

interface TableProps {
  headers: string[];
  rows: TableRowType[];
  id: string;
  selectable?: boolean;
  selectedHandler?: (row: any) => void;
  highlight?: HighlightCell | null;
  lowlights?: LowLightCells;
}

const TableCellElement = (props: {
  content: string;
  highlight?: HighlightCell | null;
  lowlight?: boolean | null;
  selectedRow: number;
  rowIdx: number;
  outline?: boolean | null;
  handleClick: () => void;
}) => {
  const {
    content,
    highlight,
    selectedRow,
    handleClick,
    outline,
    rowIdx,
    lowlight,
  } = props;

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

  const buildStyling = () => {
    const output = {
      backgroundColor: "transparent",
      color: "#000",
    };

    if (lowlight) {
      output.backgroundColor = "#A7D3F9";
      output.color = "#fff";
    }

    if (rowIdx === selectedRow || outline) {
      output.backgroundColor = "#1d70b8";
      output.color = "#fff";
    }

    return output;
  };

  return (
    <TableCell
      scope={outline ? "cell-active" : ""}
      role={outline ? "cell-active" : ""}
      sx={buildStyling()}
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
  const {
    headers,
    rows,
    id,
    selectable,
    selectedHandler,
    highlight,
    lowlights,
  } = props;

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
          lowlight={lowlights && lowlights[`${rowIdx}_${idx}`]}
          outline={outline}
          content={cell as string}
          highlight={highlight}
          rowIdx={rowIdx}
          selectedRow={selectedRow}
          key={`${rowIdx}-${idx}`}
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
