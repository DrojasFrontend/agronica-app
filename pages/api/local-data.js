import zonesData from '../../data/zones.json';

export default function handler(req, res) {
  res.status(200).json(zonesData);
}
