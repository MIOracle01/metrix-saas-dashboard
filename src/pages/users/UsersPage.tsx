import { CustomersFilters } from "@/features/customers-filters/CustomersFilters";
import { CustomersTable } from "@/widgets/customers-table/CustomersTable";

export function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <CustomersFilters />
      <CustomersTable />
    </div>
  );
}
