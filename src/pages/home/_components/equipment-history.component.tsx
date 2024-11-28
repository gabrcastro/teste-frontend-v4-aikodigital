import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "../../../components/status-badge.component";
import { useEquipmentStore } from "@/stores/equipment.store";
import { useEquipmentHistory } from "@/hooks/use-equipment-history.hook";

export function EquipmentHistory() {
  const { selectedEquipment } = useEquipmentStore();
  const { data, loading, error } = useEquipmentHistory(
    selectedEquipment?.id ?? "",
  );

  // --> Must be treated in a better way
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!data) return <p>No history found for this equipment.</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // <-- -------------------------------

  return (
    <ScrollArea className="w-full h-full mt-5">
      <ul className="flex flex-col gap-4">
        {data.history.map((entry, index) => (
          <li key={index}>
            <span className="flex flex-row items-center justify-between">
              <p className="text-neutral-600 text-sm italic mr-5">
                {new Date(entry.date).toLocaleString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "UTC",
                })}
              </p>

              <span className="mr-4">
                <StatusBadge
                  text={entry.state?.name ?? "unknown"}
                  color={entry.state?.color ?? "#dedede"}
                />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
