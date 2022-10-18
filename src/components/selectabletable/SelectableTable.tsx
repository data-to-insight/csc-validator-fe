import React, { useState } from "react";

import {
  SelectableTable as SelectableTableComponent,
  SelectableTableRow,
  SelectableTableCell,
} from "./SelectableTable.styles";

interface SelectableTableProps {
  rows: unknown[][];
  onRowSelect: (row: unknown[]) => void;
}

const SelectableTable = (props: SelectableTableProps) => {
  const { rows, onRowSelect } = props;

  const [selectedRow, setSelectedRow] = useState<null | string>(null);

  const renderCell = (
    cell: string,
    idx: number,
    key: string,
    row: unknown[]
  ) => {
    return (
      <SelectableTableCell
        selected={key === selectedRow}
        key={`${key}-${idx}`}
        onClick={() => {
          setSelectedRow(key);
          onRowSelect(row);
        }}
      >
        {cell}
      </SelectableTableCell>
    );
  };

  const renderRow = (row: unknown[], idx: number) => {
    const key = `row-${row[0]}-${idx}`;

    return (
      <SelectableTableRow key={key}>
        {row.map((cell, cidx) => {
          return renderCell(cell as string, cidx, key, row);
        })}
      </SelectableTableRow>
    );
  };

  return (
    <SelectableTableComponent>
      {rows.map((row, idx) => {
        return renderRow(row, idx);
      })}
    </SelectableTableComponent>
  );
};

export default SelectableTable;
