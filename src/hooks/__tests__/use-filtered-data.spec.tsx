import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it, Mock, vi } from "vitest";
import { beforeEach } from "node:test";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";
import { useFilteredEquipmentData } from "../use-filtered-data.hook";

vi.mock("@/stores/equipment-map.store", () => ({
  useEquipmentMapStore: vi.fn(),
}));

const mockEquipment = [
  {
    id: "1",
    name: "Equipamento 1",
    model: "Modelo 1",
    position: { lat: 0, lon: 0 },
    state: { id: "1", name: "Operando", color: "Green" },
  },
  {
    id: "2",
    name: "Equipamento 2",
    model: "Modelo 2",
    position: { lat: 0, lon: 0 },
    state: { id: "2", name: "Parado", color: "Yellow" },
  },
  {
    id: "3",
    name: "Equipamento 3",
    model: "Modelo 2",
    position: { lat: 0, lon: 0 },
    state: { id: "1", name: "Operando", color: "Green" },
  },
  {
    id: "4",
    name: "Equipamento 4",
    model: "Modelo 3",
    position: { lat: 0, lon: 0 },
    state: { id: "3", name: "Manutenção", color: "Red" },
  },
];

describe("use filtered data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("must return all data when there are no filters", async () => {
    const mockUseEquipmentMapStore = useEquipmentMapStore as unknown as Mock;
    mockUseEquipmentMapStore.mockResolvedValue({
      selectedState: null,
      selectedModel: null,
      search: "",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual(mockEquipment);
    expect(result.current.searchResults).toEqual([]);
  });

  it("must return the data filtered by state", async () => {
    const mockUseEquipmentMapStore = useEquipmentMapStore as unknown as Mock;
    mockUseEquipmentMapStore.mockReturnValue({
      selectedState: "Operando",
      selectedModel: null,
      search: "",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual([
      {
        id: "1",
        name: "Equipamento 1",
        model: "Modelo 1",
        position: { lat: 0, lon: 0 },
        state: { id: "1", name: "Operando", color: "Green" },
      },
      {
        id: "3",
        name: "Equipamento 3",
        model: "Modelo 2",
        position: { lat: 0, lon: 0 },
        state: { id: "1", name: "Operando", color: "Green" },
      },
    ]);
    expect(result.current.searchResults).toEqual([]);
  });

  it("must return the data filtered by name", () => {
    const mockUseEquipmentMapStore = useEquipmentMapStore as unknown as Mock;
    mockUseEquipmentMapStore.mockReturnValue({
      selectedState: null,
      selectedModel: null,
      search: "Equipamento 1",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual(mockEquipment);
    expect(result.current.searchResults).toEqual([
      {
        id: "1",
        name: "Equipamento 1",
        model: "Modelo 1",
        position: { lat: 0, lon: 0 },
        state: { id: "1", name: "Operando", color: "Green" },
      },
    ]);
  });
});
