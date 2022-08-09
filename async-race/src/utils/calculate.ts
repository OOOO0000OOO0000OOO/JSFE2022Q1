import IEngine from '../types/IEngine';

export default function calculateTime({ distance, velocity }: IEngine): number {
  return distance / velocity;
}
