from abc import ABC
from contextlib import contextmanager
from dataclasses import dataclass
from enum import Enum
from typing import BinaryIO, Iterator

import pandas as pd


class TableType(Enum):
    pass


@dataclass
class Metadata:
    name: str
    size: int
    year: int
    table: TableType = None


@dataclass
class DataFile:
    name: str
    metadata: Metadata


class DataStore(ABC):
    @property
    def files(self) -> Iterator[DataFile]:
        """
        Return information about all the files in this datastore
        """
        raise NotImplementedError

    @contextmanager
    def open(self, file: [str | DataFile]) -> BinaryIO:
        """
        Open a file either by name or represented by a DataFile object

        :param file: The name of the file or a DataFile object
        """
        raise NotImplementedError

    def to_dataframe(self, file: [str | DataFile]) -> pd.DataFrame:
        formats = [pd.read_csv, pd.read_excel, pd.read_json]
        for fmt in formats:
            try:
                with self.open(file) as f:
                    return fmt(f)
            except:
                pass
        raise ValueError("Could not read file")
