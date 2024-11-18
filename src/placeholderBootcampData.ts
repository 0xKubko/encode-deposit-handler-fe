interface Bootcamp {
  id: number;
  address: string;
  name: string;
  start: number;
  deadline: number;
}

export const bootcamps: Bootcamp[] = [
  {
    id: 1,
    address: "0x123",
    name: "Bootcamp 1",
    start: 1800000000,
    deadline: 1850000000,
  }, // not yet started
  {
    id: 2,
    address: "0x456",
    name: "Bootcamp 2",
    start: 1630000000,
    deadline: 1800000000,
  }, // currently running
  {
    id: 3,
    address: "0x789",
    name: "Bootcamp 3",
    start: 1600000000,
    deadline: 1630000000,
  }, // finished
  {
    id: 4,
    address: "0xabc",
    name: "Bootcamp 4",
    start: 1500000000,
    deadline: 1600000000,
  }, // finished
];
