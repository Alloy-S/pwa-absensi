export interface Libur {
    id: string;
    date: string;
    is_holiday: boolean;
    description: string;
  }

export interface LiburPagination {
  pages: number;
  total: number;
  items: Libur[];
}

export function initLibur(): Libur {
  return {
    id: "",
    date: "",
    is_holiday: false,
    description: ""
  };
}