export interface Lamp {
  id: number;
  title: string;
  luminous_flux_lm: number;
  power_w: number;
  scattering_angle_deg: number;
  image_url?: string;
}

export interface LampFilters {
  title?: string;
  minPower?: number;
  maxPower?: number;
}