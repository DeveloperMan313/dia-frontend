import { Lamp } from "../types";

const API_BASE_URL = "/api";

// Mock data for fallback when backend is not available
const MOCK_LAMPS: Lamp[] = [
  {
    id: 1,
    title: "LED лампа 10W",
    luminous_flux_lm: 800,
    power_w: 10,
    scattering_angle_deg: 120,
    image_url: "",
  },
  {
    id: 2,
    title: "LED лампа 15W",
    luminous_flux_lm: 1200,
    power_w: 15,
    scattering_angle_deg: 120,
    image_url: "",
  },
  {
    id: 3,
    title: "LED лампа 20W",
    luminous_flux_lm: 1600,
    power_w: 20,
    scattering_angle_deg: 120,
    image_url: "",
  },
  {
    id: 4,
    title: "Прожектор LED 50W",
    luminous_flux_lm: 4000,
    power_w: 50,
    scattering_angle_deg: 60,
    image_url: "",
  },
  {
    id: 5,
    title: "Прожектор LED 100W",
    luminous_flux_lm: 8000,
    power_w: 100,
    scattering_angle_deg: 60,
    image_url: "",
  },
];

export const apiService = {
  // Get all lamps with optional filters
  async getLamps(filters?: {
    title?: string;
    minPower?: number;
    maxPower?: number;
  }): Promise<Lamp[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.title) params.append("title", filters.title);

      const response = await fetch(`${API_BASE_URL}/lamps?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const lamps: Lamp[] = await response.json();

      // Apply additional filters client-side if backend doesn't support them
      let filteredLamps = lamps;
      if (filters?.minPower !== undefined) {
        filteredLamps = filteredLamps.filter(
          (lamp) => lamp.power_w >= filters.minPower!,
        );
      }
      if (filters?.maxPower !== undefined) {
        filteredLamps = filteredLamps.filter(
          (lamp) => lamp.power_w <= filters.maxPower!,
        );
      }

      return filteredLamps;
    } catch (error) {
      console.warn("Failed to fetch lamps from API, using mock data:", error);
      // Fallback to mock data
      let mockLamps = [...MOCK_LAMPS];
      if (filters?.title) {
        mockLamps = mockLamps.filter((lamp) =>
          lamp.title.toLowerCase().includes(filters.title!.toLowerCase()),
        );
      }
      if (filters?.minPower !== undefined) {
        mockLamps = mockLamps.filter(
          (lamp) => lamp.power_w >= filters.minPower!,
        );
      }
      if (filters?.maxPower !== undefined) {
        mockLamps = mockLamps.filter(
          (lamp) => lamp.power_w <= filters.maxPower!,
        );
      }
      return mockLamps;
    }
  },

  // Get lamp by ID
  async getLampById(id: number): Promise<Lamp | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/lamps/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn("Failed to fetch lamp from API, using mock data:", error);
      // Fallback to mock data
      const mockLamp = MOCK_LAMPS.find((lamp) => lamp.id === id);
      return mockLamp || null;
    }
  },
};
