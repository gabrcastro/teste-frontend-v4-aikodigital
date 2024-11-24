import { useEffect, useState } from "react";
import {
  fetchEquipment,
  fetchEquipmentModel,
  fetchEquipmentPositionHistory,
  fetchEquipmentState,
  fetchEquipmentStateHistory,
} from "./use-equipment.hook";
import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
} from "@/types/equipment.type";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";

export interface ProcessedEquipment {
  id: string;
  name: string;
  model: string | undefined;
  position: { lat: number; lon: number };
  state: {
    id: string | undefined;
    name: string | undefined;
    color: string | undefined;
  };
}

export function useEquipmentData() {
  const [processedData, setProcessedData] = useState<ProcessedEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedState, selectedModel, data, setData } =
    useEquipmentMapStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          equipments,
          equipmentModels,
          equipmentStates,
          equipmentStateHistory,
          equipmentPositionHistory,
        ] = await Promise.all([
          fetchEquipment(),
          fetchEquipmentModel(),
          fetchEquipmentState(),
          fetchEquipmentStateHistory(),
          fetchEquipmentPositionHistory(),
        ]);

        const combinedData = equipments.map((equipment: Equipment) => {
          const model = equipmentModels.find(
            (model: EquipmentModel) => model.id === equipment.equipmentModelId,
          );

          const positionHistory = equipmentPositionHistory.find(
            (position: EquipmentPositionHistory) =>
              position.equipmentId === equipment.id,
          );
          const latestPosition = positionHistory?.positions?.reduce(
            (
              latest: { date: string; equipmentStateId: string },
              current: { date: string; equipmentStateId: string },
            ) =>
              new Date(current.date) > new Date(latest.date) ? current : latest,
            positionHistory?.positions[0],
          );

          const stateHistory = equipmentStateHistory.find(
            (state: EquipmentStateHistory) =>
              state.equipmentId === equipment.id,
          );
          const latestState = stateHistory?.states?.reduce(
            (
              latest: { date: string; equipmentStateId: string },
              current: { date: string; equipmentStateId: string },
            ) =>
              new Date(current.date) > new Date(latest.date) ? current : latest,
            stateHistory?.states[0],
          );

          const stateDetails = equipmentStates.find(
            (state: EquipmentState) =>
              state.id === latestState?.equipmentStateId,
          );

          return {
            id: equipment.id,
            name: equipment.name,
            model: model?.name,
            position: latestPosition,
            state: {
              id: stateDetails?.id,
              name: stateDetails?.name,
              color: stateDetails?.color,
            },
          };
        });

        setProcessedData(combinedData);
      } catch (err) {
        setError("Error when loading the data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...processedData];

    // Filtrando com base nos filtros da store
    if (selectedState) {
      filtered = filtered.filter(
        (equipment) => equipment.state?.name === selectedState,
      );
    }

    if (selectedModel) {
      filtered = filtered.filter(
        (equipment) => equipment.model === selectedModel,
      );
    }

    setData(filtered);
  }, [selectedState, selectedModel, processedData]);

  return {
    data: data,
    loading,
    error,
  };
}
