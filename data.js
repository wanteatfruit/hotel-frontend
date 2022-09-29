export const pages = [
  { name: "City", link: "/city" },
  { name: "Hotel", link: "/hotel" },
  { name: "Rooms", link: "/rooms" },
]; // 跳转到的界面名称
export const settings = ["Account", "Logout"]; // 点用户图标后出来的选项
export const login = ["Login"];
export const cities = [
  { name: "广州", id: 1 },
  { name: "深圳", id: 2 },
  { name: "上海", id: 3 },
  { name: "重庆", id: 4},
];

export const branchHotels = [
  { id: 1, city: "sz", name: "深圳文华东方酒店" },
  { id: 2, city: "sz", name: "深圳丽思卡尔顿" },
  { id: 3, city: "gz", name: "广州文华东方酒店" },
];
export const orderColumns=[
  {field:'id', headerName:'ID', width:90},
  {field: 'branch', headerName:'分店', width:150}
]
export const orderRows = [{ id: 1, branch: "深圳文华东方酒店" }];

export const roomPageItem = []